import './App.scss'
import avatar from './images/bozai.png'
import { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
  },
]

// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

function useGetComments() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function getComments() {
      const res = await axios.get('http://localhost:3006/list')
      setComments(res.data)
    }
    getComments()
  }, [])

  return [comments, setComments]
}

function Item({ comment, handleDeleteComment }) {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img
            className="bili-avatar-img"
            alt=""
            src={comment.user.avatar}
          />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{comment.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{comment.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{comment.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{comment.like}</span>
            {user.uid === comment.user.uid && <span className="delete-btn" onClick={() => handleDeleteComment(comment.rpid)}>
              删除
            </span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  const [comments, setComments] = useGetComments()
  const [type, setType] = useState('hot')
  const [content, setContent] = useState('')
  const inputRef = useRef(null)

  function handleChangeType(type) {
    setType(type)
  }

  function handleDeleteComment(id) {
    setComments(comments.filter(comment => comment.rpid !== id))
  }

  function handlePublish() {
    setComments([
      ...comments,
      {
        rpid: uuidv4(),
        user: {
          uid: '30009257',
          avatar,
          uname: '黑马前端',
        },
        content,
        ctime: dayjs(new Date()).format('MM-DD HH:mm'),
        like: 66,
      }
    ])
    setContent('')
    inputRef.current.focus()
  }

  let sortedComments = comments
  if (type === 'hot') {
    sortedComments = _.orderBy(comments, 'like', 'desc')
  } else if (type === 'time') {
    sortedComments = _.orderBy(comments, 'ctime', 'desc')
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(tab => <span key={tab.type}
              className={classNames('nav-item', {active: tab.type === type})}
              onClick={() => handleChangeType(tab.type)}
            >
              {tab.text}
            </span> ) }            
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              ref={inputRef}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send" onClick={handlePublish}>
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {sortedComments.map(comment => <Item key={comment.rpid} comment={comment} handleDeleteComment={handleDeleteComment} />)}
        </div>
      </div>
    </div>
  )
}

export default App