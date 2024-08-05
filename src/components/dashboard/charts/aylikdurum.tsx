"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DebtSelect } from "@/lib/schema/debt";
import { IncomeSelect } from "@/lib/schema/income";
import { useMemo } from "react";

// const chartData = [
//   { month: "Ocak", gelir: 186, gider: 80 },
//   { month: "Şubat", gelir: 305, gider: 200 },
//   { month: "Mart", gelir: 237, gider: 120 },
//   { month: "Nisan", gelir: 73, gider: 190 },
//   { month: "Mayıs", gelir: 209, gider: 130 },
//   { month: "Haziran", gelir: 214, gider: 140 },
// ];

const chartConfig = {
  gelir: {
    label: "Gelir",
    color: "hsl(var(--chart-1))",
  },
  gider: {
    label: "Gider",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Props = Readonly<{
  debts: DebtSelect[];
  incomes: IncomeSelect[];
}>;

export default function AylikDurum({ debts, incomes }: Props) {
  const chartData = useMemo(() => {
    const data: {
      month: string;
      gelir: number;
      gider: number;
    }[] = [];

    for (const debt of debts) {
      const month = debt.createdAt!.toLocaleString("default", {
        month: "long",
      });
      const existing = data.find((d) => d.month === month);

      if (existing) {
        existing.gider += Number(debt.amount);
      } else {
        data.push({ month, gelir: 0, gider: Number(debt.amount) });
      }
    }

    for (const income of incomes) {
      const month = income.createdAt!.toLocaleString("default", {
        month: "long",
      });
      const existing = data.find((d) => d.month === month);

      if (existing) {
        existing.gelir += Number(income.amount);
      } else {
        data.push({ month, gelir: Number(income.amount), gider: 0 });
      }
    }

    return data;
  }, [debts, incomes]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aylık durum</CardTitle>
        <CardDescription>Her ayın karşılaştırması verir</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="gelir" fill="var(--color-gelir)" radius={4} />
            <Bar dataKey="gider" fill="var(--color-gider)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
