"use client";

import { updateDates } from "@/app/actions/personel";
import { Button } from "@/components/ui/button";
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap";
import { Row } from "@tanstack/react-table";
import React from "react";

type Props = Readonly<{
  row: Row<any>;
}>;

const PersonelCalendar = ({ row }: Props) => {
  const [dates, setDates] = React.useState<Date[]>(row.original.dates);
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
        onDayClick={(date) => {
          setDates((prev) => {
            if (prev.some((i) => i.toDateString() == date.toDateString())) {
              return prev.filter((d) => d.toDateString() !== date.toDateString());
            }
            return [...prev, date];
          });
        }}
      />
      <Button
        onClick={() => {
          updateDates({ dates, personelID: row.original.id });
        }}
        className="mt-4"
      >
        Kaydet
      </Button>
    </div>
  );
};

export default PersonelCalendar;
