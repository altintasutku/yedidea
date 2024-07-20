"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import PersonelForm from "../Forms/PersonelForm";
import { Row } from "@tanstack/react-table";
import FirmaForm from "../Forms/FirmaForm";

const EditFirmDialog = ({ row }: { row: Row<any> }) => {
  return (
    <DialogContent className="max-w-[80dvw]">
      <DialogHeader>
        <DialogTitle>Firma Kartı</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-x-4 divide-x">
        <FirmaForm action="update" defaultValues={row.original} />
      </div>
    </DialogContent>
  );
};

export default EditFirmDialog;
