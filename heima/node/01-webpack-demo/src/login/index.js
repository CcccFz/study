/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */

if (process.env.NODE_ENV === 'production_1') {
  console.log = function () {}
}


import { checkCode, checkPhone } from '@/utils/check'
console.log(checkCode('12345'));
console.log(checkPhone('13708045045'));


import 'bootstrap/dist/css/bootstrap.min.css'
import './index.less'
import './index.css'

import imgObj from './assets/logo.png'
const theImg = document.createElement('img')
theImg.src = imgObj
document.querySelector('.login-wrap').appendChild(theImg)


import axios from '../utils/request'
import serialize from 'form-serialize'
import { myAlert } from '../utils/alert'

document.querySelector('.login-form .btn').addEventListener('click', () => {
  const form = document.querySelector('.login-form')
  const data = serialize(form, { hash: true, empty: true })
  axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  }).then(res => {
    localStorage.setItem('token', res.token)
    myAlert(true, '登录成功')
    location.href = '../content/index.html'
  }).catch(err => {})
})