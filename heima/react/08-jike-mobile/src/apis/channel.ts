import { http } from '@/utils'
import type { Res } from './common'

export type ChannelItem = {
  id: number
  name: string
}

type ChannelsRes = {
  channels: ChannelItem[]
}

export function fetchChannelsAPI() {
  return http.request<Res<ChannelsRes>>({
    url: '/channels',
    method: 'GET',
  })
}