import { articleDetailAPI, DetailRes } from "@/apis/article"
import { NavBar } from "antd-mobile"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"



const Detail = () => {
  const [params] = useSearchParams()
  const art_id = params.get("id")
  const [detailRes, setDetailRes] = useState<DetailRes | null>(null)

  useEffect(() => {
    const articleDetail = async () => {
      try {
        const res = await articleDetailAPI(art_id)
      } catch (err) {

      }
    }
  }, [art_id])

  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Detail