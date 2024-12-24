export interface SnackbarProps {
  isSnackbarShown: boolean
  title?: string
  description?: string
  cancelLabel?: string
  saveLabel?: string
  severity?: "info" | "error" | "success" | "warning"
  // actionYes?: () => void;
  // actionNo?: () => void | undefined;
  defaultActionNo?: boolean
  withoutClose?: boolean
}

export const initSnackbar: SnackbarProps = {
  isSnackbarShown: false,
  title: "",
  description: "",
  cancelLabel: "Batal",
  saveLabel: "Ok",
  severity: "error",
  // actionYes: () => ({}),
  // actionNo: () => void {},
  defaultActionNo: false,
  withoutClose: false,
}
