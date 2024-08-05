"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DebtSelect } from "@/lib/schema/debt";
import { IncomeSelect } from "@/lib/schema/income";

const chartConfig = {
  kazanc: {
    label: "kazanc",
  },
  gelir: {
    label: "gelir",
    color: "hsl(var(--chart-1))",
  },
  gider: {
    label: "gider",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Props = Readonly<{
  debts: DebtSelect[];
  incomes: IncomeSelect[];
  className?: string;
}>;

export default function Kazanc({ className, debts, incomes }: Props) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const chartData = React.useMemo(() => {
    const data: {
      [k: string]: { debt: number; income: number };
    } = {};

    for (const debt of debts) {
      const date = debt.createdAt!.toISOString().split("T")[0];
      if (data[date]) {
        data[date].debt += Number(debt.amount);
      } else {
        data[date] = { debt: Number(debt.amount), income: 0 };
      }
    }

    for (const income of incomes) {
      const date = income.createdAt!.toISOString().split("T")[0];
      if (data[date]) {
        data[date].income += Number(income.amount);
      } else {
        data[date] = { debt: 0, income: Number(income.amount) };
      }
    }

    return Object.keys(data).map((date) => ({
      date,
      gelir: data[date].income,
      gider: data[date].debt,
    }));
  }, [debts,incomes]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Gün karşılaştırması</CardTitle>
          <CardDescription>Seçilen zaman için gün bazlı sonuç verir</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Son 3 ay
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Son 30 gün
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Son 7 gün
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillgelir" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gelir)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gelir)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillgider" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gider)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gider)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="gider"
              type="natural"
              fill="url(#fillgider)"
              stroke="var(--color-gider)"
              stackId="a"
            />
            <Area
              dataKey="gelir"
              type="natural"
              fill="url(#fillgelir)"
              stroke="var(--color-gelir)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
