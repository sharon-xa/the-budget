import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AmountOfMoney = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["moenyAmount"],
        queryFn: async () => {
            const { data } = await axios.get<string>("/budget")
            return data;
        }
    })

    let content;
    if (isLoading) content = "Loading..."
    if (isError) content = "Error Fetching Data."
    if (data) content = (
        <>
            {data + " "} <span className="font-semibold">IQD</span>
        </>
    )

    return (
        <p className="text-white text-7xl font-comfortaa">
            {content}
        </p>
    )
}

export default AmountOfMoney;
