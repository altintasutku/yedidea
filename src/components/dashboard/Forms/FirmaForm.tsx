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
import { PhoneInput } from "@/components/ui/phone-input";
import { createPersonel } from "@/app/actions/personel";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import defaultPp from "@/lib/data/default-pp.png";
import { createFirm } from "@/app/actions/firm";

export const firmSchema = z.object({
  name: z.string(),
  sector: z.string(),
});

export type FirmForm = z.infer<typeof firmSchema>;

type Props = Readonly<{
  defaultValues?: Partial<FirmForm>;
  action?: "create" | "update";
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const FirmaForm = ({ defaultValues, action = "create", setOpen }: Props) => {
  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(createFirm, {
    message: "",
    status: "idle",
  });

  const [profilePhoto, setProfilePhoto] = React.useState<File>();
  const ppInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<FirmForm>({
    mode: "onBlur",
    resolver: zodResolver(firmSchema),
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
              <FormDescription>Firmanın ismi.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sektör</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Firmanın sektörü.</FormDescription>
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

export default FirmaForm;
