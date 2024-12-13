import { useState } from "react"

interface Props {
  addTodo: (text: string) => void
}

const TodoAdd = ({ addTodo }: Props) => {
  const [text, setText] = useState('')

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const target = e.target as HTMLInputElement;
    if (!target.value.trim()) return
    addTodo(target.value.trim())
    setText('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={handleAddTodo}
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </header>
  )
}

export default TodoAdd
