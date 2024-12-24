"use client"

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetInventoryQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/app/state/api"
import { Pen, PlusCircleIcon, SearchIcon, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Header from "@/app/(components)/Header"
import CreateProductModal from "./CreateProductModal"
import Image from "next/image"
import { currencyConvert } from "@/app/helper"

import { SnackbarProps } from "@/app/helper/initState/snackbar"
import { snackbarConfig } from "../redux/snackbar/snackbarActions"
import { Avatar, Pagination, Tooltip } from "@mui/material"
import {
  initProduct,
  Product,
  SingleProduct,
} from "../helper/initState/products"
import UpdateProductModal from "./UpdateProductModal"

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

  // Update product
  const [updateProps, setupdateProps] = useState<SingleProduct>()
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

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

  // useEffect(() => {
  //   console.log("aa = ", tmpProduct)

  //   return () => {
  //     // second
  //   }
  // }, [tmpProduct])

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
      })
    })
  }

  const [updateProduct] = useUpdateProductMutation()
  const handleUpdateProduct = async (productData: ProductFormData) => {
    await updateProduct({
      id: productData?.Id,
      updateProduct: {
        Code: productData?.Code,
        Name: productData?.Name,
        Image: productData?.Image,
        Price: productData?.Price,
      },
    }).then((res: any) => {
      if (res?.error) {
        snackbarConfig({
          isSnackbarShown: true,
          title: "message",
          description: `${res?.error?.data?.Message}`,
          severity: "error",
        })
      } else {
        snackbarConfig({
          isSnackbarShown: true,
          title: "message",
          description: `${res?.data?.Message}`,
          severity: "success",
        })
      }
    })
  }

  const [deleteProduct] = useDeleteProductMutation()

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId).then((res: any) => {
      if (res?.error) {
        snackbarConfig({
          isSnackbarShown: true,
          title: "message",
          description: `${res?.error?.data?.Message}`,
          severity: "error",
        })
      } else {
        snackbarConfig({
          isSnackbarShown: true,
          title: "message",
          description: `${res?.data?.Message}`,
          severity: "success",
        })
      }
    })
  }

  // Search function
  const searchByName = (name: string) => {
    return products?.Data.filter(
      (item) => item.Name.toLowerCase() === name.toLowerCase()
    )
  }

  useEffect(() => {
    // first
    if (searchTerm) {
      setTimeout(() => {
        let result = searchByName(searchTerm)
        if (result?.length) {
          settmpProduct(result)
        }
      }, 1000)
    }

    return () => {
      // second
    }
  }, [searchTerm])

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
          tmpProduct?.map((product: any, index: number) => (
            <div
              key={product?.Id}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto cursor-pointer"
            >
              <div
                className="flex flex-col items-center"
                onClick={() => {
                  setIsModalUpdateOpen(true)
                  setupdateProps(product)
                }}
              >
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
              <div className="flex flex-row-reverse">
                <div
                  onClick={() => {
                    handleDelete(product?.Id)
                  }}
                >
                  <Tooltip title="Delete Product">
                    <Avatar>
                      <Trash2 />
                    </Avatar>
                  </Tooltip>
                </div>
                <div
                  className="mr-3"
                  onClick={() => {
                    setIsModalUpdateOpen(true)
                    setupdateProps(product)
                  }}
                >
                  <Tooltip title="Edit Product">
                    <Avatar>
                      <Pen />
                    </Avatar>
                  </Tooltip>
                </div>
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

      <UpdateProductModal
        isOpen={isModalUpdateOpen}
        productList={updateProps}
        onClose={() => setIsModalUpdateOpen(false)}
        onUpdate={handleUpdateProduct}
        snackbarConfig={snackbarConfig}
      />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
