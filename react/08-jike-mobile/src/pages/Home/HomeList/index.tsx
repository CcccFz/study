import { List, Image, InfiniteScroll } from "antd-mobile"
import { useEffect, useState } from "react"
import { ArticlesRes, fetchArticlesAPI } from "@/apis/article"
import { useNavigate } from "react-router-dom"

type HomeListProps = {
  channel_id: string
}

const HomeList = (props: HomeListProps) => {
  const navigate  = useNavigate()
  const [articlesRes, setArticlesRes] = useState<ArticlesRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime()
  })

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetchArticlesAPI({
          channel_id: props.channel_id,
          timestamp: '' + new Date().getTime()
        })
        setArticlesRes(res.data.data)
      } catch (err) {
        throw new Error('fetch articles error' + err)
      }
    }
    fetchArticles()
  }, [props.channel_id])

  // 加载更多
  const [hasMore, setHadMore] = useState(true)
  const loadMore = async () => {
    try {
      const res = await fetchArticlesAPI({
        channel_id: props.channel_id,
        timestamp: articlesRes.pre_timestamp,
      })
      // 没有数据立刻停止
      if (res.data.data.results.length === 0) {
        setHadMore(false)
      }
      setArticlesRes({
        // 拼接新老列表数据
        results: [...articlesRes.results, ...res.data.data.results],
        // 重置时间参数 为下一次请求做准备
        pre_timestamp: res.data.data.pre_timestamp,
      })
    } catch (err) {
      throw new Error('load list error' + err)
    }
  }

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <List>
        {articlesRes.results.map(item => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
            onClick={() => navigate(`/detail?id=${item.art_id}`)} 
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </div>
  )
}

export default HomeList