import { http } from '@/utils'
import type { Res } from './common'

type ChannelItem = {
  id: number
  name: string
}

type ChannelRes = {
  channels: ChannelItem[]
}

export function fetchChannelsAPI() {
  return http.request<Res<ChannelRes>>({
    url: '/channels',
    method: 'GET',
  })
}