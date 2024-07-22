"use client";

import React from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../../ui/auto-form";
import { createProject } from "@/app/actions/project";
import { useFormStatus } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferSelectModel } from "drizzle-orm";
import { Loader2Icon } from "lucide-react";
import { firmTable } from "@/lib/schema/firm";
import { personelTable } from "@/lib/schema/personel";

const ProjelerForm = () => {
  const { pending } = useFormStatus();

  const { data, isLoading, error } = useQuery({
    queryKey: ["firm"],
    queryFn: async () => {
      const response = await axios.get("/api/firm");
      return response.data as InferSelectModel<typeof firmTable>[];
    },
  });
  const {
    data: personels,
    isLoading: loading,
    error: personelError,
  } = useQuery({
    queryKey: ["personels"],
    queryFn: async () => {
      const response = await axios.get("/api/personel");
      return response.data as InferSelectModel<typeof personelTable>[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2Icon className="animate-spin"></Loader2Icon>Yükleniyor...
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2Icon className="animate-spin"></Loader2Icon>Yükleniyor...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (personelError) {
    return <div>Error: {personelError.message}</div>;
  }

  if (!personels) {
    return;
  }

  // console.log(projects);
  // console.log(personels);

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

  if (data?.length === 0) {
    return <div>Firma bulunamadı</div>;
  }

  return (
    <AutoForm formSchema={projectSchema} onSubmit={createProject}>
      <AutoFormSubmit disabled={pending}>Ekle</AutoFormSubmit>
    </AutoForm>
  );
};

export default ProjelerForm;
