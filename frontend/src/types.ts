export interface UserObj {
  token: string;
}

export interface RegisterDataObj {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface loginDataObj {
  email: string;
  password: string;
}

export interface InventoryDataType {
  _id: string;
  product: ProductType;
  unitsSold: number;
}

export interface ProductType {
  _id: string;
  name: string;
  category: string[];
  brandName: string;
  description: string;
  type: string[];
  price: number;
  units: number;
}


export interface CartType {
  productId: string;
  productName: string;
  productBrandName: string;
  price: number;
  units: number;
}

interface InventoryType {
  inventoryList: InventoryDataType[];
  totalStock: number;
  totalSale: number;
}


interface OrderDataType {
  _id: string;
  createdAt: string;
  cart: CartType[];
  orderBy: {
    email: string;
    firstName: string;
    lastName: string;
  };
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  paymentOption: string;
}

interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  deliveryAddress: string;
  userRole: string;
}

export interface CurrentUser {
  email: string;
  id: string;
  userRole: string;
  token: string;
};

export interface DashboardContextType {
  inventory: InventoryType;
  orders: OrderDataType[];
  users : UserType[];
}
