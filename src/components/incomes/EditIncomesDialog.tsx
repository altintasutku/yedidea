"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

import { Row } from "@tanstack/react-table";
import IncomeForm from "../dashboard/Forms/IncomeForm";

const EditIncomesDialog = ({ row }: { row: Row<any> }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Gelir Kartı</DialogTitle>
      </DialogHeader>
      <IncomeForm action="update" defaultValues={row.original} />
    </DialogContent>
  );
};

export default EditIncomesDialog;
