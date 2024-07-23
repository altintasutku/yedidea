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
const chartData = [
  { date: "2024-04-01", gelir: 222, gider: 150 },
  { date: "2024-04-02", gelir: 97, gider: 180 },
  { date: "2024-04-03", gelir: 167, gider: 120 },
  { date: "2024-04-04", gelir: 242, gider: 260 },
  { date: "2024-04-05", gelir: 373, gider: 290 },
  { date: "2024-04-06", gelir: 301, gider: 340 },
  { date: "2024-04-07", gelir: 245, gider: 180 },
  { date: "2024-04-08", gelir: 409, gider: 320 },
  { date: "2024-04-09", gelir: 59, gider: 110 },
  { date: "2024-04-10", gelir: 261, gider: 190 },
  { date: "2024-04-11", gelir: 327, gider: 350 },
  { date: "2024-04-12", gelir: 292, gider: 210 },
  { date: "2024-04-13", gelir: 342, gider: 380 },
  { date: "2024-04-14", gelir: 137, gider: 220 },
  { date: "2024-04-15", gelir: 120, gider: 170 },
  { date: "2024-04-16", gelir: 138, gider: 190 },
  { date: "2024-04-17", gelir: 446, gider: 360 },
  { date: "2024-04-18", gelir: 364, gider: 410 },
  { date: "2024-04-19", gelir: 243, gider: 180 },
  { date: "2024-04-20", gelir: 89, gider: 150 },
  { date: "2024-04-21", gelir: 137, gider: 200 },
  { date: "2024-04-22", gelir: 224, gider: 170 },
  { date: "2024-04-23", gelir: 138, gider: 230 },
  { date: "2024-04-24", gelir: 387, gider: 290 },
  { date: "2024-04-25", gelir: 215, gider: 250 },
  { date: "2024-04-26", gelir: 75, gider: 130 },
  { date: "2024-04-27", gelir: 383, gider: 420 },
  { date: "2024-04-28", gelir: 122, gider: 180 },
  { date: "2024-04-29", gelir: 315, gider: 240 },
  { date: "2024-04-30", gelir: 454, gider: 380 },
  { date: "2024-05-01", gelir: 165, gider: 220 },
  { date: "2024-05-02", gelir: 293, gider: 310 },
  { date: "2024-05-03", gelir: 247, gider: 190 },
  { date: "2024-05-04", gelir: 385, gider: 420 },
  { date: "2024-05-05", gelir: 481, gider: 390 },
  { date: "2024-05-06", gelir: 498, gider: 520 },
  { date: "2024-05-07", gelir: 388, gider: 300 },
  { date: "2024-05-08", gelir: 149, gider: 210 },
  { date: "2024-05-09", gelir: 227, gider: 180 },
  { date: "2024-05-10", gelir: 293, gider: 330 },
  { date: "2024-05-11", gelir: 335, gider: 270 },
  { date: "2024-05-12", gelir: 197, gider: 240 },
  { date: "2024-05-13", gelir: 197, gider: 160 },
  { date: "2024-05-14", gelir: 448, gider: 490 },
  { date: "2024-05-15", gelir: 473, gider: 380 },
  { date: "2024-05-16", gelir: 338, gider: 400 },
  { date: "2024-05-17", gelir: 499, gider: 420 },
  { date: "2024-05-18", gelir: 315, gider: 350 },
  { date: "2024-05-19", gelir: 235, gider: 180 },
  { date: "2024-05-20", gelir: 177, gider: 230 },
  { date: "2024-05-21", gelir: 82, gider: 140 },
  { date: "2024-05-22", gelir: 81, gider: 120 },
  { date: "2024-05-23", gelir: 252, gider: 290 },
  { date: "2024-05-24", gelir: 294, gider: 220 },
  { date: "2024-05-25", gelir: 201, gider: 250 },
  { date: "2024-05-26", gelir: 213, gider: 170 },
  { date: "2024-05-27", gelir: 420, gider: 460 },
  { date: "2024-05-28", gelir: 233, gider: 190 },
  { date: "2024-05-29", gelir: 78, gider: 130 },
  { date: "2024-05-30", gelir: 340, gider: 280 },
  { date: "2024-05-31", gelir: 178, gider: 230 },
  { date: "2024-06-01", gelir: 178, gider: 200 },
  { date: "2024-06-02", gelir: 470, gider: 410 },
  { date: "2024-06-03", gelir: 103, gider: 160 },
  { date: "2024-06-04", gelir: 439, gider: 380 },
  { date: "2024-06-05", gelir: 88, gider: 140 },
  { date: "2024-06-06", gelir: 294, gider: 250 },
  { date: "2024-06-07", gelir: 323, gider: 370 },
  { date: "2024-06-08", gelir: 385, gider: 320 },
  { date: "2024-06-09", gelir: 438, gider: 480 },
  { date: "2024-06-10", gelir: 155, gider: 200 },
  { date: "2024-06-11", gelir: 92, gider: 150 },
  { date: "2024-06-12", gelir: 492, gider: 420 },
  { date: "2024-06-13", gelir: 81, gider: 130 },
  { date: "2024-06-14", gelir: 426, gider: 380 },
  { date: "2024-06-15", gelir: 307, gider: 350 },
  { date: "2024-06-16", gelir: 371, gider: 310 },
  { date: "2024-06-17", gelir: 475, gider: 520 },
  { date: "2024-06-18", gelir: 107, gider: 170 },
  { date: "2024-06-19", gelir: 341, gider: 290 },
  { date: "2024-06-20", gelir: 408, gider: 450 },
  { date: "2024-06-21", gelir: 169, gider: 210 },
  { date: "2024-06-22", gelir: 317, gider: 270 },
  { date: "2024-06-23", gelir: 480, gider: 530 },
  { date: "2024-06-24", gelir: 132, gider: 180 },
  { date: "2024-06-25", gelir: 141, gider: 190 },
  { date: "2024-06-26", gelir: 434, gider: 380 },
  { date: "2024-06-27", gelir: 448, gider: 490 },
  { date: "2024-06-28", gelir: 149, gider: 200 },
  { date: "2024-06-29", gelir: 103, gider: 160 },
  { date: "2024-06-30", gelir: 446, gider: 400 },
];

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

export default function Kazanc({ className }: { className?: string }) {
  const [timeRange, setTimeRange] = React.useState("90d");

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
          <CardTitle>Aylık Kazanç</CardTitle>
          <CardDescription>
            Tüm ayın kazançlarını gösterir
          </CardDescription>
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
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
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
