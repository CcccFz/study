import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAgeStore = create(
  persist(
    set => ({
      age: 0,
      addAge: () => set(state => ({ age: state.age + 1 })),
    }),
    { name: 'store' }
  )
)
