"use client"

import { useGetInventoryQuery } from "@/app/state/api"
import Header from "@/app/(components)/Header"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
  { field: "ProductId", headerName: "ID", width: 90 },
  // { field: "Image", headerName: "Product Image", width: 200 },
  { field: "ProductName", headerName: "Product Name", width: 200 },
  // {
  //   field: "price",
  //   headerName: "Price",
  //   width: 110,
  //   type: "number",
  //   valueGetter: (value, row) => `Rp. ${row.price}`,
  // },
  {
    field: "Stock",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
]

const Inventory = () => {
  const { data: inventory, isError, isLoading } = useGetInventoryQuery()

  if (isLoading) {
    return <div className="py-4">Loading...</div>
  }

  if (isError || !inventory?.Data) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch inventory
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={inventory?.Data}
        columns={columns}
        getRowId={(row) => row.ProductId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  )
}

export default Inventory
