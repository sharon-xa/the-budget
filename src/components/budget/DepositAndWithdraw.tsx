import { useState } from "react";
import Modal from "../UI/Modal";
import Form from "./Form";
import { isAdmin } from "../../utils/auth";

const DepositAndWithdraw = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const openTransactionModal = () => setShowTransactionModal(true);
  const closeModalHandler = () => setShowTransactionModal(false);

  return (
    <div className="flex justify-center gap-8">
      {
        isAdmin() &&
        <button
          className={"text-[#eeefff] py-3 px-6 rounded-md text-2xl font-medium bg-green hover:bg-opacity-80 w-72"}
          onClick={openTransactionModal}>
          Transaction
        </button>
      }
      {
        showTransactionModal &&
        <Modal onClose={closeModalHandler}>
          <Form closeModalHandler={closeModalHandler} />
        </Modal>
      }
    </div>
  )
}

export default DepositAndWithdraw;