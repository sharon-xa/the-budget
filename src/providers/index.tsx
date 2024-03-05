import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { authContext } from "../context/authContext";

type Props = {
    children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    const [queryClient] = useState(() => new QueryClient());
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const login = () => setAuthenticated(true);
    const logout = () => setAuthenticated(false);

    return (
        <authContext.Provider value={{ authenticated, login, logout }}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </authContext.Provider>
    )
}
