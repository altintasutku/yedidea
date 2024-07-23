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
import ProjectForm from "../Forms/ProjelerForm";

const CreateProjectButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Gider Ekle</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gider Ekle</DialogTitle>
        </DialogHeader>
        <ProjectForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectButton;
