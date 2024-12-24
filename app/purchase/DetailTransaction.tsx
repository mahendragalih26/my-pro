import {
  useCreateProductMutation,
  useGetPurchaseDetailQuery,
} from "@/app/state/api"
import { PlusCircleIcon, SearchIcon, ShoppingCart } from "lucide-react"
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
  CardContent,
  Button,
  CardActions,
  Chip,
} from "@mui/material"

interface Props {
  purchaseId: string
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

const DetailTransaction = ({ purchaseId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [tmpProduct, settmpProduct] = useState([])
  const {
    data: purchaseList,
    isLoading,
    isError,
  } = useGetPurchaseDetailQuery(purchaseId)

  //   const [createProduct] = useCreateProductMutation()
  //   const handleCreateProduct = async (productData: ProductFormData) => {
  //     await createProduct(productData)
  //   }

  if (isLoading) {
    return <div className="py-4">Loading...</div>
  }

  if (isError || !purchaseList?.Data) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    )
  }

  console.log("purchaseList = ", purchaseList)

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
      <div className="justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between text-end">
              {purchaseList?.Data?.Items?.map((product: any) => (
                <div className="flex flex-row " key={product?.Id}>
                  <CardContent>
                    <Image
                      src={product?.Product?.Image}
                      alt={product?.Product?.Name}
                      width={150}
                      height={150}
                      className="mb-3 rounded-2xl w-36 h-36"
                    />
                  </CardContent>
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 0.5 }}>
                      {product?.Product?.Name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Price :{" "}
                      <span>
                        Rp. {currencyConvert(product?.Product?.Price)}
                      </span>
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Purchase : <span> {product?.Quantity} pcs</span>
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}
                    >
                      Discount {product?.Discount}%
                    </Typography>
                    <Divider />
                    <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                      SubTotal :{" "}
                      <span>Rp. {currencyConvert(product?.Subtotal)}</span>
                    </Typography>
                  </CardContent>
                </div>
              ))}
            </div>
            <Divider />
            <Typography
              variant="h6"
              component="div"
              sx={{ mt: 1, textAlign: "end" }}
            >
              Total : Rp. {currencyConvert(purchaseList?.Data?.Total)}
            </Typography>
          </div>
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
