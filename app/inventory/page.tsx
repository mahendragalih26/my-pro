"use client"

import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useAddStockMutation, useGetInventoryQuery } from "@/app/state/api"
import Header from "@/app/(components)/Header"
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlotProps,
  GridToolbarContainer,
} from "@mui/x-data-grid"
import { Pencil, Save, Trash2, X, Plus } from "lucide-react"
import {
  initInventory,
  Inventory as InventoryState,
} from "@/app/helper/initState/products"
import { SnackbarProps } from "../helper/initState/snackbar"
import { snackbarConfig } from "../redux/snackbar/snackbarActions"
import { Button } from "@mui/material"
import { v4 } from "uuid"

interface Props {
  snackbarConfig: (data: SnackbarProps) => void
}

interface NewStock {
  ProductId: string
  AddStock: number
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

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void
  }
}

const Inventory: React.FC<Props> = ({ snackbarConfig }) => {
  const [tmpInventory, settmpInventory] =
    useState<InventoryState[]>(initInventory)
  // const [rows, setRows] = useState({})
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const { data: inventory, isError, isLoading } = useGetInventoryQuery()

  const [addStock] = useAddStockMutation()
  const handleCreateProduct = async (addNewStock: NewStock) => {
    await addStock(addNewStock).then((res: any) => {
      settmpInventory((prev: any) => {
        return [...prev, addNewStock]
      })
      snackbarConfig({
        isSnackbarShown: true,
        title: "message",
        description: `${res?.data?.Message}`,
        severity: "success",
      })
    })
  }

  useEffect(() => {
    if (inventory?.Data) {
      settmpInventory(inventory?.Data) // Store products in state
    }
  }, [inventory])

  // row Handler
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    settmpInventory(tmpInventory?.filter((row) => row.ProductId !== id))
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = tmpInventory?.find((row) => row.ProductId === id)
    if (editedRow!.isNew) {
      settmpInventory(tmpInventory?.filter((row) => row.ProductId !== id))
    }
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const updateById = (array: any[], id: string, updatedFields: any) => {
    return array.map((item) => {
      if (item.Id === id) {
        return { ...item, ...updatedFields } // Merge existing object with updated fields
      }
      return item // Return unchanged item if no match
    })
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    if (newRow?.Stock < 0) {
      snackbarConfig({
        isSnackbarShown: true,
        title: "message",
        description: `Stock must 0 or more `,
        severity: "error",
      })
      return { ...updatedRow, Stock: 0 }
    } else {
      settmpInventory((prev: any) => {
        let arr = [...prev]
        const updatedArray = updateById(arr, newRow.ProductId, updatedRow)
        return [...updatedArray]
      })
      return updatedRow
    }
  }

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

  const columns: GridColDef[] = [
    { field: "ProductId", headerName: "ID", width: 90 },
    { field: "ProductName", headerName: "Product Name", width: 200 },
    {
      field: "Stock",
      headerName: "Stock Quantity",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<X />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<Pencil />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Trash2 />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={tmpInventory}
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
        // checkboxSelection

        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{ toolbar: EditToolbar }}
        // slotProps={{
        //   toolbar: { settmpInventory, setRowModesModel },
        // }}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
      <div className="flex justify-between items-center my-5">
        <div></div>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => {
            // handleCreateProduct({})
          }}
        >
          <Save className="w-5 h-5 mr-2 !text-gray-200" /> Save Changes
        </button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
