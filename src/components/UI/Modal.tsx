import { ReactDOM } from "react";

type Props = {
    children: ReactDOM | JSX.Element,
    onClose: () => void
}

const Modal = ({ onClose, children }: Props) => {
    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-screen z-30 bg-black bg-opacity-50 flex backdrop-blur-md drop-shadow-xl"
                onClick={onClose}>
            </div>
            {children}
        </>
    );
};

export default Modal;