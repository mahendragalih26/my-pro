import { Dialog } from "../../helper/initState/dialogs";
import * as dialogTypes from "./dialogTypes";

export const dialogConfig = (dialog: Dialog) => ({
  type: dialogTypes.DIALOG_CONFIG,
  payload: dialog,
});
