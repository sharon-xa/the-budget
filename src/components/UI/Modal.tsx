import { createPortal } from "react-dom";
import { ReactNode } from "react";

type Props = {
    children: ReactNode | JSX.Element,
    onClose: () => void
}

function Modal({ onClose, children }: Props) {
    const modalRoot = document.getElementById('modal-root') as HTMLDivElement;


    return createPortal(
        <>
            <div
                className="fixed w-full h-screen z-30 bg-black bg-opacity-50 backdrop-blur-md drop-shadow-xl"
                onClick={onClose}>
            </div>
            {children}
        </>,
        modalRoot
    );
}

export default Modal;
