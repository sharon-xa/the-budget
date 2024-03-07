import Log from "./Log";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "../../utils/auth";
import { findLastLog } from "../../helpers";
import LogsTable from "./LogsTable";

const Logs = () => {
    const token = getAuthToken();

    const { data: logs, isLoading, isError } = useQuery({
        queryKey: ["logs"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:8080/logs", {
                headers: {
                    Authorization: token
                }
            })
            console.log(data);
            return data as LogType[];
        },
    });

    let content;
    if (isLoading) content = (<p className="text-center">Loading...</p>);
    if (isError) content = (<p className="text-center">Failed Fetching Logs</p>);
    if (logs) {
        const deletableLogId: number = findLastLog(logs);
        logs[deletableLogId]["deletable"] = true;

        if (logs.length === 0)
            content = <p className="text-center">There are no logs yet...</p>
        else
            content = (
                logs.map(log =>
                    <Log
                        key={log.ID}
                        id={`${log.ID}`}
                        history={log.date}
                        moneyAmount={log.transactionAmount}
                        message={log.description}
                        transactionType={log.transactionType}
                        deletable={log.deletable ? log.deletable : false}
                    />
                )
            )
    }

    return (
        <>
            <section className="bg-white bg-opacity-60 p-6 border-4 rounded-md flex flex-col gap-5 min-w-[900px] max-w-[1000px] max-h-[540px] overflow-y-auto">
                {content}
            </section>
            <LogsTable />
        </>
    )
}

export default Logs;
