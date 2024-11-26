export const createChannelSlice = set => ({
  channels: [],
  fetchChannels: async () => {
    const res = await fetch('http://geek.itheima.net/v1_0/channels')
    const data = await res.json()
    set({ channels: data.data.channels })
  },
})
