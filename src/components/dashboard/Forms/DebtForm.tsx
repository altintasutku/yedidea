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
import { createExpense, updateExpense } from "@/app/actions/expenses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const debtSchema = z.object({
  id: z.string().describe("ID"),
  name: z.string({ required_error: "İsim zorunludur" }).describe("İsim"),
  amount: z.number({ required_error: "Miktar zorunludur" }).describe("Miktar"),
  category: z.enum(["Personel", "Proje", "Özel"]).describe("Kategori"),
});

export type DebtForm = z.infer<typeof debtSchema>;

type Props = Readonly<{
  defaultValues?: Partial<DebtForm>;
  action?: "create" | "update";
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const DebtForm = ({ defaultValues, action = "create", setOpen }: Props) => {
  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(
    action === "create" ? createExpense : updateExpense,
    {
      message: "",
      status: "idle",
    },
  );

  const form = useForm<DebtForm>({
    mode: "onBlur",
    resolver: zodResolver(debtSchema),
    defaultValues: {
      id: defaultValues?.id || "",
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

  const handleSubmit = () => {
    const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escEvent);
  };

  return (
    <Form {...form}>
      <form
        action={(e) => {
          handleSubmit();
          formAction(e);
        }}
        className="space-y-4 p-4"
      >
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(v) =>
                    form.setValue(
                      "category",
                      v as "Personel" | "Proje" | "Özel",
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personel">Personel</SelectItem>
                    <SelectItem value="Proje">Proje</SelectItem>
                    <SelectItem value="Özel">Özel</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Gider Kategorisi</FormDescription>
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
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <input type="hidden" {...field} />}
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

export default DebtForm;
