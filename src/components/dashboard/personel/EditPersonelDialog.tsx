"use client";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import PersonelForm from "../Forms/PersonelForm";
import { Row } from "@tanstack/react-table";

const EditPersonelDialog = ({row}:{row: Row<any>}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Personel Kartı</DialogTitle>
      </DialogHeader>
      <PersonelForm action="update" defaultValues={row.original} />
    </DialogContent>
  );
};

export default EditPersonelDialog;
