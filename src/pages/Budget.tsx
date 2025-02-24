import axios from "axios";
import AmountOfMoney from "../components/budget/AmountOfMoney"
import DeleteLastRecord from "../components/budget/DeleteLastRecord";
import DepositAndWithdraw from "../components/budget/DepositAndWithdraw"
import Logs from "../components/history/Logs";
import { getAuthToken, isAdmin } from "../utils/auth";
import { useQuery } from "@tanstack/react-query";
import { findLastLog, formatDate } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Budget = () => {
    const navigate = useNavigate();

    // page guard
    useEffect(() => {
        const token = getAuthToken();
        if (!token) navigate("/login");
    })
    const admin: boolean = isAdmin();

    const { data: logs, isLoading, isError } = useQuery<LogType[] | undefined>({
        queryKey: ["logs"],
        queryFn: async () => {
            const { data } = await axios.get("/logs")
            return data as LogType[];
        },
    });

    logs?.forEach(log => log.date = formatDate(log.date))

    let lastLog: LogType | undefined;

    if (logs) {
        const lastLogId: number = findLastLog(logs);
        lastLog = logs[lastLogId];
    } else lastLog = undefined;

    return (
        <div className="flex flex-col items-center justify-between sm:gap-8 xl:gap-16 mt-16">
            <div className={`flex items-center ${admin ? "justify-between" : "justify-center"} gap-10 w-[100%] flex-col xl:flex-row xl:gap-48`}>
                <AmountOfMoney />
                {admin && (
                    <div className="flex gap-4 justify-center items-center">
                        <DepositAndWithdraw />
                        <DeleteLastRecord disabled={logs?.length === 0} deletableLog={lastLog} />
                    </div>
                )}
            </div>
            <Logs isLoading={isLoading} isError={isError} logs={logs} />
        </div>
    )
}

export default Budget;
