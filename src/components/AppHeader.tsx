import { useState } from "react";
import Button from "./Button";
import SelectButton from "./SelectButton";
import TodoModal from "./TodoModal";

export default function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="app_header">
      <Button className="button button--add" onClick = {() => setIsModalOpen((prev) => !prev)}>Add task</Button>
      <SelectButton className="button button--select" id='filter-status'>
        <option className="app_header__option" value='all'>All</option>
        <option className="app_header__option" value='incomplete'>Incomplete</option>
        <option className="app_header__option" value='complete'>Complete</option>
      </SelectButton>
      <TodoModal {...{isModalOpen, setIsModalOpen}}/> 
    </div>
  )
}
