import { useState } from "react";
import Button from "./Button";
import SelectButton from "./SelectButton";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/todoSlice";
import { RootState } from "../app/store"



export default function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const filterStatus = useSelector((state: RootState) => state.todo.filterStatus)

  const dispatch = useDispatch()

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilterStatus = e.target.value
    dispatch(updateFilterStatus(newFilterStatus))
  }

  return (
    <div className="app_header">
      <Button className="button button--add" onClick = {() => setIsModalOpen((prev) => !prev)}>Add task</Button>
      <SelectButton className="app_header__select button button--select" id='filter-status' value={filterStatus} onChange={handleFilterChange}>
        <option className="app_header__option" value='all'>All</option>
        <option className="app_header__option" value='incomplete'>Incomplete</option>
        <option className="app_header__option" value='complete'>Complete</option>
      </SelectButton>
      <TodoModal {...{isModalOpen, setIsModalOpen}} type='add'/> 
    </div>
  )
}
