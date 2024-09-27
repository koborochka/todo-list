import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdOutlineClose } from 'react-icons/md'
import Button from './Button';

export default function TodoModal({ isModalOpen, setIsModalOpen }: {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}) {

    const modalRoot = document.getElementById('modal');
    // Проверка на случай, если modalRoot равен null
    if (!modalRoot) {
        return null; // Не рендерим портал, если элемент не найден
    }

    const dialog = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        if (isModalOpen) {
            dialog.current?.showModal()
        } else {
            dialog.current?.close()
        }
    }, [isModalOpen])


    return createPortal(
        <>
            <dialog className='modal__dialog' ref={dialog}>
                <div className='modal__container'>
                    <button className='modal__close-button' onClick={() => { setIsModalOpen(false) }}>
                        <MdOutlineClose />
                    </button>

                    <form className='modal__form'>
                        <h2 className='modal__title'>Add task</h2>
                        <label className='modal__label' htmlFor="title">
                            Title
                            <input className='modal__label-input' type="text" id="title" />
                        </label>

                        <label className='modal__label' htmlFor="status">
                            Status
                            <select className='modal__label-select' name="status" id="status">
                                <option className="modal__label-select-option" value='incomplete'>Incomplete</option>
                                <option className="modal__label-select-option" value='complete'>Complete</option>
                            </select>
                        </label>

                        <Button className="button button--add">Add task</Button>
                        <Button className="button button--select">Cancel</Button>

                    </form>
                </div>
            </dialog>
        </>,
        modalRoot
    );

}
