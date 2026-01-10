import { fetchInventoryList } from "@/controller/inventoryFetch";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../authContext";
import { fetchOrderList } from "@/controller/orderFetch";
import { fetchUserList } from "@/controller/userFetch";
import type { DashboardContextType } from "@/types";

interface AuthProviderType {
  children: ReactNode;
}


const AdmindashboardContext = createContext< DashboardContextType | undefined>(undefined);

export const useAdminDashboard = () => {
  const context = useContext(AdmindashboardContext);
  if (!context) throw new Error ("No AdminDashboard Context found")
  return context;
}

const AdminDashboardProvider: React.FC<AuthProviderType> = ({children}) => {
  const {userLoggedIn, currentUser} = useAuth()
  const [inventory, setInventory] = useState({inventoryList: [], totalStock: 0, totalSale: 0});
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const UpdateData = async () => {
      if (currentUser?.userRole === "admin") {
        try {
          const inventoryData = await fetchInventoryList();
          const ordersData = await fetchOrderList();
          const usersData = await fetchUserList();
          if(inventoryData.status == 500) {
            toast.error(inventoryData.message)
          } else {
            setInventory(inventoryData.data);
          }
          if(ordersData.status == 500) {
            toast.error(ordersData.message)
          } else {
            setOrders(ordersData.data);
          }
          if(usersData.status == 500) {
            toast.error(usersData.message)
          } else {
            setUsers(usersData.data)
          }
        } catch (error) {
          console.log(error)
        }
      }
      
    }
    UpdateData();    
  }, [userLoggedIn])

  const value = {
    inventory,
    orders,
    users,
  }
  return (
    <AdmindashboardContext.Provider value={value}>
      {children}
    </AdmindashboardContext.Provider>
  )
}

export default AdminDashboardProvider;