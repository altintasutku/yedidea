"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { IncomeSelect } from "@/lib/schema/income";

const chartConfig = {
  income: {
    label: "Gelirler",
  },
  personel: {
    label: "Personel",
    color: "hsl(var(--chart-1))",
  },
  project: {
    label: "Project",
    color: "hsl(var(--chart-2))",
  },
  private: {
    label: "Özel",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type Props = Readonly<{
  data: IncomeSelect[];
}>;

function GelirDagilimi({ data }: Props) {
  const totalAmount = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [data]);

  const categoriedData = React.useMemo(() => {
    const obj: {
      [key: string]: number;
    } = {};

    const categoriedData = data.reduce((acc, curr) => {
      if (curr.category in acc) {
        acc[curr.category] += Number(curr.amount);
      } else {
        acc[curr.category] = Number(curr.amount);
      }
      return acc;
    }, obj);

    return Object.entries(categoriedData).map(([category, amount]) => ({
      category,
      amount,
      fill:
        category === "Personel"
          ? chartConfig.personel.color
          : category === "Proje"
            ? chartConfig.project.color
            : chartConfig.private.color,
    }));
  }, [data]);
 
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gelir dağılımı</CardTitle>
        <CardDescription>Son ayın gelir dağılımı</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categoriedData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()} ₺
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Gelirler
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export default GelirDagilimi;
