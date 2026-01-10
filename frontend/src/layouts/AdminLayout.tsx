import { NavLink, Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap min-h-screen">
      {/* Sidebar */}
      <aside className="w-full bg-cream-lighter dark:bg-stone-700 z-10 sticky top-0 h-fit md:h-dvh md:w-64 border-r shadow-sm p-3 md:p-6 md:block">
        <h2 className="text-2xl font-bold mb-8">Luxe Admin</h2>
        <nav className="flex justify-evenly md:justify-start md:flex-col gap-x-2 gap-y-4 text-sm font-medium">
          <NavLink to="/admin/dashboard" className="hover:text-amber-600">Dashboard</NavLink>
          <NavLink to="/admin/inventory" className="hover:text-amber-600">Inventory</NavLink>
          <NavLink to="/admin/orders" className="hover:text-amber-600">Orders</NavLink>
          <NavLink to="/admin/users" className="hover:text-amber-600">Users</NavLink>
          {/* <NavLink to="#" className="hover:text-amber-600">Settings</NavLink> */}
        </nav>
      </aside>

      <Outlet/>
      </div>
  )
}

export default AdminLayout