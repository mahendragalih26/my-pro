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

export interface NewProduct {
  // name: string
  // price: number
  // rating?: number
  // stockQuantity: number
  Code: string
  Image: string
  Name: string
  Price: number
}

export interface SalesSummary {
  salesSummaryId: string
  totalValue: number
  changePercentage?: number
  date: string
}

export interface PurchaseSummary {
  purchaseSummaryId: string
  totalPurchased: number
  changePercentage?: number
  date: string
}

export interface ExpenseSummary {
  expenseSummarId: string
  totalExpenses: number
  date: string
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string
  category: string
  amount: string
  date: string
}

export interface User {
  userId: string
  name: string
  email: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Products", "Inventory", "Users", "Expenses"],
  endpoints: (build) => ({
    getProducts: build.query<Product, string | void>({
      query: (search) => ({
        url: "/product",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    getInventory: build.query<Inventory, string | void>({
      query: (search) => ({
        url: "/inventory",
      }),
      providesTags: ["Inventory"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetInventoryQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api
