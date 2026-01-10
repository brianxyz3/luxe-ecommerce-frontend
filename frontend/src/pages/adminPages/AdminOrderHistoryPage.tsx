import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminDashboard } from '@/context/adminDashboardContext';
// import React from "react"
import { Link, useNavigate } from 'react-router';


const AdminOrderHistoryPage = () => {
  const navigate = useNavigate();
  const { orders, inventory } = useAdminDashboard();
  const completedOrder = orders.filter(order => (order.status.toLowerCase() == "completed"))

  const stats = [
    { label: "Total Orders", value: orders.length +1814, link: "/admin/orders"},
    { label: "Completed Orders", value: completedOrder.length +1814, link: "/admin/orders"},
    { label: "Revenue", value: `₦ ${inventory.totalSale}`, link: "/admin/dashboard"},
  ];

  return (
    <div className="max-w-4xl h-[calc(100dvh-108px)] w-full mx-2 md:mx-auto md:my-6 overflow-auto">
      <div className="h-fit mt-8 md:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="h-fit">
            <Card className={`${index == 0 && "bg-gradient-to-tr from-amber-200 via-amber-600 to-black dark:from-black dark:via-stone-900 dark:to-amber-600"} dark:bg-stone-700 shadow rounded-xl`}>
              <CardContent className="p-4">
                <h5 className="text- dark:text-gray-400  text-gray-600">{stat.label}</h5>
                <h3 className="text-xl font-bold">{stat.value}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
        <section className="bg-cream-lighter mt-5 grid grid-cols-1 overflow-auto dark:bg-black shadow rounded-xl p-6">
          <div className="flex justify-between items-baseline">
            <h2 className="text-xl font-bold mb-2">All Orders</h2>
            <Link to="/admin/orders/add"><Button>Add Order</Button></Link>
          </div>
          <table className="min-w-[750px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Delivery Address</th>
                <th>Payment Option</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100"
                onClick={() => navigate(`/order/admin/${order._id}`)}>
                  <td>{order.createdAt.split("T")[0]}</td>
                  <td className="py-3">{order._id}</td>
                  <td className="max-w-24 sm:max-w-fit truncate">{order.orderBy.firstName + " " + order.orderBy.lastName}</td>
                  <td className="max-w-24 sm:max-w-fit truncate">{order.deliveryAddress}</td>
                  <td className="max-w-20 sm:max-w-fit truncate">{order.paymentOption}</td>
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
    </div>
  )
}

export default AdminOrderHistoryPage