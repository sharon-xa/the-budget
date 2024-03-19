type LogType = {
    id: number;
    date: string;
    budgetMoney: number | string;
    description: string;
    transactionType: "deposit" | "withdraw";
    transactionAmount: number;
    userId: number
}

type MyFormData = {
    money_amount: number | string;
    transaction_type: "deposit" | "withdraw";
    message: string;
}

type AuthContextType = {
    authenticated: boolean;
    login: () => void;
    logout: () => void;
}

type LoginResponseType = {
    message: string;
    token: string;
    role: "ADMIN" | "USER";
}
