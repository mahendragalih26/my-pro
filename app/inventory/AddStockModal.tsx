import React, { ChangeEvent, FormEvent, useState } from "react"
import { v4 } from "uuid"
import Header from "@/app/(components)/Header"
import { formatRupiah } from "@/app/helper"
import Input from "../(components)/InputField/Input"
import { Button } from "@mui/material"
import UploadFile from "../(components)/InputField/uploadFile"
import { SnackbarProps } from "../helper/initState/snackbar"

type ProductFormData = {
  ProductId: string
  AddStock: number
}

type CreateProductModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (formData: ProductFormData) => void
  snackbarConfig: (data: SnackbarProps) => void
}

const AddStockModal = ({
  isOpen,
  onClose,
  onCreate,
  snackbarConfig,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    ProductId: "",
    AddStock: 0,
  })

  const [warningFE, setwarningFE] = useState<boolean>(false)

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //     // [name]: name === "Price" ? formatRupiah(value) : value,
  //   })
  // }

  const handleFileChange = (newfile: any) => {
    const files = newfile
    if (files) {
      const fileArray = Array.from(files) // Convert FileList to Array
      const imageUrls: string[] = []

      fileArray.forEach((file: any) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            imageUrls.push(e.target.result.toString())
            // Update state after reading all files
            if (imageUrls.length === fileArray.length) {
              // setImages(imageUrls);
              console.log("imageurl = ", imageUrls)
              setFormData((prev: any) => {
                return { ...prev, Image: imageUrls[0] }
              })
            }
          }
        }
        reader.readAsDataURL(file) // Read the file as a Data URL
      })
    }
  }

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
    validationField(formData)
  }

  const validationField = (formData: ProductFormData) => {
    if (!formData?.ProductId || !formData?.AddStock) {
      setwarningFE(true)
      snackbarConfig({
        isSnackbarShown: true,
        title: "message",
        description: `Field is required`,
        severity: "error",
        // actionYes: () => {
        //   history.push(`/`);
        // },
        // defaultActionNo: true,
      })
    } else {
      onCreate(formData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Update Stock" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT ID */}
          <div className="my-3">
            <Input
              label="Product ID"
              variant="felxibel"
              required={true}
              type="text"
              className="w-full"
              placeholder="Product ID"
              setValue={(val) => {
                // console.log("value input = ", val)
                handleChange("Code", val)
              }}
              helperText="Product ID cannot be empty"
              // helperComponent={}
              value={formData?.ProductId}
              customValidation={warningFE && !formData?.ProductId}
            />
          </div>

          {/* STOCK QUANTITY */}
          <div className="my-3">
            <Input
              label="Stock Quantitiy"
              variant="felxibel"
              required={true}
              type="currency"
              className="w-full"
              placeholder="Stock Quantitiy"
              setValue={(val) => {
                // console.log("value input = ", val)
                handleChange("AddStock", val)
              }}
              helperText="Stock Quantitiy cannot be empty or negative"
              // helperComponent={}
              value={formData?.AddStock}
              // disabled={
              //   tmpResolve?.sub_kategori_resolve === 2
              //     ? false
              //     : isPopupEdit || informasiFurther
              // }
              customValidation={warningFE && Number(formData?.AddStock) < 1}
            />
          </div>

          {/* Update ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Update
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

export default AddStockModal
