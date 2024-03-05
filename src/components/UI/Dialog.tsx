import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import Dialog from '@mui/material/Dialog';

type Props = {
    title: string,
    content: string,
    open: boolean,
    closeDialog: () => void,
    submit: () => boolean,
    closeModal?: () => void,
}

const GeneralDialog = ({ title, content, open, closeDialog, submit, closeModal }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div
                className="px-4 py-3"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={closeDialog} className="border-2 border-red px-4 py-1 rounded text-red hover:bg-light-red hover:text-white">Cancel</button>
                    <button onClick={() => {
                        const success = submit();
                        closeDialog()
                        if (success) {
                            closeModal && closeModal()
                        }
                    }} autoFocus className="bg-green border-2 border-green px-4 py-1 rounded text-white hover:bg-light-green"> Ok </button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default GeneralDialog;
