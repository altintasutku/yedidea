"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
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
import PayToPersonel from "./PayToPersonel";

type Props = Readonly<{
  row: Row<any>;
}>;

const EditPersonelDialog = ({ row }: Props) => {
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
                <PayToPersonel row={row} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </div>
    </DialogContent>
  );
};

export default EditPersonelDialog;
