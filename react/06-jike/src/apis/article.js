import { http } from '@/utils'

export function getChannelsAPI() {
  return http({
    url: '/channels',
    method: 'GET',
  })
}

export function publishArticleAPI(data) {
  return http({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

export function getArticlesAPI(params) {
  return http({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export function delArticleAPI(id) {
  return http({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  })
} 


export function getArticleAPI(id) {
  return http({
    url: `/mp/articles/${id}`,
    method: 'GET',
  })
}

export function updateArticleAPI(data) {
  return http({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}