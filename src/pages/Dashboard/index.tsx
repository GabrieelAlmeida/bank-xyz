import { useCookies } from "react-cookie";
import { ChartNoAxesColumn, DollarSign, MoveUpRight } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  formatCurrency,
  formatTransfersToGraphList,
  getAverageTransfers,
  getHighestTransfer,
  getTotalTransfers,
} from "../../utils/account.util";
import useFetchBalance from "../../hooks/useFetchBalance";
import useFetchTransferList from "../../hooks/useFetchTransferList";

export default function Dashboard() {
  const [cookies] = useCookies(["user"]);
  const { balance } = useFetchBalance();
  const { data } = useFetchTransferList();

  return (
    <div className="flex flex-col gap-8 p-8">
      <h2 className="text-xl font-bold">Hi, {cookies?.user?.user?.name}</h2>

      <div className="flex gap-6">
        <article className="bg-brand-dark-background-500 flex h-28 w-full justify-between rounded-md p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Balance</h3>
            {formatCurrency(balance?.accountBalance, balance?.currency)}
          </div>
          <DollarSign className="text-brand-green" />
        </article>

        <article className="bg-brand-dark-background-500 flex h-28 w-full justify-between rounded-md p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Total Transfers</h3>
            {getTotalTransfers(data?.transfers!)}
          </div>
          <MoveUpRight />
        </article>

        <article className="bg-brand-dark-background-500 flex h-28 w-full justify-between rounded-md p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Avg. Transfers</h3>
            {formatCurrency(
              getAverageTransfers(data?.transfers!),
              balance?.currency,
            )}
          </div>
          <ChartNoAxesColumn className="text-brand-yellow" />
        </article>

        <article className="bg-brand-dark-background-500 flex h-28 w-full justify-between rounded-md p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Highest Transfer Amount</h3>
            {formatCurrency(
              getHighestTransfer(data?.transfers!),
              balance?.currency,
            )}
          </div>
          <DollarSign className="text-brand-red" />
        </article>
      </div>

      <div className="bg-brand-dark-background-500 flex flex-col gap-6 rounded-md px-4 py-8">
        <h3 className="font-bold">Transfers by Date</h3>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart
            data={formatTransfersToGraphList(data!)}
            style={{ fontSize: 12 }}
          >
            <XAxis
              stroke="#deded6"
              dataKey="date"
              axisLine={false}
              tickLine={false}
              dy={16}
            />
            <YAxis
              stroke="#deded6"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value) => formatCurrency(value, "USD")}
            />
            <CartesianGrid
              vertical={false}
              stroke="#232327"
              className="stroke-muted"
            />
            <Tooltip
              contentStyle={{ background: "#232327", fontWeight: "bold" }}
              formatter={(value) => formatCurrency(value, "USD")}
            />
            <Line
              stroke="#a8b1ff"
              type="linear"
              strokeWidth={2}
              dataKey="value"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
