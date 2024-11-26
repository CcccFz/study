import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getArticleAPI, publishArticleAPI, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  const { channels } = useChannel()
  const [imageType, setImageType] = useState(0)
  const [images, setImages] = useState([])

  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()

  useEffect(() => {
    const getArticle = async () => {
      const res = await getArticleAPI(articleId)
      const { cover } = res.data
      form.setFieldsValue({
        ...res.data,
        type: cover.type
      })
      setImageType(cover.type)
      setImages(cover.images.map(url => ({ url })))
    }
    if (!articleId) return
    getArticle()
  }, [articleId, form])

  const onFinish = async (data) => {
    if (imageType !== images.length) return message.warning('封面类型与图片数量不匹配')
    const reqData = {
      title: data.title,
      content: data.content,
      channel_id: data.channel_id,
      cover: {
        type: imageType,
        images: images.map(image => image.response ? image.response.data.url : image.url)
      }
    }
    if (articleId) {
      reqData.id = articleId
      await updateArticleAPI(reqData)
    } else {
      await publishArticleAPI(reqData)
    }
    message.success(`${articleId ? '保存' : '发布'}成功`)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={e => setImageType(e.target.value)}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              listType="picture-card"
              className="avatar-uploader"
              maxCount={imageType}
              name='image'
              action='http://geek.itheima.net/v1_0/upload'
              fileList={images}
              onChange={data => setImages(data.fileList)}
              multiple={imageType > 1}
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '保存修改' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish