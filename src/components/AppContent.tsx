import { useSelector } from "react-redux"
import TodoItem from "./TodoItem"


export default function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList)

  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

  const hasItems = sortedTodoList && sortedTodoList.length > 0
  return (
    <ul className="app-content">
      {hasItems ? (
        sortedTodoList.map((todo) => (<TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <li>Тут пока нет дел</li>
      )}
    </ul>


  )
}
