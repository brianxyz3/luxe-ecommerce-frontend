import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/authContext/index.tsx'
import ThemeProvider from './context/themeContext/index.tsx'
import CartProvider from './context/CartContext.tsx'
import AdminDashboardProvider from './context/adminDashboardContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AdminDashboardProvider>
        <CartProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CartProvider>
      </AdminDashboardProvider>
    </AuthProvider>
  </StrictMode>,
)
