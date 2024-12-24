export interface Dialog {
  isDialogShown: boolean
  title?: string
  description?: string
  cancelLabel?: string
  saveLabel?: string
  // actionYes?: () => void;
  // actionNo?: () => void | undefined;
  defaultActionNo?: boolean
  withoutClose?: boolean
}

export const initDialog: Dialog = {
  isDialogShown: false,
  title: "",
  description: "",
  cancelLabel: "Batal",
  saveLabel: "Ok",
  // actionYes: () => ({}),
  // actionNo: () => void {},
  defaultActionNo: false,
  withoutClose: false,
}
