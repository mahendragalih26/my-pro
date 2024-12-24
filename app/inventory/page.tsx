"use client"

import { useGetInventoryQuery } from "@/app/state/api"
import Header from "@/app/(components)/Header"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Save } from "lucide-react"

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
    editable: true,
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
      <div className="flex justify-between items-center mb-5">
        <div></div>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => {}}
        >
          <Save className="w-5 h-5 mr-2 !text-gray-200" /> Save Changes
        </button>
      </div>
    </div>
  )
}

export default Inventory
