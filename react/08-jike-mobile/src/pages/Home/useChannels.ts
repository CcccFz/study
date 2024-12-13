import { useEffect, useState } from "react"
import { fetchChannelsAPI, type ChannelItem } from "@/apis/channel"

export const useChannels = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([])

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await fetchChannelsAPI()
        setChannels(res.data.data.channels)
      } catch (err) {
        throw new Error('fetch channels error' + err)
      }
    }
    fetchChannels()
  }, [])

  return {
    channels
  }
}