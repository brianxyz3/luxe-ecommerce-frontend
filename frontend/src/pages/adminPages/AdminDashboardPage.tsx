import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardChart from "@/components/DashboardChart";
import { useAdminDashboard } from "@/context/adminDashboardContext";
import { LogOutIcon } from "lucide-react";
import { toast } from "react-toastify";
import { signOut } from "@/controller/auth";
import { useAuth } from "@/context/authContext";
import { Link, useNavigate } from "react-router";


// const recentOrders = [
//   { id: "ORD001", customer: "Chika Obi", amount: "₦14,500", status: "Shipped" },
//   { id: "ORD002", customer: "Alex Bello", amount: "₦7,200", status: "Processing" },
//   { id: "ORD003", customer: "Maryyyyyyyyyyyyyyyy John", amount: "₦21,000", status: "Delivered" },
// ];

const AdminDashboardPage = () => {
  const { inventory, orders, users } = useAdminDashboard();
  const {handleLogInState} = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Total Users", value: users.length + 346, link: "/admin/users"},
    { label: "Total Products", value: inventory.totalStock, link: "/admin/inventory"},
    { label: "Total Orders", value: orders.length +1814, link: "/admin/orders"},
    { label: "Revenue", value: `₦ ${inventory.totalSale}`, link: "/admin/dashboard"},
  ];

  const recentOrders = orders.reverse().slice(0, 3)

  return (
    <>
      {/* Main content */}
      <main className="flex-1 bg-cream-light dark:bg-stone-700 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <Button
            onClick={async () => {
              const {message, status} = await signOut();
              if(status == 200) {
                handleLogInState(false);
                toast.success(message);
              }
              if(status != 200) toast.error(message);
            }}
            className="bg-amber-600 text-white px-4 py-2 rounded-full"><p className="hidden md:flex">Logout</p><LogOutIcon/></Button>
        </header>

        {/* Stats */}
        <section className="grid md:grid-rows-2 items-center gap-8 mb-10">
          <div className="h-fit grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Link to={stat.link} key={index} className="h-fit">
                <Card className={`${index == 0 && "bg-gradient-to-tr from-amber-200 via-amber-600 to-black dark:from-black dark:via-stone-900 dark:to-amber-600"} dark:bg-black shadow rounded-xl`}>
                  <CardContent className="p-4">
                    <h5 className="text- dark:text-gray-400  text-gray-600">{stat.label}</h5>
                    <h3 className="text-xl font-bold">{stat.value}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <DashboardChart/>
        </section>

        {/* Recent Orders */}
        <section className="bg-cream-lighter grid grid-cols-1 overflow-auto dark:bg-black shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Recent Orders</h2>
          <table className="min-w-[350px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100"
                onClick={() => navigate(`/order/admin/${order._id}`)}>
                  <td className="py-2 truncate max-w-5">{order._id}</td>
                  <td className="max-w-24 sm:max-w-fit truncate">{order.orderBy.firstName + " " + order.orderBy.lastName}</td>
                  <td>₦ {order.totalAmount}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Delivered" ? "bg-green-200 text-green-800" :
                      order.status === "Shipped" ? "bg-blue-200 text-blue-800" :
                      order.status === "Cancelled" ? "bg-red-200 text-red-800" :
                      "bg-yellow-200 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default AdminDashboardPage;