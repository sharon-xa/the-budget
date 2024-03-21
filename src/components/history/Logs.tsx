import LogsTable from "./LogsTable";
import { ColumnDef } from "@tanstack/react-table";

const Logs = ({ isLoading, isError, logs }: { isLoading: boolean, isError: boolean, logs: LogType[] }) => {
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
    if (isLoading) content = (<p className="text-center">Loading...</p>);
    if (isError) content = (<p className="text-center">Failed Fetching Logs</p>);
    if (logs) {
        if (logs.length === 0)
            content = <p className="text-center">There are no logs yet...</p>
        else if (logs.length > 0)
            content = <LogsTable data={logs} columns={columns} />
    }

    return (
        <section className="w-[1080px]">
            {content}
        </section>
    )
}

export default Logs;
