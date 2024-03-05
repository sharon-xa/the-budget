import { createContext } from "react";

export const authContext = createContext<AuthContextType>({
    authenticated: false,
    login() { },
    logout() { },
});
