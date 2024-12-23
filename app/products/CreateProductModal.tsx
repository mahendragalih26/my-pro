import React, { ChangeEvent, FormEvent, useState } from "react"
import { v4 } from "uuid"
import Header from "@/app/(components)/Header"
import { formatRupiah } from "@/app/helper"
import Input from "../(components)/InputField/Input"
import { Button } from "@mui/material"
import UploadFile from "../(components)/InputField/uploadFile"

type ProductFormData = {
  Id: string
  Code: string
  Image: string
  Name: string
  Price: number
  stock?: number
}

type CreateProductModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (formData: ProductFormData) => void
}

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    Id: v4(),
    Code: "",
    Image: "",
    Name: "",
    Price: 0,
    Stock: 0,
    // name: "",
    // price: 0,
    // stockQuantity: 0,
    // rating: 0,
  })

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //     // [name]: name === "Price" ? formatRupiah(value) : value,
  //   })
  // }

  const handleChange = (name: string | number, value: any) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onCreate(formData)
    onClose()
  }

  if (!isOpen) return null

  const labelCssStyles = "block text-sm font-medium text-gray-700"
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* Product Image */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Image
          </label>
          <div className="my-3">
            <UploadFile
              setValue={(val) => {
                console.log("val = ", val)
                handleChange("Image", val)
              }}
            />
          </div>

          {/* PRODUCT NAME */}
          <div className="my-3">
            <Input
              label="Product Name"
              variant="felxibel"
              required={true}
              type="text"
              className="w-full"
              placeholder="Product Name"
              setValue={(val) => {
                // console.log("value input = ", val)
                handleChange("Name", val)
              }}
              helperText="Product Name cannot be empty"
              // helperComponent={}
              value={formData?.Name}
              customValidation={!formData?.Name}
            />
          </div>

          {/* PRICE */}
          <div className="my-3">
            <Input
              label="Price"
              variant="felxibel"
              required={true}
              type="currency"
              className="w-full"
              placeholder="Price"
              setValue={(val) => {
                // console.log("value input = ", val)
                handleChange("Price", val)
              }}
              helperText="Price cannot be empty"
              // helperComponent={}
              value={formData?.Price}
              // disabled={
              //   tmpResolve?.sub_kategori_resolve === 2
              //     ? false
              //     : isPopupEdit || informasiFurther
              // }
              customValidation={!formData?.Price}
            />
          </div>

          {/* STOCK QUANTITY */}
          {/* <Input
            label="Price"
            variant="felxibel"
            required={true}
            type="currency"
            className="w-full"
            placeholder="Price"
            setValue={(val) => {
              // console.log("value input = ", val)
              handleChange("Stock", val)
            }}
            helperText="Price cannot be empty"
            // helperComponent={}
            value={formData?.Stock}
            // disabled={
            //   tmpResolve?.sub_kategori_resolve === 2
            //     ? false
            //     : isPopupEdit || informasiFurther
            // }
            customValidation={!formData?.Stock}
          /> */}

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProductModal
