import axios from 'axios'
import { getToken, clearToken } from './token'
import router from '@/router'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

http.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    if (err.response.status === 401) {
      clearToken()
      router.navigate('/login')
      window.location.reload()
    }
    return Promise.reject(err)
  }
)

export default http
