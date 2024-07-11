"use client";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { Button } from "../ui/button";
import { createDebt } from "@/app/actions/debt";

export const debtSchema = z.object({
  name: z.string({ required_error: "İsim zorunludur" }).describe("İsim"),
  amount: z.number({ required_error: "Miktar zorunludur" }).describe("Miktar"),
});

export const DebtForm = () => {
  const [state, formAction] = useFormState(createDebt, null);
  const { pending } = useFormStatus();

  return (
    <AutoForm formSchema={debtSchema} onSubmit={formAction}>
      {state === null ? (
        <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
      ) : (
        <Button>Oluşturuldu</Button>
      )}
    </AutoForm>
  );
};
