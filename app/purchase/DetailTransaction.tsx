"use client"

import {
  useCreateProductMutation,
  useGetInventoryQuery,
  useGetProductsQuery,
} from "@/app/state/api"
import { PlusCircleIcon, SearchIcon } from "lucide-react"
import { useState } from "react"
import Header from "@/app/(components)/Header"
import Image from "next/image"
import { currencyConvert } from "@/app/helper"
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material"

interface Props {
  listProduct: []
}

type ProductFormData = {
  // name: string
  // price: number
  // stockQuantity: number
  // rating: number
  Id: string
  Code: string
  Image: string
  Name: string
  Price: number
}

const DetailTransaction = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [tmpProduct, settmpProduct] = useState([])

  const { data: products, isLoading, isError } = useGetProductsQuery(searchTerm)
  const {
    data: stock,
    isLoading: stockLoader,
    isError: stockError,
  } = useGetInventoryQuery()

  const [createProduct] = useCreateProductMutation()
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData)
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
        <Header name="Purchase Product" />
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.Data?.map((product) => (
            <div
              key={product?.Id}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={product?.Image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product?.Name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          Rp. {currencyConvert(product?.Price)}
                        </Typography>
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
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {/* <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      /> */}
    </div>
  )
}

export default DetailTransaction
