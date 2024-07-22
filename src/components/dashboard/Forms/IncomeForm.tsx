"use client";

import React, { useEffect } from "react";
import * as z from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { createIncome } from "@/app/actions/income";

export const incomeSchema = z.object({
  name: z.string({ required_error: "İsim zorunludur" }).describe("İsim"),
  amount: z.number({ required_error: "Miktar zorunludur" }).describe("Miktar"),
});

export type IncomeForm = z.infer<typeof incomeSchema>;

type Props = Readonly<{
  defaultValues?: Partial<IncomeForm>;
  action?: "create" | "update";
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const IncomeForm = ({ defaultValues, action = "create", setOpen }: Props) => {
  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(createIncome, {
    message: "",
    status: "idle",
  });

  const form = useForm<IncomeForm>({
    mode: "onBlur",
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (state.status === "success") {
      form.reset();
      if (setOpen) {
        setOpen(false);
      }
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İsim</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Gider ismi.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miktar</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Gider Miktarı</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}>
          {pending ? (
            <Loader2Icon className="animate-spin" />
          ) : action === "create" ? (
            "Oluştur"
          ) : (
            "Güncelle"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default IncomeForm;
