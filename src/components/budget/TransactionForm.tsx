import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GeneralDialog from "../UI/Dialog";
import Modal from "../UI/Modal";

const checkValidation = (formData: TransactionFormData): { isValid: boolean, err: string } => {
    if (formData.money_amount === "")
        return { isValid: false, err: `You must enter a valid amount of moeny` };

    else if (formData.money_amount === "0" || formData.money_amount === 0)
        return { isValid: false, err: `You can't ${formData.transaction_type} 0 IQD` };

    else if (formData.message === "")
        return { isValid: false, err: `You must enter a message` };

    else if (formData.message.length < 15)
        return { isValid: false, err: `Message is too short, It must be more than 15 characters long` };

    else
        return { isValid: true, err: `` };
};

const defaultFormData: TransactionFormData = {
    message: "",
    money_amount: "",
    transaction_type: "deposit",
}

const TransactionForm = ({ closeModalHandler }: { closeModalHandler: () => void }) => {
    const [formData, setFormData] = useState<TransactionFormData>(defaultFormData);
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

    const queryClient = useQueryClient();
    const { mutate: submitTransaction, isPending } = useMutation({
        mutationFn: async () => await axios.post(`/${formData.transaction_type}`, {
            transactionAmount: +formData.money_amount,
            description: formData.message
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["moenyAmount"] });
            queryClient.invalidateQueries({ queryKey: ["logs"] });
            setFormData(defaultFormData);
            closeModalHandler();
            alert("Transaction Was Successful");
        },
        onError: () => {
            alert("Something went wrong");
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prevFormData: TransactionFormData) => ({ ...prevFormData, [name]: value }));
        const { isValid } = checkValidation(formData);
        setFormIsValid(isValid);
    }


    const handleSubmit = (): boolean => {
        const { isValid, err } = checkValidation(formData);

        if (isValid) {
            setFormData(formData)
            submitTransaction()
            return isValid;
        } else {
            alert(err)
            return isValid;
        }
    }

    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[420px] bg-[#fff] bg-opacity-35 p-4 z-50 border-white border-2 font-comfortaa font-medium text-[#fff]">
            <form className="flex flex-col gap-8 text-lg py-4 px-2 bg-[transparent]">
                <div className="flex flex-col gap-2">
                    <label>Amount of Money</label>
                    <input
                        type="number"
                        min={0}
                        required
                        placeholder="Enter Amount in Iraqi Dinar"
                        value={formData.money_amount}
                        onChange={handleChange}
                        name="money_amount"
                        step={250}
                        className="border-[3px] border-[transparent] outline-none focus:border-light-green rounded px-2 py-1 bg-light-grey" />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Type of Transaction</label>
                    <select
                        name="transaction_type"
                        id="transaction"
                        className="border-[3px] border-[transparent] outline-none focus:border-light-green rounded px-2 py-1 bg-light-grey"
                        required
                        onChange={handleChange}>
                        <option value="deposit" className="">deposit</option>
                        <option value="withdraw" className="">withdraw</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2" aria-required>
                    <label>Description</label>
                    <textarea
                        placeholder="Describe The Transaction Here..."
                        value={formData.message}
                        onChange={handleChange}
                        name="message"
                        className="px-2 py-1 h-40 border-[3px] border-[transparent] outline-none focus:border-light-green rounded resize-none bg-light-grey">
                    </textarea>
                </div>

                <div className="flex gap-5 justify-center text-[#fffeee]">
                    <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            openDialog();
                        }}
                        disabled={isPending || !formIsValid}
                        className={`bg-blue btn`}>
                        Preform Transaction
                    </button>
                    <button
                        type="button"
                        disabled={isPending}
                        className={`btn bg-grey`}
                        onClick={closeModalHandler}>
                        Cancel
                    </button>
                </div>
            </form>

            {showDialog && (
                <Modal onClose={closeDialog} type="dialog">
                    <GeneralDialog
                        title="Are you sure you want to do this?"
                        content={`You are going to ${formData.transaction_type} ${formData.money_amount} IQD.`}
                        closeDialog={closeDialog}
                        submit={handleSubmit}
                        closeModal={closeModalHandler}
                        type="form"
                    />
                </Modal>
            )}
        </div>
    )
}

export default TransactionForm;
