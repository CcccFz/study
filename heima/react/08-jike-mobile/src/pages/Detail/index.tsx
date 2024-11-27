import { articleDetailAPI, DetailRes } from "@/apis/article"
import { NavBar } from "antd-mobile"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

const Detail = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const art_id = params.get("id")
  const [detailRes, setDetailRes] = useState<DetailRes | null>(null)

  useEffect(() => {
    const articleDetail = async () => {
      try {
        const res = await articleDetailAPI(art_id!)
        setDetailRes(res.data.data)
      } catch (err) {
        throw new Error('fetch article detail error' + err)
      }
    }
    if (!art_id) return
    articleDetail()
  }, [art_id])

  if (!detailRes) {
    return <div>this is loading</div>
  }

  return (
    <div>
      <NavBar onBack={() => navigate(-1)}>{detailRes?.title}</NavBar>
      <div dangerouslySetInnerHTML={{__html: detailRes.content}}></div>
    </div>
  )
}

export default Detail