"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { createProject } from "@/app/actions/project";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const projectSchema = z.object({
  projectName: z
    .string({
      required_error: "Proje adı zorunludur.",
    })
    .describe("Proje Adı"),
  sector: z
    .string({
      required_error: "Sektör zorunludur.",
    })
    .describe("Sektör"),
  firmName: z
    .string({
      required_error: "Firma adı zorunludur.",
    })
    .describe("Firma Adı"),
  startDate: z.coerce.date().describe("Başlangıç Tarihi"),
  endDate: z.coerce.date().describe("Bitiş Tarihi"),
  amount: z.coerce.number().describe("Fiyat"),
});

const ProjelerForm = () => {
  const [state, formAction] = useFormState(createProject, null);
  const { pending } = useFormStatus();
  return (
    <AutoForm formSchema={projectSchema} onSubmit={formAction}>
      {state === null ? (
        <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
      ) : (
        <Button>Oluşturuldu</Button>
      )}
    </AutoForm>
  );
};

export default ProjelerForm;
