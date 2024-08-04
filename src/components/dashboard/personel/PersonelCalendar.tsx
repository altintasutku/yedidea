"use client";

import { CalendarHeatmap } from "@/components/ui/calendar-heatmap";
import { Row } from "@tanstack/react-table";
import React from "react";

type Props = Readonly<{
  row: Row<any>;
}>;

const PersonelCalendar = ({ row }: Props) => {
  const [dates, setDates] = React.useState<Date[]>([
    new Date("Aug 1, 2024"),
    new Date("Aug 15, 2024"),
    new Date("Aug 18, 2024"),
  ]);

  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold">
        Ayda gidilen gün sayısı:{" "}
        {
          dates.filter((date) => date.getMonth() === currentMonth.getMonth())
            .length
        }
      </div>
      <CalendarHeatmap
        variantClassnames={[
          "text-white hover:text-white bg-primary/60 hover:bg-primary",
        ]}
        onMonthChange={(month) => setCurrentMonth(month)}
        datesPerVariant={[dates]}
        onDayClick={(date) =>
          setDates((prev) => {
            if (prev.includes(date)) {
              return prev.filter((d) => d !== date);
            }
            return [...prev, date];
          })
        }
      />
    </div>
  );
};

export default PersonelCalendar;
