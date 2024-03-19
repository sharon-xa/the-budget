import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "../../utils/auth";

const AmountOfMoney = () => {
    const token = getAuthToken();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["moenyAmount"],
        queryFn: async () => {
            const { data } = await axios.get<number>("http://localhost:8080/budget", {
                headers: { Authorization: token }
            })
            return data;
        }
    })

    let content;
    if (isLoading) content = "Loading..."
    if (isError) content = "Error Fetching Data."
    if (data || data === 0) content = (
        <>
            {data} <span className="font-semibold"> IQD</span>
        </>
    )

    return (
        <p className="text-white text-7xl font-comfortaa">
            {content}
        </p>
    )
}

export default AmountOfMoney;
