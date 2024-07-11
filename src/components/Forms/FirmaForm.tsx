"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { useFormState, useFormStatus } from "react-dom";
import { createFirm } from "@/app/actions/firm";
import { Button } from "../ui/button";

export const firmSchema = z.object({
  name: z
    .string({
      required_error: "Firma adı zorunludur.",
    })
    .describe("Firma Adı"),
  sector: z
    .string({
      required_error: "Sektör zorunludur.",
    })
    .describe("Sektör"),
});

const FirmaForm = () => {
  const { pending } = useFormStatus();
  return (
    <AutoForm formSchema={firmSchema} onSubmit={createFirm}>
      <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
    </AutoForm>
  );
};

export default FirmaForm;
