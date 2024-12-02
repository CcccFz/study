import { Todos } from './todo'

interface Props {
  todos: Todos
}

const TodoList = (props: Props) => {
  const { todos } = props

  return (
    <ul className="todo-list">
      {/* 编辑样式：editing  已完成样式：completed */}
      {todos.map(todo => (
        <li key={todo.id} className={ todo.done ? 'completed' : '' }>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{todo.text}</label>
            <button className="destroy" />
          </div>
          <input className="edit" defaultValue="Create a TodoMVC template" />
        </li>
      ))}
    </ul>
  )
}

export default TodoList
