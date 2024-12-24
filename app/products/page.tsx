"use client"

import {
  useCreateProductMutation,
  useGetInventoryQuery,
  useGetProductsQuery,
} from "@/app/state/api"
import { PlusCircleIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Header from "@/app/(components)/Header"
import CreateProductModal from "./CreateProductModal"
import Image from "next/image"
import { currencyConvert } from "@/app/helper"

import { SnackbarProps } from "@/app/helper/initState/snackbar"
import { snackbarConfig } from "../redux/snackbar/snackbarActions"
import { Pagination } from "@mui/material"
import {
  initProduct,
  Product,
  SingleProduct,
} from "../helper/initState/products"

interface Props {
  snackbarConfig: (data: SnackbarProps) => void
}

type ProductFormData = {
  Id: string
  Code: string
  Image: string
  Name: string
  Price: number
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    snackbarConfig: (data: SnackbarProps) => dispatch(snackbarConfig(data)),
  }
}

const mapStateToProps = (state: any) => {
  return {
    products: state.products,
  }
}

const Products: React.FC<Props> = ({ snackbarConfig }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tmpProduct, settmpProduct] = useState<SingleProduct[]>([])

  const { data: products, isLoading, isError } = useGetProductsQuery(searchTerm)
  const {
    data: stock,
    isLoading: stockLoader,
    isError: stockError,
  } = useGetInventoryQuery()

  useEffect(() => {
    if (products?.Data) {
      settmpProduct(products?.Data) // Store products in state
    }
  }, [products])

  useEffect(() => {
    console.log("aa = ", tmpProduct)

    return () => {
      // second
    }
  }, [tmpProduct])

  const [createProduct] = useCreateProductMutation()
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData).then((res: any) => {
      settmpProduct((prev) => {
        return [...prev, productData]
      })
      snackbarConfig({
        isSnackbarShown: true,
        title: "message",
        description: `${res?.data?.Message}`,
        severity: "success",
        // actionYes: () => {
        //   history.push(`/`);
        // },
        // defaultActionNo: true,
      })
    })
  }

  if (isLoading) {
    return <div className="py-4">Loading...</div>
  }

  if (isError || !products || stockError || !stock) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    )
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* PAGINATION */}
      <div className="flex-end my-5">
        <Pagination count={1} variant="outlined" shape="rounded" />
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          tmpProduct?.map((product: any) => (
            <div
              key={product?.Id}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={product?.Image}
                  alt={product?.Name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product?.Name}
                </h3>
                <p className="text-gray-800">
                  Rp. {currencyConvert(product?.Price)}
                </p>
                {stockLoader && stock ? (
                  <div className="text-sm text-gray-600 mt-1">
                    Stock : wait a sec..
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 mt-1">
                    Stock:{" "}
                    {stock?.Data?.find(
                      (item: any) => item?.ProductId === product?.Id
                    )?.Stock ?? "-"}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
        snackbarConfig={snackbarConfig}
      />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
