// Import Custom Reducers
import inventoryReducers from "@/app/redux/inventory/inventoryReducer"
import SnacbarReducers from "@/app/redux/snackbar/snackbarReducer"
import DialogReducers from "@/app/redux/dialog/dialogReducer"

const rootReducerList = {
  inventory: inventoryReducers,
  dialog: DialogReducers,
  snackbar: SnacbarReducers,
}

export default rootReducerList
