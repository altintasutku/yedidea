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

const CreatePersonelButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Personel Kartı Oluştur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Personel Ekle</DialogTitle>
        </DialogHeader>
        <PersonelForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePersonelButton;
