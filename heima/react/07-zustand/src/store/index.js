import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createCountSlice } from './slice/count'
import { createChannelSlice } from './slice/channel'

const useStore = create(
  devtools(
    (...args) => ({
      ...createCountSlice(...args),
      ...createChannelSlice(...args),
    }),
    {
      name: 'store',
      enabled: true,
    },
  )
)

export default useStore
