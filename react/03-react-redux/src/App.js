import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, addNum } from './store/modules/countStore'
import { fetchChannels } from './store/modules/channelStore'

function App() {
  const dispatch = useDispatch()
  const {count} = useSelector(state => state.count)
  const {channels} = useSelector(state => state.channel)

  useEffect(() => {
    dispatch(fetchChannels())
  }, [dispatch])

  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addNum(10))}>+10</button>
      <ul>
        {channels.map(channel => <li key={channel.id}>{channel.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
