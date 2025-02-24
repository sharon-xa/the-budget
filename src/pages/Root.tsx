import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { Providers } from "../providers";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";


function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            submit(null, { action: "/logout", method: "POST" });
            return;
        }

        const tokenDuration = getTokenDuration();
        if (tokenDuration === null || tokenDuration < 0)
            submit(null, { action: "/logout", method: "POST" });

        setTimeout(() => {
            submit(null, { action: "/logout", method: "POST" });
        }, tokenDuration ? tokenDuration : undefined);
    }, [token, submit]);

    return (
        <Providers>
            <div className="h-screen w-screen fixed background"></div>
            {!token ? <></> : <Navbar />}
            <main className="flex justify-center items-center">
                <Outlet />
            </main>
        </Providers>
    );
}

export default RootLayout;
