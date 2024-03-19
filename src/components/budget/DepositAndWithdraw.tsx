import { useState } from "react";
import Modal from "../UI/Modal";
import TransactionForm from "./TransactionForm";

const DepositAndWithdraw = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const openTransactionModal = () => setShowTransactionModal(true);
  const closeModalHandler = () => setShowTransactionModal(false);

  return (
    <div className="flex justify-center gap-8">
      <button className="font-comfortaa bg-blue py-2 px-3 text-white rounded" onClick={openTransactionModal}>
        Preform Transaction
      </button>
      {showTransactionModal && (
        <Modal onClose={closeModalHandler}>
          <TransactionForm closeModalHandler={closeModalHandler} />
        </Modal>
      )}
    </div>
  )
}

export default DepositAndWithdraw;

