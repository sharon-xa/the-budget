import { useState } from "react";
import { isAdmin } from "../../utils/auth";
import Modal from "../UI/Modal";
import TransactionForm from "./TransactionForm";

const DepositAndWithdraw = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const openTransactionModal = () => setShowTransactionModal(true);
  const closeModalHandler = () => setShowTransactionModal(false);

  return (
    <div className="flex justify-center gap-8">
      {
        isAdmin() &&
        <button
          className={""}
          onClick={openTransactionModal}>
          Transaction
        </button>
      }
      {
        showTransactionModal &&
        <Modal onClose={closeModalHandler}>
          <TransactionForm closeModalHandler={closeModalHandler} />
        </Modal>
      }
    </div>
  )
}

export default DepositAndWithdraw;
