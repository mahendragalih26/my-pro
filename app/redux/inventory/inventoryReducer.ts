import { initProduct, Product } from "@/app/helper/initState/products"
import * as inventoryTypes from "./inventoryTypes"

const InventoryReducer = (
  state: Product = initProduct,
  action: {
    type: string
    payload?: Product | any
    idUpdate?: number
  }
): Product => {
  switch (action.type) {
    case inventoryTypes.SET_NEW_PRODUCT:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default InventoryReducer
