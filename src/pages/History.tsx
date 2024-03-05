import Logs from "../components/history/Logs";

const History = () => {
    return (
        <section className="flex flex-col gap-12 items-center ">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-5xl font-bold text-black opacity-80">Logs</h1>
                <p className="text-2xl font-medium text-black opacity-80">
                    Every deposit and withdrawal is presented here for agency members.
                </p>
            </div>
            <Logs />
        </section>
    )
}

export default History;
