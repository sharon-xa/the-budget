import LogsTable from "./LogsTable";
import { ColumnDef } from "@tanstack/react-table";

const Logs = ({ isLoading, isError, logs }: { isLoading: boolean, isError: boolean, logs: LogType[] | undefined }) => {
    const columns: ColumnDef<LogType>[] = [
        {
            header: "Date",
            accessorKey: "date",
        },
        {
            header: "Type",
            accessorKey: "transactionType",
        },
        {
            header: "Amount",
            accessorKey: "transactionAmount",
        },
        {
            header: "Description",
            accessorKey: "description",
        },
    ];

    let content;
    if (isLoading) content = "Loading...";
    if (isError) content = "Failed Fetching Logs";

    if (logs) {
        if (logs.length === 0) content = "There are no logs yet..."

        if (logs.length > 0)
            return (
                <section className="w-[1080px]">
                    <LogsTable data={logs} columns={columns} />
                </section>
            )
    }
    return (
        <div className="flex justify-center items-center mb-16">
            <p className="text-center font-comfortaa text-white text-2xl">{content}</p>
        </div>
    );
}

export default Logs;
