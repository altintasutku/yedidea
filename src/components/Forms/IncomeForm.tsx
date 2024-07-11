"use client";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { Button } from "../ui/button";
import { createDebt } from "@/app/actions/debt";
import { createIncome } from "@/app/actions/income";

export const incomeSchema = z.object({
  name: z.string({ required_error: "İsim zorunludur" }).describe("İsim"),
  amount: z.number({ required_error: "Miktar zorunludur" }).describe("Miktar"),
});

export const IncomeForm = () => {
  const { pending } = useFormStatus();

  return (
    <AutoForm formSchema={incomeSchema} onSubmit={createIncome}>
      <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
    </AutoForm>
  );
};
