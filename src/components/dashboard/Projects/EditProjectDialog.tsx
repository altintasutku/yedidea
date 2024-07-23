"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import PersonelForm from "../Forms/PersonelForm";
import { Row } from "@tanstack/react-table";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectForm from "../Forms/ProjelerForm";

type Props = Readonly<{
  row: Row<any>;
}>;

const EditProjectDialog = ({ row }: Props) => {
  return (
    <DialogContent className="max-w-[60dvw]">
      <DialogHeader>
        <DialogTitle>Personel Kartı</DialogTitle>
      </DialogHeader>

      <ScrollArea className="flex h-[70dvh] flex-col p-4">
        <ProjectForm action="update" defaultValues={row.original} />
      </ScrollArea>
    </DialogContent>
  );
};

export default EditProjectDialog;
