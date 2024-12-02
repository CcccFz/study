// 导入todos样式
import './App.css'

import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

import { Todos } from './components/todo'

const todos: Todos = [
  {
    id: 1,
    text: '吃饭',
    done: true
  },
  {
    id: 2,
    text: '休息',
    done: false
  }
]

const App = () => {
  return (
    <section className="todoapp">
      {/* 添加任务 */}
      <TodoAdd />

      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {/* 列表组件 */}
        <TodoList todos={todos} />
      </section>

      {/* footer 组件 */}
      <TodoFooter />
    </section>
  )
}

export default App
