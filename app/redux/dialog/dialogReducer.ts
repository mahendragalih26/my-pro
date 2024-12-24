import * as dialogTypes from "./dialogTypes";
import { initDialog, Dialog } from "../../helper/initState/dialogs";

const dialogReducer = (
  state: Dialog = initDialog,
  action: { type: string; payload?: Dialog }
): Dialog => {
  switch (action.type) {
    case dialogTypes.DIALOG_CONFIG:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default dialogReducer;
