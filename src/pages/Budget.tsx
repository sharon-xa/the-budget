import axios from "axios";
import AmountOfMoney from "../components/budget/AmountOfMoney"
import DeleteLastRecord from "../components/budget/DeleteLastRecord";
import DepositAndWithdraw from "../components/budget/DepositAndWithdraw"
import Logs from "../components/history/Logs";
import { getAuthToken, isAdmin } from "../utils/auth";
import { useQuery } from "@tanstack/react-query";
import { findLastLog } from "../helpers";

const Budget = () => {
    const token = getAuthToken();
    const admin: boolean = isAdmin();

    const { data: logs, isLoading, isError } = useQuery({
        queryKey: ["logs"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:8080/logs", {
                headers: {
                    Authorization: token
                }
            })
            return data as LogType[];
        },
    });

    let lastLog: LogType | null;

    if (logs) {
        const lastLogId: number = findLastLog(logs);
        lastLog = logs[lastLogId];
    } else lastLog = null;

    return (
        <div className="flex flex-col items-center justify-between gap-16">
            <div className={`flex items-center ${admin ? "justify-between" : "justify-center"} gap-10 w-[100%] flex-col xl:flex-row xl:gap-48`}>
                <AmountOfMoney />
                {admin && (
                    <div className="flex gap-4 justify-center items-center">
                        <DepositAndWithdraw />
                        <DeleteLastRecord disabled={logs?.length === 0} id={lastLog?.id} />
                    </div>
                )}
            </div>
            <Logs isLoading={isLoading} isError={isError} logs={logs ? logs : []} />
        </div>
    )
}

export default Budget;
