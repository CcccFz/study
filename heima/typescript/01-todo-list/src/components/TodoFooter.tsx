import classNames from "classnames"

interface Props {
  todoCnt: number
  filterType: string
  setFilterType: (filterType: string) => void
  clearCompletedTodos: () => void
}

const TodoFooter = ({todoCnt, filterType, setFilterType, clearCompletedTodos}: Props) => {

  const handleChangeFilterType = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!(e.target instanceof HTMLAnchorElement)) return
    const target = e.target as HTMLAnchorElement
    if (target.tagName !== 'A' ) return
    setFilterType(target.innerText?.toLowerCase())
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todoCnt}</strong> item left
      </span>
      <ul className="filters" onClick={handleChangeFilterType}>
        <li>
          <a className={classNames({'selected': filterType === 'all'})} href="#/">All</a>
        </li>
        <li>
          <a className={classNames({'selected': filterType === 'active'})} href="#/active">Active</a>
        </li>
        <li>
          <a className={classNames({'selected': filterType === 'completed'})} href="#/completed">Completed</a>
        </li>
      </ul>
      <button className="clear-completed" onClick={clearCompletedTodos}>Clear completed</button>
    </footer>
  )
}

export default TodoFooter
