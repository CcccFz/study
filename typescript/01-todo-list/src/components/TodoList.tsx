import { Todos } from './todo'

interface Props {
  todos: Todos
  delTodo: (id: number) => void
  toggleTodo: (id: number) => void
}

const TodoList = ({ todos, delTodo, toggleTodo }: Props) => {
  return (
    <ul className="todo-list">
      {/* 编辑样式：editing  已完成样式：completed */}
      {todos.map(todo => (
        <li key={todo.id} className={ todo.done ? 'completed' : '' }>
          <div className="view">
            <input className="toggle" type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            <label>{todo.text}</label>
            <button className="destroy" onClick={() => delTodo(todo.id)} />
          </div>
          <input className="edit" defaultValue="Create a TodoMVC template" />
        </li>
      ))}
    </ul>
  )
}

export default TodoList
