import Log from "./Log";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "../../utils/auth";
import React, { useState } from "react";
import { findLastLog } from "../../helpers";

type SortingTypes = "date-asc" | "date-desc" | "amount-asc" | "amount-desc";

const Logs = () => {
    const [sortingType, setSortingType] = useState<SortingTypes>("date-desc");
    const token = getAuthToken();

    const { data: logs, isLoading, isError, refetch } = useQuery({
        queryKey: ["logs"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:8080/logs:" + sortingType, {
                headers: {
                    Authorization: token
                }
            })
            return data as LogType[];
        },
    });

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortingType(event.target.value as SortingTypes);
        refetch()
    };

    let content;
    if (isLoading) content = (<p className="text-center">Loading...</p>);
    if (isError) content = (<p className="text-center">Failed Fetching Logs</p>);
    if (logs) {

        const deletableLogId: number = findLastLog(logs);
        logs[deletableLogId]["deletable"] = true;

        content = (
            <>
                {
                    logs.length === 0 ?
                        <p className="text-center">There are no logs yet...</p>
                        :
                        <>
                            <form onSubmit={() => { }} className="my-4">
                                <label htmlFor="sortingType" className="mr-2">
                                    Sort By:
                                </label>
                                <select
                                    name="sortingType"
                                    id="sortingType"
                                    onChange={handleSelectChange}
                                    value={sortingType}
                                    className="p-2 border border-gray-300 rounded"
                                >
                                    <option value="date-desc">Date (Descending)</option>
                                    <option value="date-asc">Date (Ascending)</option>
                                    <option value="amount-desc">Amount (Descending)</option>
                                    <option value="amount-asc">Amount (Ascending)</option>
                                </select>
                            </form>
                            {logs.map(log => (
                                <Log
                                    key={log.EntryID}
                                    id={`${log.EntryID}`}
                                    history={log.Date}
                                    money_amount={log.TransactionAmount}
                                    message={log.Description}
                                    transaction_type={log.TransactionType}
                                    deletable={log.deletable ? log.deletable : false}
                                />
                            ))}
                        </>
                }
            </>
        )
    }

    return (
        <section
            className="bg-white bg-opacity-60 p-6 border-4 rounded-md flex flex-col gap-5 min-w-[900px] max-w-[1000px] max-h-[540px] overflow-y-auto"
        >
            {content}
        </section>
    )
}

export default Logs;
