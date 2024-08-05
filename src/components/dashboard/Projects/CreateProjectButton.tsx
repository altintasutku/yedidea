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
import { InferSelectModel } from "drizzle-orm";
import { projectTable } from "@/lib/schema/project";
import { firmTable } from "@/lib/schema/firm";

const CreateProjectButton = ({
  data,
}: {
  data: InferSelectModel<typeof firmTable>[];
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Proje Ekle</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Proje Ekle</DialogTitle>
        </DialogHeader>
        <ProjectForm setOpen={setOpen} data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectButton;
