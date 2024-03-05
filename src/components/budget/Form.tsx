import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "../../utils/auth";
import GeneralDialog from "../UI/Dialog";

const defaultFormData: MyFormData = {
    message: "",
    money_amount: "",
    transaction_type: "deposit",
}

const btnStyles = `max-w-max px-4 py-2 rounded-md disabled:bg-grey`;

type Props = {
    closeModalHandler: () => void;
}

const Form = ({ closeModalHandler }: Props) => {
    const [formData, setFormData] = useState<MyFormData>(defaultFormData);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const token = getAuthToken();

    const { mutate: submitTransaction, isPending } = useMutation({
        // post the transaction to the server
        mutationFn: async () => await axios.post(`http://localhost:8080/${formData.transaction_type}`, {
            transactionAmount: +formData.money_amount,
            description: formData.message
        }, {
            headers: {
                Authorization: token
            }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prevFormData: MyFormData) => ({ ...prevFormData, [name]: value }));
    }

    // Should this function be async? why?
    const handleSubmit = function (): boolean {
        if (formData.money_amount === "") alert(`Enter The Amount of Money You Want To ${formData.transaction_type}`)
        else if (formData.money_amount === "0" || formData.money_amount === 0) alert(`You can't ${formData.transaction_type} 0 money`)
        else if (formData.message === "") alert("You must Enter a message");
        else if (formData.message.length < 15) alert("Message Is Too Short, It Must Be More Than 15 Characters Long");
        else {
            const formDataWithHistory = { ...formData };
            setFormData(formDataWithHistory)
            submitTransaction()
            return true
        }
        return false
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <div className="fixed top-56 w-[420px] bg-white bg-opacity-50 p-4 rounded-md z-50">
            <form className="flex flex-col gap-8 text-lg p-4 bg-[transparent]">
                <div className="flex flex-col gap-3">
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
                        className="border-[3px] border-[transparent] outline-none focus:border-light-green rounded-md px-2 py-1" />
                </div>

                <div className="flex flex-col gap-3">
                    <label>Type of Transaction</label>
                    <select
                        name="transaction_type"
                        id="transaction"
                        className="bg-[#fff] border-[3px] border-[transparent] outline-none focus:border-light-green rounded-md px-2 py-1"
                        required
                        onChange={handleChange}>
                        <option value="deposit" className="bg-[#fff]">deposit</option>
                        <option value="withdraw" className="bg-[#fff]">withdraw</option>
                    </select>
                </div>

                <div className="flex flex-col gap-3" aria-required>
                    <label>Description</label>
                    <textarea
                        placeholder="Describe The Transaction Here..."
                        value={formData.message}
                        onChange={handleChange}
                        name="message"
                        className="px-2 py-1 h-32 border-[3px] border-[transparent] outline-none focus:border-light-green rounded-md resize-none">
                    </textarea>
                </div>

                <div className="flex gap-5 justify-center text-[#fffeee]">
                    <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            handleClickOpen();
                        }}
                        disabled={isPending}
                        className={`bg-green hover:bg-[#19cc8ad8] ${btnStyles}`}>
                        Make Transaction
                    </button>
                    <button
                        type="button"
                        disabled={isPending}
                        className={`bg-red hover:bg-light-red ${btnStyles}`}
                        onClick={closeModalHandler}>
                        Cancel
                    </button>
                </div>
            </form>
            <GeneralDialog
                open={open}
                title="Are you sure you want to do this?"
                content={`You are going to ${formData.transaction_type} ${formData.money_amount} IQD.`}
                closeDialog={handleClickClose}
                submit={handleSubmit}
                closeModal={closeModalHandler}
            />
        </div>
    )
}

export default Form;
