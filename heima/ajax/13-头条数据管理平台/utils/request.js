// axios 公共配置
// 基地址

const loginPath = '../login/index.html'
const homePath = '../content/index.html'

axios.defaults.baseURL = 'http://geek.itheima.net'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = `Bearer ${token}`)
  return config
}, err =>{
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  return res.data?.data
}, err => {
  if (err?.response?.status === 401) {
    localStorage.clear()
    location.href = loginPath
  }

  myAlert(false, err.response.data.message)
  return Promise.reject(err)
})