import AmountOfMoney from "../components/budget/AmountOfMoney"
import DepositAndWithdraw from "../components/budget/DepositAndWithdraw"

const Budget = () => {
    return (
        <>
            <div className="">
                <AmountOfMoney />
                <DepositAndWithdraw />
            </div>
        </>
    )
}

export default Budget;
