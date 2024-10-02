import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdOutlineClose } from 'react-icons/md'
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import Todo from '../interfaces/Todo';
import toast from 'react-hot-toast';

export default function TodoModal({ type, isModalOpen, setIsModalOpen, todo }: {
    type: string
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    todo?: Todo;
}) {

    const [title, setTitle] = useState<string>('')
    const [status, setStatus] = useState<string>('incomplete')
    const dialog = useRef<HTMLDialogElement | null>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (isModalOpen) {
            dialog.current?.showModal()
        } else {
            dialog.current?.close()
        }
    }, [isModalOpen])

    useEffect(() => {
        if (type === 'update' && todo?.title) {
            setTitle(todo.title)
            setStatus(todo.status)
        }
    }, [todo, type, isModalOpen])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === '') {
            toast.error('Please enter a title');
            return;
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        status,
                        time: format(new Date(), 'p, MM/dd/yyyy'),
                    })
                );
                toast.success('Task added successfully');
                setTitle('');
            }
            if (type === 'update' && todo) {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({ ...todo, title, status }));
                    toast.success('Task updated successfully');
                } else {
                    toast.error('No changes made');
                    return;
                }
            }

            setIsModalOpen(false);
        }
    }

    const modalRoot = document.getElementById('modal');
    if (!modalRoot) {
        return null;
    }

    return createPortal(
        <>
            <dialog className='modal__dialog' ref={dialog}>
                <div className='modal__container'>
                    <button className='modal__close-button' onClick={() => {
                        setIsModalOpen(false)
                        setTitle('')
                        }}>
                        <MdOutlineClose />
                    </button>

                    <form className='modal__form' onSubmit={(e) => handleSubmit(e)}>
                        <h2 className='modal__title'>{type === 'add' ? 'Add' : 'Update'} task</h2>
                        <label className='modal__label' htmlFor="title">
                            Title
                            <input className='modal__label-input' type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type in here…" />
                        </label>

                        <label className='modal__label' htmlFor="status">
                            Status
                            <select className='modal__label-select' name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option className="modal__label-select-option" value='incomplete'>Incomplete</option>
                                <option className="modal__label-select-option" value='complete'>Complete</option>
                            </select>
                        </label>

                        <Button className="button button--add" type="submit">{type === 'add' ? 'Add' : 'Update'} task</Button>
                        <Button className="button button--select" type="button" onClick={() => { 
                            setIsModalOpen(false)
                            setTitle('')
                         }}>Cancel</Button>

                    </form>
                </div>
            </dialog>
        </>,
        modalRoot
    );

}
