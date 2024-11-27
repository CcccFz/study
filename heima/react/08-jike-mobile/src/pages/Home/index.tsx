import './index.css'
import { Tabs } from 'antd-mobile'
import { useChannels } from './useChannels'
import HomeList from './HomeList'

const Home = () => {
  const { channels } = useChannels()

  return (
    <div className="tabContainer">
      <Tabs defaultActiveKey='0'>
        {channels.map(channel => (
          <Tabs.Tab title={channel.name} key={channel.id}>
            <div className='listContainer'>
              <HomeList channel_id={''+channel.id}/>
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default Home