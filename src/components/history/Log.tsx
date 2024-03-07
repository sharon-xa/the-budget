import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSpaceBetweenHundreds, capitalizeFirstCharacter } from "../../helpers";
import { getAuthToken, isAdmin } from "../../utils/auth";
import GeneralDialog from "../UI/Dialog";
import { useState } from "react";

type Props = {
    id: string;
    history: string;
    moneyAmount: number | string;
    message: string;
    transactionType: "deposit" | "withdraw";
    deletable: boolean;
}

const Log = ({ id, history, moneyAmount, message, transactionType, deletable }: Props) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const token = getAuthToken();

    const { mutate: deleteLog, isPending } = useMutation({
        mutationFn: async () => {
            return await axios.delete("http://localhost:8080/log/" + id, {
                headers: {
                    Authorization: token
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs"] });
            queryClient.invalidateQueries({ queryKey: ["moenyAmount"] });
            alert("OKAY")
        },
        onError: () => alert("Something went wrong")
    })


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };


    return (
        <div
            className={`py-3 px-6 bg rounded-lg flex flex-col gap-4 ${transactionType === "withdraw" ? "bg-red" : "bg-green"} text-[#eee]`}>
            <div className="flex justify-between items-center">
                <p className="bg-black bg-opacity-20 py-1 px-2 rounded-md">{history}</p>
                <div className="flex items-center text-center gap-8">
                    <p className={`text-2xl w-36 py-1 px-2 rounded-md bg-white bg-opacity-[0.28]`}>
                        {capitalizeFirstCharacter(transactionType)}
                    </p>
                    <p className="text-2xl min-w-[180px] px-4 py-1 rounded-md bg-white bg-opacity-[0.28]">
                        {addSpaceBetweenHundreds(moneyAmount)} IQD
                    </p>
                    {
                        // The only user who can delete is the admin
                        isAdmin() &&
                        <div>
                            {
                                deletable ?
                                    <>
                                        <button
                                            disabled={isPending}
                                            type="button"
                                            className="bg-black bg-opacity-20 hover:bg-opacity-10 px-4 py-2 rounded-md disabled:bg-grey disabled:text-black disabled:cursor-not-allowed"
                                            onClick={() => handleClickOpen()}>
                                            DELETE
                                        </button>
                                        <GeneralDialog
                                            title="DELETE"
                                            content="Are you sure you want to delete this log?"
                                            open={open}
                                            closeDialog={handleClickClose}
                                            submit={() => {
                                                deleteLog()
                                                return true
                                            }}
                                        />
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    }
                </div>
            </div>
            <p className="text-xl px-2">
                {capitalizeFirstCharacter(message)}
            </p>
        </div >
    );
}

export default Log;
