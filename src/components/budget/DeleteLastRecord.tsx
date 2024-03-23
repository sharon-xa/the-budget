import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAuthToken } from "../../utils/auth";
import axios from "axios";
import GeneralDialog from "../UI/Dialog";

const DeleteLastRecord = ({ id, disabled }: { id: number | undefined, disabled: boolean }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const token = getAuthToken();

  const { mutate: deleteLog, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.delete("http://localhost:8080/log/" + id, {
        headers: {
          Authorization: token
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({ queryKey: ["moenyAmount"] });
      alert("OKAY")
    },
    onError: () => alert("Something went wrong")
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button disabled={isPending || disabled} type="button" className="btn bg-red font-comfortaa text-white" onClick={() => handleClickOpen()}>
        Delete Last Record
      </button>
      <GeneralDialog
        title="DELETE"
        content="Are you sure you want to delete this log?"
        open={open}
        closeDialog={handleClickClose}
        submit={() => {
          deleteLog()
          return true
        }}
      />
    </>
  )
}

export default DeleteLastRecord;

