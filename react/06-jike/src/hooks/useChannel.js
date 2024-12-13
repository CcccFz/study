import { useEffect, useState } from 'react'
import { getChannelsAPI } from '@/apis/article'

export const useChannel = () => {
  const [channels, setChannels] = useState([])

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await getChannelsAPI()
      setChannels(res.data.channels)
    }
    fetchChannels()
  }, [])


  return { channels }
}