/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 * GET /v1_0/channels
 */

/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 *  POST /v1_0/upload
 */

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 *  POST /v1_0/articles
 */

/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */

getChannels()

;(function () {
  if (!location.search) return
  document.querySelector('.title span').innerText = '编辑文章'
  document.querySelector('.send').innerText = '保存'
  const params = new URLSearchParams(location.search)
  params.forEach(async (val, key) => {
    if (key !== 'id') return
    const id = val
    const res = await axios({url: `/v1_0/mp/articles/${id}`})
    const data = {
      id,
      title: res.title,
      channel_id: res.channel_id,
      content: res.content,
      rounded: res.cover.images[0],
    }
    Object.keys(data).forEach(key => {
      if (key === 'rounded') {
        if (data[key]) {
          document.querySelector('.rounded').src = data[key]
          document.querySelector('.rounded').classList.add('show')
          document.querySelector('.place').classList.add('hide')
        }
      } else if (key === 'content') {
        editor.setHtml(data[key])
      } else {
        document.querySelector(`.art-form [name=${key}]`).value = data[key]
      }
    })
  })
}());

async function getChannels() {
  const res = await axios({url: '/v1_0/channels'})
  document.querySelector('.form-select').innerHTML = '<option value="" selected="">请选择文章频道</option>' +
    res.channels.map(channel => `<option value="${channel.id}">${channel.name}</option>`).join('')
}

document.querySelector('.img-file').addEventListener('change', async e => {
  const file = e.target.files[0]
  if (!file) return
  const data = new FormData()
  data.append('image', file)
  const res = await axios({
    url: '/v1_0/upload',
    method: 'POST',
    data
  })
  document.querySelector('.rounded').src = res.url
  document.querySelector('.place').classList.add('hide')
  document.querySelector('.rounded').classList.add('show')
})

document.querySelector('.rounded').addEventListener('click', () => {
  document.querySelector('.img-file').click()
})

document.querySelector('.send').addEventListener('click', async () => {
  const form = document.querySelector('.art-form')
  const data = serialize(form, {hash: true, empty: true})
  data.cover = {type: 1, images: [document.querySelector('.rounded').src]}
  if (location.search) {
    await axios({
      url: `/v1_0/mp/articles/${data.id}`,
      method: 'PUT',
      data
    })
  } else {
    // delete data.id
    await axios({
      url: '/v1_0/mp/articles',
      method: 'POST',
      data
    })
  }
  
  myAlert(true, '发布成功')
  form.reset()
  document.querySelector('.rounded').src = ''
  document.querySelector('.place').classList.remove('hide')
  document.querySelector('.rounded').classList.remove('show')
  editor.setHtml('')
})