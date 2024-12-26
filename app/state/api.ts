import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Product {
  Data: {
    Id: string
    Code: string
    Image: string
    Name: string
    Price: number
  }[]
  // productId: string
  // name: string
  // price: number
  // rating?: number
  // stockQuantity: number
}

export interface Inventory {
  Data: {
    ProductId: string
    ProductName: string
    Stock: number
  }[]
}

export interface Purchase {
  Data: {
    Id: string
    Code: string
    Items?: PurchaseList[]
    Total: number
  }[]
}

export interface PurchaseList {
  Data: {
    Id: string
    Code: string
    Items?: {
      Id: string
      Product: {
        Id: string
        Code: string
        Image: string
        Name: string
        Price: number
      }
      Quantity: number
      Discount: number
      Subtotal: number
    }[]
    Total: number
  }
}

export interface NewProduct {
  Code: string
  Image: string
  Name: string
  Price: number
}

export interface NewStock {
  ProductId: string
  AddStock: number
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Products", "Inventory", "Purchase"],
  endpoints: (build) => ({
    getProducts: build.query<Product, string | void>({
      query: (search) => ({
        url: "/product",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getInventory: build.query<Inventory, string | void>({
      query: (search) => ({
        url: "/inventory",
      }),
      providesTags: ["Inventory"],
    }),
    addStock: build.mutation<Inventory, NewStock>({
      query: (addNewStock) => ({
        url: "/inventory",
        method: "POST",
        body: addNewStock,
      }),
      invalidatesTags: ["Inventory"],
    }),
    getPurchase: build.query<Purchase, string | void>({
      query: (search) => ({
        url: "/purchase",
      }),
      providesTags: ["Purchase"],
    }),
    getPurchaseDetail: build.query<PurchaseList, string | void>({
      query: (search) => ({
        url: `/purchase/${search}`,
      }),
      providesTags: ["Purchase"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetInventoryQuery,
  useAddStockMutation,
  useGetPurchaseQuery,
  useGetPurchaseDetailQuery,
  useCreateProductMutation,
} = api
