import useStore from './store'
import { useEffect } from 'react'
import { useAgeStore } from './store/slice/age-persist'

function App() {
  const { 
    count, incr, set10,
    channels, fetchChannels,
  } = useStore()

  const { age, addAge } = useAgeStore()
  
  useEffect(() => {
    fetchChannels()
  }, [fetchChannels])

  return (
    <>
      <div>{count}</div>
      <button onClick={incr}>+</button>
      <button onClick={set10}>=10</button>
      <button onClick={addAge}>{age}Age</button>
      <ul>
        {channels.map(channel => <li key={channel.id}>{channel.name}</li>)}
      </ul>
    </>
  );
}

export default App;
