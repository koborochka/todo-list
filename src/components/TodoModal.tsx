import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdOutlineClose } from 'react-icons/md'
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slices/todoSlice';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

export default function TodoModal({ isModalOpen, setIsModalOpen }: {
        isModalOpen: boolean;
        setIsModalOpen: (isOpen: boolean) => void;
    }) {

    const [title,setTitle] = useState<string>('')
    const [status, setStatus] = useState<string>('incomplete')
    const dialog = useRef<HTMLDialogElement | null>(null);
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && status){
            dispatch(addTodo({
                id: uuid(),
                title,
                status,
                time: format(new Date(), 'p, MM/dd/yyyy'),
            }))
        }   
    }
    
    useEffect(() => {
        if (isModalOpen) {
            dialog.current?.showModal()
        } else {
            dialog.current?.close()
        }
    }, [isModalOpen])

    const modalRoot = document.getElementById('modal');
    if (!modalRoot) {
        return null; 
    }

    return createPortal(
        <>
            <dialog className='modal__dialog' ref={dialog}>
                <div className='modal__container'>
                    <button className='modal__close-button' onClick={() => setIsModalOpen(false)}>
                        <MdOutlineClose />
                    </button>

                    <form className='modal__form' onSubmit = {(e) => handleSubmit(e)}>
                        <h2 className='modal__title'>Add task</h2>
                        <label className='modal__label' htmlFor="title">
                            Title
                            <input className='modal__label-input' type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </label>

                        <label className='modal__label' htmlFor="status">
                            Status
                            <select className='modal__label-select' name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option className="modal__label-select-option" value='incomplete'>Incomplete</option>
                                <option className="modal__label-select-option" value='complete'>Complete</option>
                            </select>
                        </label>

                        <Button className="button button--add" type="submit">Add task</Button>
                        <Button className="button button--select" onClick={() => { setIsModalOpen(false) }}>Cancel</Button>

                    </form>
                </div>
            </dialog>
        </>,
        modalRoot
    );

}
