"use client";

import React from "react";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { useFormStatus } from "react-dom";
import { createPersonel } from "@/app/actions/personel";
import { AutoFormInputComponentProps } from "../ui/auto-form/types";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export const personelFormSchema = z.object({
  name: z
    .string({
      required_error: "İsim zorunludur.",
    })
    .describe("İsim"),
  sector: z
    .string({
      required_error: "Sektör zorunludur.",
    })
    .describe("Sektör"),
  age: z
    .string({
      required_error: "Yaş zorunludur.",
    })
    .describe("Yaş"),
  files: z.string().describe("Dosyalar"),
});

const PersonelForm = () => {
  const { pending } = useFormStatus();

  return (
    <AutoForm
      formSchema={personelFormSchema}
      onSubmit={(values) => console.log(values)}
    >
      <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
    </AutoForm>
  );
};

export default PersonelForm;
