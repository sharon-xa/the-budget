import { redirect } from "react-router-dom";

export function getTokenDuration(): number | null {
    const storedExpirationDate = localStorage.getItem("expiration");
    if (storedExpirationDate) {
        const expirationDate = new Date(storedExpirationDate);
        const now = new Date();
        const duration = expirationDate.getTime() - now.getTime();
        return duration;
    }
    return null
}

export function getAuthToken(): string | null {
    const token = localStorage.getItem("token");

    if (!token)
        return null;

    const tokenDuration = getTokenDuration();

    if (tokenDuration === null || tokenDuration < 0)
        return "EXPIRED";

    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) return redirect("/login");

    return null;
}

export function isAdmin() {
    const userRole = localStorage.getItem("role") as "ADMIN" | "USER";
    return userRole === "ADMIN";
}