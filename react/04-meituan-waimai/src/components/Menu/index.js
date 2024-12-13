import classNames from 'classnames'
import './index.scss'
import { setMenuIdx } from '../../store/modules/food'
import { useSelector, useDispatch } from 'react-redux'

const Menu = ({ foods }) => {
  const dispatch = useDispatch()
  const { menuIdx } = useSelector(state => state.food)
  const menus = foods.map(food => ({ tag: food.tag, name: food.name }))
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((menu, idx) => {
        return (
          <div
            key={menu.tag}
            className={classNames(
              'list-menu-item',
              {active: menuIdx === idx}
            )}
            onClick={() => dispatch(setMenuIdx(idx))}
          >
            {menu.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
