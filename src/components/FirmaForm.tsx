"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { useFormState, useFormStatus } from "react-dom";
import { createFirm } from "@/app/actions/firm";
import { Button } from "./ui/button";

export const firmSchema = z.object({
  name: z
    .string({
      required_error: "Proje adı zorunludur.",
    })
    .describe("Proje Adı"),
  sector: z
    .string({
      required_error: "Sektör zorunludur.",
    })
    .describe("Sektör"),
});

const FirmaForm = () => {
  const [state, formAction] = useFormState(createFirm, null);
  const { pending } = useFormStatus();
  return (
    <AutoForm formSchema={firmSchema} onSubmit={formAction}>
      {state === null ? (
        <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
      ) : (
        <Button>Oluşturuldu</Button>
      )}
    </AutoForm>
  );
};

export default FirmaForm;
