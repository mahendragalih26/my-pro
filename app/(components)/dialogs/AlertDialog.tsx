import React from "react"
import Button from "@mui/material/Button"
import DialogContainer from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography"
import { X } from "lucide-react"
import { Dialog, initDialog } from "../../helper/initState/dialogs"
import { connect } from "react-redux"
import { dialogConfig } from "@/app/redux/dialog/dialogActions"

interface Props {
  dialog: Dialog
  dialogConfig: (data: Dialog) => void
  withoutClose?: boolean
}

const mapStateToProps = (state: any) => {
  return {
    dialog: state.dialog,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dialogConfig: (data: Dialog) => dispatch(dialogConfig(data)),
  }
}

const DialogComponent: React.FC<Props> = ({ dialog, dialogConfig }) => {
  const resetDialog = () => {
    dialogConfig({
      isDialogShown: false,
    })
    setTimeout(() => {
      dialogConfig(initDialog)
    }, 200)
  }
  const closeDialog = () => {
    // if (dialog?.actionNo) {
    //   dialog.actionNo()
    // }
    resetDialog()
  }
  const yesStatementDialog = () => {
    // if (dialog?.actionYes) {
    //   dialog.actionYes()
    // }
    resetDialog()
  }

  return (
    <DialogContainer
      open={dialog.isDialogShown}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
      >
        <Typography
          className="text-base font-semibold !font-neosans-md"
          style={{ color: "#1b1464", fontWeight: 600 }}
        >
          {dialog.title}
        </Typography>
        {dialog?.withoutClose ? (
          ""
        ) : (
          <X
            style={{ color: "#E11F27", cursor: "pointer" }}
            onClick={closeDialog}
          />
        )}
      </DialogTitle>
      <DialogContent
        style={{
          maxWidth: "460px",
          padding: "4px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        className="flex items-center"
      >
        <DialogContentText
          sx={{
            display: "flex",
          }}
          id="alert-dialog-description"
          className="text-center"
        >
          <Typography style={{ color: "#5A5A5A" }}>
            {dialog.description}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogContent
        sx={{
          display: "flex",
        }}
      >
        <>
          {dialog.defaultActionNo && (
            <Button
              onClick={closeDialog}
              sx={{
                width: { xs: "100%", sm: "100%", md: "160px", lg: "200px" },
                height: { xs: "40px", sm: "45px", md: "50px", lg: "60px" },
                boxShadow:
                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FF6A81",
                  textTransform: "capitalize",
                }}
              >
                {dialog?.cancelLabel}
              </Typography>
            </Button>
          )}
          <Button
            onClick={yesStatementDialog}
            color="primary"
            autoFocus
            sx={{
              width: dialog.defaultActionNo
                ? { xs: "100%", sm: "100%", md: "160px", lg: "200px" }
                : "100%",
              height: { xs: "40px", sm: "45px", md: "50px", lg: "60px" },
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {dialog?.saveLabel}
            </Typography>
          </Button>
        </>
      </DialogContent>
    </DialogContainer>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogComponent)
