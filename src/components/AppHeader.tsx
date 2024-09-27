import { useState } from "react";
import Button from "./Button";
import SelectButton from "./SelectButton";
import TodoModal from "./TodoModal";

export default function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="app_header">
      <Button className="app_header__button app_header__button--add" onClick = {() => setIsModalOpen((prev) => !prev)}>Add task</Button>
      <SelectButton className="app_header__button app_header__button--select" id='filter-status'>
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Complete</option>
      </SelectButton>
      <TodoModal {...{isModalOpen, setIsModalOpen}}/> 
    </div>
  )
}
