import { Product } from "@/app/helper/initState/products"
import * as inventoryTypes from "./inventoryTypes"

export const setNewProduct = (data: Product) => ({
  type: inventoryTypes.SET_NEW_PRODUCT,
  payload: data,
})
