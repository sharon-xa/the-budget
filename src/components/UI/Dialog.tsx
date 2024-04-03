import { ReactNode } from "react";

type Props = {
    title: string,
    content: ReactNode,
    closeDialog: () => void,
    submit: () => boolean,
    closeModal?: () => void,
    type: "form" | "dialog"
}

const GeneralDialog = ({ title, content, closeDialog, submit, closeModal, type }: Props) => {
    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#fff] bg-opacity-30 p-4 z-[100] border-white border-2 font-comfortaa font-medium text-[#fff]">
            <div
                className="flex flex-col gap-4"
            >
                <h2 className="text-center font-comfortaa text-xl">
                    {title}
                </h2>
                <div className="flex justify-center items-center w-auto">
                    {content}
                </div>
                <div className="flex justify-center items-center gap-4">
                    <button onClick={() => {
                        const success = submit();
                        closeDialog()
                        if (success) {
                            closeModal && closeModal()
                        }
                    }} autoFocus className={`btn ${type === "form" ? "bg-blue" : "bg-red"} !w-[100px] !max-w-none`}> {type === "form" ? "Proceed" : "Delete"} </button>
                    <button onClick={closeDialog} className={`btn bg-grey !w-[100px] !max-w-none`}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default GeneralDialog;
