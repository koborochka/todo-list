import { useSelector } from "react-redux"
import TodoItem from "./TodoItem"
import { RootState } from "../app/store"


export default function AppContent() {
  const todoList = useSelector((state: RootState) => state.todo.todoList)
  const filterStatus = useSelector((state: RootState) => state.todo.filterStatus)

  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

  const filteredTodoList = sortedTodoList.filter((item)=>{
    if(filterStatus ==='all') return true
    return item.status === filterStatus
  })

  const hasItems = filteredTodoList && filteredTodoList.length > 0
  return (
    <ul className="app-content">
      {hasItems ? (
        filteredTodoList.map((todo) => (<TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <li className="app-content__empty-list">Тут пока нет дел</li>
      )}
    </ul>


  )
}
