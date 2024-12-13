import { http } from '@/utils'

export function userLoginAPI(data) {
  return http({
    url: '/authorizations',
    method: 'POST',
    data
  })
}

export function userProfileAPI() {
  return http({
    url: '/user/profile',
    method: 'GET',
  })
}
