"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PersonelForm from "../Forms/PersonelForm";
import FirmaForm from "../Forms/FirmaForm";

const CreateFirmButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Firma Kartı Oluştur</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Firma Ekle</DialogTitle>
        </DialogHeader>
        <FirmaForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateFirmButton;
