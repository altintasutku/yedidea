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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Firma Kartı</DialogTitle>
      </DialogHeader>
      <FirmaForm action="update" defaultValues={row.original} />
    </DialogContent>
  );
};

export default EditFirmDialog;
