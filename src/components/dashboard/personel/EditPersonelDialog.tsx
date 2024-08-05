"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import PersonelForm from "../Forms/PersonelForm";
import { Row } from "@tanstack/react-table";
import AddProject from "./AddProject";
import PersonelHistory from "./PersonelHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PersonelCalendar from "./PersonelCalendar";
import { DataTable } from "@/components/DataTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PaymentSelect } from "@/lib/schema/payment";
import { paymentColumns } from "../Columns/PaymentColumns";
import { ProjectPersonelSelect } from "@/lib/schema/project";
import AddPayment from "../Forms/AddPayment";

type Props = Readonly<{
  row: Row<any>;
}>;

const EditPersonelDialog = ({ row }: Props) => {
  const [searchValue, setSearchValue] = React.useState("");

  const [totalPaid, setTotalPaid] = React.useState(0);
  const [personelDebt, setPersonelDebt] = React.useState(0);

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const payments = await axios.get("/api/payment");

      return payments.data as PaymentSelect[];
    },
  });

  const { data: projectPersonel, isLoading: personelLoading } = useQuery({
    queryKey: ["projectPersonel"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/project-personel?personelId=${row.original.id}`,
      );

      const filteredData = data.filter(
        (projectPersonel: ProjectPersonelSelect) => {
          return projectPersonel.personelId === row.original.id;
        },
      );

      return filteredData as ProjectPersonelSelect[];
    },
  });

  useEffect(() => {
    if (!projectPersonel || !payments) return;

    projectPersonel.forEach((projectPersonel) => {
      setPersonelDebt((prev) => prev + Number(projectPersonel.personelPrice));
    });

    setTotalPaid(
      payments.reduce((acc, payment) => {
        return acc + Number(payment.paidAmount);
      }, 0),
    );
  }, [projectPersonel, payments]);

  return (
    <DialogContent className="max-w-[80dvw]">
      <DialogHeader>
        <DialogTitle>Personel Kartı</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-x-4 divide-x">
        <PersonelForm action="update" defaultValues={row.original} />
        <ScrollArea className="flex h-[85dvh] flex-col p-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="personelHistory"
          >
            <AccordionItem value="addProject">
              <AccordionTrigger>Proje Ekle</AccordionTrigger>
              <AccordionContent>
                <AddProject row={row} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="personelCalender">
              <AccordionTrigger>Yoklama</AccordionTrigger>
              <AccordionContent>
                <PersonelCalendar row={row} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="personelHistory">
              <AccordionTrigger>Personel Geçmişi</AccordionTrigger>
              <AccordionContent>
                <PersonelHistory row={row} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="paymentHistory">
              <AccordionTrigger>Ödeme Geçmişi</AccordionTrigger>
              <AccordionContent>
                <div className="px-10">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      Kalan Borç: {personelDebt - totalPaid} TL
                    </span>
                    <AddPayment personelId={row.original.id} />
                  </div>
                  <DataTable columns={paymentColumns} data={payments} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </div>
    </DialogContent>
  );
};

export default EditPersonelDialog;
