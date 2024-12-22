import { SnackbarProps } from "@/app/helper/initState/snackbar"
import * as snackbarTypes from "./snackbarTypes"

export const snackbarConfig = (snackbar: SnackbarProps) => ({
  type: snackbarTypes.SNACKBAR_CONFIG,
  payload: snackbar,
})
