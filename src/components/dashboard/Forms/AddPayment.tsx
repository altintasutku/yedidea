"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { addPayment } from "@/app/actions/payment";
import { queryClient } from "@/components/Providers";

const formSchema = z.object({
  paidAmount: z
    .string({ required_error: "ödenen miktar zorunludur" })
    .describe("Ödenen Miktar"),
});

type Props = Readonly<{
  personelId: string;
}>;

const AddPayment = ({ personelId }: Props) => {
  const [state, formAction] = useFormState(addPayment, {
    message: "",
    status: "idle",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedValues = {
      ...values,
      personelId: personelId,
    };
    formAction(updatedValues);
  }

  useEffect(() => {
    if (state.status === "success") {
      queryClient.refetchQueries({ queryKey: ["payments"] });
      queryClient.refetchQueries({ queryKey: ["projectPersonel"] });
    }
  }, [state.status]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center gap-x-5">
          <FormField
            control={form.control}
            name="paidAmount"
            render={({ field }) => (
              <FormItem className="flex justify-center">
                <FormControl>
                  <Input placeholder="Miktar" type="number" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {state.status === "loading"
              ? "Yükleniyor..."
              : state.status === "success"
                ? "Ödendi"
                : "Ödeme Yap"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPayment;
