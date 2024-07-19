"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import PersonelForm from "../Forms/PersonelForm";
import { Row } from "@tanstack/react-table";
import ProjectRelationCard from "./ProjectRelationCard";

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

        <ProjectRelationCard personelId={row.original.id} />
      </div>
    </DialogContent>
  );
};

export default EditPersonelDialog;
