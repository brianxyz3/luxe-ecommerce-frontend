import Footer from "@/components/Footer";
import HeaderNav from "@/components/HeaderNav"
import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MainLayout = () => {
  return (
    <>
      <HeaderNav/>
      <div className="mt-16 md:mt-0">
        <Outlet/>
      </div>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default MainLayout;