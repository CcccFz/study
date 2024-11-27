import { List, Image } from "antd-mobile"
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
        const res = await fetchArticlesAPI({channel_id: props.channel_id, timestamp: '' + new Date().getTime()})
        setArticlesRes({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp
        })
      } catch (err) {
        throw new Error('fetch articles error' + err)
      }
    }
    fetchArticles()
  }, [props.channel_id])

  return (
    <>
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
    </>
  )
}

export default HomeList