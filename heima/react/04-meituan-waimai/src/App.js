import NavBar from './components/NavBar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import FoodsCategory from './components/FoodsCategory'

import './App.scss'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFoods } from './store/modules/food'

const App = () => {
  const dispatch = useDispatch()
  const {foods, menuIdx} = useSelector(state => state.food)
  
  useEffect(() => {
    dispatch(fetchFoods())
  }, [dispatch])

  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu foods={foods} />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foods.map((item, idx) => (
                  idx === menuIdx && <FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default App
