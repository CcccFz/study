import { http } from '@/utils'
import type { Res } from './common'

export type ArticlesParams = {
  channel_id: string
  timestamp: string
}

export type ArticleItem = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: 0 | 1
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
}

export type ArticlesRes = {
  results: ArticleItem[]
  pre_timestamp: string
}

export function fetchArticlesAPI(params: ArticlesParams) {
  return http.request<Res<ArticlesRes>>({
    url: '/articles',
    method: 'GET',
    params
  })
}


export type DetailRes = {
  art_id: string
  title: string
  pubdate: string
  content: string
}

export function articleDetailAPI(art_id: string) {
  return http.request<Res<DetailRes>>({
    url: `/articles/${art_id}`,
    method: 'GET'
  })
}