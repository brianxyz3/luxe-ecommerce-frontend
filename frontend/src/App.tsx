import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/userPages/HomePage"
import ProductsPage from "./pages/userPages/ProductsPage"
import MainLayout from "./layouts/MainLayout"
import ProductDetailsPage from "./pages/userPages/ProductDetailsPage"
import ShoppingCartPage from "./pages/userPages/ShoppingCartPage"
import AuthPage from "./pages/userPages/AuthPage"
import AdminDashboardPage from "./pages/adminPages/AdminDashboardPage"
import AdminLayout from "./layouts/AdminLayout"
import AdminInventoryPage from "./pages/adminPages/AdminInventoryPage"
import AdminInventoryDetailsPage from "./pages/adminPages/AdminInventoryDetailsPage"
import AdminEditInventoryPage from "./pages/adminPages/AdminEditInventoryPage"
import AdminOrderHistoryPage from "./pages/adminPages/AdminOrderHistoryPage"
import AdminAddInventoryPage from "./pages/adminPages/AdminAddInventoryPage"
import AdminAddOrderPage from "./pages/adminPages/AdminAddOrderPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>

          <Route element={<MainLayout/>}>
            <Route path="/products?" element={<ProductsPage/>}/>
            <Route path="/products/:productId" element={<ProductDetailsPage/>}/>
            <Route path="/shoppingCart" element={<ShoppingCartPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route element={<AdminLayout/>}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage/>}/>
              <Route path="/admin/inventory" element={<AdminInventoryPage/>}/>
              <Route path="/admin/inventory/add" element={<AdminAddInventoryPage/>}/>
              <Route path="/admin/inventory/:inventoryId" element={<AdminInventoryDetailsPage/>}/>
              <Route path="/admin/inventory/:inventoryId/edit" element={<AdminEditInventoryPage/>}/>
              <Route path="/admin/orders" element={<AdminOrderHistoryPage/>}/>
              <Route path="/admin/orders/add" element={<AdminAddOrderPage/>}/>
              <Route path="/admin/users" element={<AdminDashboardPage/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
