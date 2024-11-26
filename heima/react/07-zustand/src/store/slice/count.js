export const createCountSlice = set => ({
  count: 0,
  incr: () => set(state => ({ count: state.count + 1 })),
  set10: () => set({ count: 10 }),
})
