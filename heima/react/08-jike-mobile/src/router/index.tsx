import { createHashRouter } from "react-router-dom"
import Home from "@/pages/Home"
import Detail from "@/pages/Detail"

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail",
    element: <Detail />,
  }
])

export default router