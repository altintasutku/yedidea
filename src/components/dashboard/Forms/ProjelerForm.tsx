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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferSelectModel } from "drizzle-orm";
import { firmTable } from "@/lib/schema/firm";
import { personelTable } from "@/lib/schema/personel";
import { Command as CommandPrimitive } from "cmdk";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DatePicker } from "@/components/ui/date-picker";
import { createProject } from "@/app/actions/project";

const projectSchema = z.object({
  projectName: z
    .string({
      required_error: "Proje adı zorunludur.",
    })
    .describe("Proje Adı"),
  sector: z
    .string({
      required_error: "Sektör zorunludur.",
    })
    .describe("Sektör"),
  firmName: z
    .string({ required_error: "Firma İsmi Zorunludur" })
    .describe("Firma"),
  startDate: z.coerce.date().describe("Başlangıç Tarihi"),
  endDate: z.coerce.date().describe("Bitiş Tarihi"),
  amount: z.coerce.number().describe("Fiyat"),
});

export type ProjectForm = z.infer<typeof projectSchema>;

type Props = Readonly<{
  defaultValues?: Partial<ProjectForm>;
  action?: "create" | "update";
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const ProjectForm = ({ defaultValues, action = "create", setOpen }: Props) => {
  const { pending } = useFormStatus();

  const { data, isLoading, error } = useQuery({
    queryKey: ["firm"],
    queryFn: async () => {
      const response = await fetch("/api/firm",{cache:"no-store"}).then((res) => res.json());
      return response as InferSelectModel<typeof firmTable>[];
    },
    staleTime: 0,
  });

  const [state, formAction] = useFormState(createProject, {
    message: "",
    status: "idle",
  });

  const [firmSearchOpen, setFirmSearchOpen] = React.useState(false);
  const [firmSearchValue, setFirmSearchValue] = React.useState("");

  const form = useForm<ProjectForm>({
    mode: "onBlur",
    resolver: zodResolver(projectSchema),
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
      <form onSubmit={form.handleSubmit(formAction)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proje İsmi</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Proje ismi.</FormDescription>
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
              <FormDescription>Sektör</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firma</FormLabel>
              <FormControl>
                <Command className="overflow-visible bg-transparent">
                  <div className="group flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <CommandPrimitive.Input
                      value={firmSearchValue}
                      onValueChange={setFirmSearchValue}
                      onFocus={() => setFirmSearchOpen(true)}
                      onBlur={() => setFirmSearchOpen(false)}
                      className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="relative">
                    <CommandList>
                      {isLoading ? (
                        <Loader2Icon className="animate-spin" />
                      ) : firmSearchOpen ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            {data &&
                              data.map((firm) => {
                                return (
                                  <CommandItem
                                    key={firm.id}
                                    className={"cursor-pointer"}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onSelect={() => {
                                      form.setValue("firmName", firm.name);
                                      setFirmSearchOpen(false);
                                      setFirmSearchValue(firm.name);
                                    }}
                                  >
                                    {firm.name}
                                  </CommandItem>
                                );
                              })}
                          </CommandGroup>
                        </div>
                      ) : null}
                    </CommandList>
                  </div>
                </Command>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlangıç Tarihi</FormLabel>
              <FormControl>
                <DatePicker
                  setDate={(date) =>
                    form.setValue("startDate", date ?? new Date())
                  }
                  date={form.getValues("startDate")}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bitiş Tarihi</FormLabel>
              <FormControl>
                <DatePicker
                  setDate={(date) =>
                    form.setValue("endDate", date ?? new Date())
                  }
                  date={form.getValues("endDate")}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fiyat</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Fiyat</FormDescription>
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

export default ProjectForm;
