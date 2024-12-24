import React, { useEffect } from "react"
import { connect } from "react-redux"
import Button from "@mui/material/Button"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { SnackbarProps, initSnackbar } from "@/app/helper/initState/snackbar"
import { snackbarConfig } from "../../redux/snackbar/snackbarActions"

interface Props {
  snackbar: SnackbarProps
  snackbarConfig: (data: SnackbarProps) => void
  //   withoutClose?: boolean;
}

const mapStateToProps = (state: any) => {
  // console.log("state reduxx = ", state);
  return {
    snackbar: state.snackbar,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    snackbarConfig: (data: SnackbarProps) => dispatch(snackbarConfig(data)),
  }
}

const SnackbarComponent: React.FC<Props> = ({ snackbar, snackbarConfig }) => {
  const resetSnackbar = () => {
    snackbarConfig({
      isSnackbarShown: false,
    })
    setTimeout(() => {
      snackbarConfig(initSnackbar)
    }, 200)
  }
  const closeSnackbar = () => {
    resetSnackbar()
  }

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // useEffect(() => {
  //   // first
  //   console.log("snackbar = ", snackbar);

  //   return () => {
  //     //   second
  //   };
  // }, [snackbar]);

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={snackbar?.isSnackbarShown}
        // open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          //   severity="success"
          severity={snackbar?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar?.description}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarComponent)
