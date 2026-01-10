import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#bb4d44",
  },
  users: {
    label: "Users",
    color: "#ffb900",
  },
} satisfies ChartConfig

const DashboardChart = () => {

    const chartData = [
        { month: "January", sales: 186, users: 80 },
        { month: "February", sales: 305, users: 200 },
        { month: "March", sales: 237, users: 120 },
        { month: "April", sales: 73, users: 190 },
        { month: "May", sales: 209, users: 130 },
        { month: "June", sales: 214, users: 140 },
        { month: "July", sales: 200, users: 70 },
        { month: "August", sales: 214, users: 160 },
        { month: "September", sales: 204, users: 200 },
        { month: "October", sales: 210, users: 90 },
        { month: "November", sales: 74, users: 100 },
        { month: "December", sales: 90, users: 110 },
      ]

  return (
    <div className="h-fit dark:bg-stone-600/80 overflow-auto">
        <ChartContainer config={chartConfig} className="h-[200px] min-w-[700px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="sales" fill="var(--color-sales)" radius={2} />
              <Bar dataKey="users" fill="var(--color-users)" radius={2} />
            </BarChart>
        </ChartContainer>
    </div>
  )
}

export default DashboardChart;