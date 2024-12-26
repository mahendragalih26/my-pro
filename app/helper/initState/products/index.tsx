export interface SingleProduct {
  Id: string
  Code: string
  Image: string
  Name: string
  Price: number
}

export interface Product {
  Data: {
    Id: string
    Code: string
    Image: string
    Name: string
    Price: number
    stock?: number
  }[]
}

export const initProduct: Product = {
  Data: [
    {
      Id: "",
      Code: "",
      Image: "",
      Name: "",
      Price: 0,
    },
  ],
}

export interface Inventory {
  isNew?: any
  ProductId: string
  ProductName: string
  Stock: number
}

export const initInventory: Inventory[] = [
  {
    ProductId: "0",
    ProductName: "",
    Stock: 0,
  },
]
