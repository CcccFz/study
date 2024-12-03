// 导入todos样式
import './App.css'

import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

import { Todo } from './components/todo'
import { useMemo, useState } from 'react'


const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterType, setFilterType] = useState('all')

  const filterTodos = useMemo(() => {
    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.done)
      case 'completed':
        return todos.filter(todo => todo.done)
      default:
        return todos
    }
  }, [todos, filterType])

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { 
        id: todos.length ? todos[todos.length-1].id + 1 : 1,
        text,
        done: false
      }
    ])
  }

  const delTodo = (id: number) => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  const clearCompletedTodos = () => {
    setTodos(
      todos.filter(todo => !todo.done)
    )
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {...todo, done: !todo.done }
    }))
  }

  return (
    <section className="todoapp">
      {/* 添加任务 */}
      <TodoAdd addTodo={addTodo} />

      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {/* 列表组件 */}
        <TodoList todos={filterTodos} delTodo={delTodo} toggleTodo={toggleTodo} />
      </section>

      {/* footer 组件 */}
      <TodoFooter
        todoCnt={filterTodos.length}
        filterType={filterType}
        setFilterType={setFilterType}
        clearCompletedTodos={clearCompletedTodos}
      />
    </section>
  )
}

export default App
