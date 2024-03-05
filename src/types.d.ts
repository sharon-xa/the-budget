type LogType = {
    EntryID: number;
    Date: string;
    BudgetMoney: number | string;
    Description: string;
    TransactionType: "deposit" | "withdraw";
    TransactionAmount: number;
    UserID: 0
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
