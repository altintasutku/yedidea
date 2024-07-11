"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { createProject } from "@/app/actions/project";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferSelectModel } from "drizzle-orm";
import { firmTable } from "@/lib/schema";
import { Loader2Icon } from "lucide-react";

const ProjelerForm = () => {
  const [state, formAction] = useFormState(createProject, null);
  const { pending } = useFormStatus();

  const { data, isLoading, error } = useQuery({
    queryKey: ["firm"],
    queryFn: async () => {
      const response = await axios.get("/api/firm");
      return response.data as InferSelectModel<typeof firmTable>[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2Icon className="animate-spin"></Loader2Icon>Yükleniyor...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
    /*
      *NOT:bu kod calisiyor ama inatla string arrayi kabul etmiyor 
    */
    //@ts-expect-error
    firmName: z.enum(data.map((i) => i.name)).describe("Firma Adı"),
    startDate: z.coerce.date().describe("Başlangıç Tarihi"),
    endDate: z.coerce.date().describe("Bitiş Tarihi"),
    amount: z.coerce.number().describe("Fiyat"),
  });

  return (
    <AutoForm formSchema={projectSchema} onSubmit={formAction}>
      {state === null ? (
        <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
      ) : (
        <Button>Oluşturuldu</Button>
      )}
    </AutoForm>
  );
};

export default ProjelerForm;
