"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

import { Row } from "@tanstack/react-table";
import DebtForm from "../dashboard/Forms/DebtForm";

const EditExpensesDialog = ({ row }: { row: Row<any> }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Firma Kartı</DialogTitle>
      </DialogHeader>
      <DebtForm action="update" defaultValues={row.original} />
    </DialogContent>
  );
};

export default EditExpensesDialog;
