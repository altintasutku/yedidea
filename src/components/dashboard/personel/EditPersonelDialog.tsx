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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = Readonly<{
  row: Row<any>;
}>;

const EditPersonelDialog = ({ row }: Props) => {
  console.log(row)
  return (
    <DialogContent className="max-w-[80dvw]">
      <DialogHeader>
        <DialogTitle>Personel Kartı</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-x-4 divide-x">
        <PersonelForm action="update" defaultValues={row.original} />
        <ScrollArea className="h-[85dvh] p-4 flex flex-col">
          <AddProject row={row} />
          <Separator className="mt-2" />
          <PersonelHistory row={row}/>
        </ScrollArea>
      </div>
    </DialogContent>
  );
};

export default EditPersonelDialog;
