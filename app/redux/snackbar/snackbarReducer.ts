import * as snackbarTypes from "./snackbarTypes"
// import { initDialog, Dialog } from "../../helper/initState/dialogs";
import { initSnackbar, SnackbarProps } from "@/app/helper/initState/snackbar"

const snackbarReducer = (
  state: SnackbarProps = initSnackbar,
  action: { type: string; payload?: SnackbarProps }
): SnackbarProps => {
  switch (action.type) {
    case snackbarTypes.SNACKBAR_CONFIG:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default snackbarReducer
