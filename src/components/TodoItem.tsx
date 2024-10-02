import { useEffect, useState } from "react"
import { MdDelete, MdEdit } from 'react-icons/md';
import Todo from "../interfaces/Todo"
import Checkbox from '@mui/joy/Checkbox';
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import TodoModal from "./TodoModal";
import toast from "react-hot-toast";

export default function TodoItem({ todo }: {
    todo: Todo,
}) {
    const [checked, setChecked] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() =>{
        if(todo.status === 'complete'){
            setChecked(true)
        } else{
            setChecked(false)
        }
    },[todo.status])

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
        toast.success('Todo deleted successfully')
    }

    const handleUpdate = () => {
        setUpdateModalOpen(true)
    }

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
        );
    };

    return (
        <>
            <li className={`todo-item ${checked && "todo-item--completed"}`}>
                <div className="todo-item__details-container">
                    <Checkbox checked={checked} onChange={handleCheck} size="lg" />
                    <div className="todo-item__content">
                        <p className="todo-item__title">{todo.title}</p>
                        <p className="todo-item__date">{format(new Date(todo.time), 'p, dd/MM/yyyy')}</p>
                    </div>
                </div>

                <div className="todo-item__actions">
                    <button className="todo-item__action-icon" onClick={handleDelete}>
                        <MdDelete />
                    </button>
                    <button className="todo-item__action-icon" onClick={handleUpdate}>
                        <MdEdit />
                    </button>

                </div>
            </li>

            <TodoModal
                type="update"
                isModalOpen={updateModalOpen}
                setIsModalOpen={setUpdateModalOpen}
                todo={todo}
            />
        </>
    )
}
