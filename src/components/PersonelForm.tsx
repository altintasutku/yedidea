"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { useFormState, useFormStatus } from "react-dom";
import { createPersonel } from "@/app/actions/personel";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

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
  resume: z.string().describe("Özgeçmiş"),
});

const PersonelForm = () => {
  const [state, formAction] = useFormState(createPersonel, null);
  const { pending } = useFormStatus();

  return (
    <AutoForm
      formSchema={personelFormSchema}
      onSubmit={formAction}
      fieldConfig={{
        resume: {
          fieldType: "file",
        },
      }}
    >
      {state === null ? (
        <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
      ) : (
        <Button>Oluşturuldu</Button>
      )}
    </AutoForm>
  );
};

export default PersonelForm;
