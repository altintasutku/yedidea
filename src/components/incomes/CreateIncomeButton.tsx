"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DebtForm from "../dashboard/Forms/DebtForm";
import IncomeForm from "../dashboard/Forms/IncomeForm";

const CreateIncomeButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Gelir Ekle</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gelir Ekle</DialogTitle>
        </DialogHeader>
        <IncomeForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateIncomeButton;
