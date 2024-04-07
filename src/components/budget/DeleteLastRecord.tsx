import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import GeneralDialog from "../UI/Dialog";
import Modal from "../UI/Modal";

const styles = "text-center flex items-center justify-center bg-[#717A83] border border-white px-2";

const DeleteLastRecord = ({ id, disabled, deletableLog }: { id: number | undefined, disabled: boolean, deletableLog: LogType | undefined }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [log, setLog] = useState<LogType | undefined>(deletableLog);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  useEffect(() => {
    setLog(deletableLog);
  }, [deletableLog]);

  const queryClient = useQueryClient();

  const { mutate: deleteLog, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.delete("/log/" + id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({ queryKey: ["moenyAmount"] });
      alert("OKAY")
    },
    onError: () => alert("Something went wrong")
  });

  return (
    <>
      <button disabled={isPending || disabled} type="button" className="btn bg-red font-comfortaa text-white" onClick={() => openDialog()}>
        Delete Last Record
      </button>

      {showDialog && (
        <Modal onClose={closeDialog} type="dialog">
          <GeneralDialog
            title="Are you sure you want to delete this record?"
            content={
              (
                <>
                  <div className={styles + " w-[23%]"}>{log?.date}</div>
                  <div className={styles + " w-[13%]"}>{log?.transactionType}</div>
                  <div className={styles + " w-[14%]"}>{log?.transactionAmount} IQD</div>
                  <div className={styles + " w-[50%]"}>{log?.description}</div>
                </>
              )
            }
            closeDialog={closeDialog}
            submit={() => {
              deleteLog()
              return true
            }}
            type="dialog"
          />
        </Modal>
      )}
    </>
  )
}

export default DeleteLastRecord;

