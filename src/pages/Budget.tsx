import AmountOfMoney from "../components/budget/AmountOfMoney"
import BudgetAnimated from "../components/budget/BudgetAnimated"
import DepositAndWithdraw from "../components/budget/DepositAndWithdraw"

const Budget = () => {
    return (
        <>
            <BudgetAnimated />
            <div className="flex flex-col justify-between gap-20 items-center font-medium text-6xl mb-8">
                <AmountOfMoney />
                {/* Authorization needed here, when user is ADMIN show the button, when the user is USER don't show the button */}
                <DepositAndWithdraw />
            </div>
        </>
    )
}

export default Budget;
