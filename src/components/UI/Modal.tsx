import { createPortal } from "react-dom";
import { ReactNode } from "react";

type Props = {
    children: ReactNode | JSX.Element,
    onClose: () => void,
    type: "form" | "dialog",
}

function Modal({ onClose, children, type }: Props) {
    const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

    return createPortal(
        <>
            <div
                className={`fixed w-full h-screen ${type === "form" ? "z-30" : "z-50"} bg-black bg-opacity-50 backdrop-blur-md drop-shadow-xl`}
                onClick={onClose}>
            </div>
            {children}
        </>,
        modalRoot
    );
}

export default Modal;
