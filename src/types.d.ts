type LogType = {
    ID: number;
    date: string;
    budgetMoney: number | string;
    description: string;
    transactionType: "deposit" | "withdraw";
    transactionAmount: number;
    userID: number
    deletable?: boolean;
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
