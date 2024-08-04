"use client";

import { queryClient } from "@/components/Providers";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectPersonelSelect, ProjectSelect } from "@/lib/schema/project";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React from "react";

// Row is a personel
type Props = Readonly<{
  row: Row<any>;
}>;

const PersonelHistory = ({ row }: Props) => {
  const {
    data: history,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["personelHistory", row.original.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/project-personel?personelId=${row.original.id}`,
      );
      return data as (ProjectPersonelSelect & { project: ProjectSelect })[];
    },
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: async (values: ProjectPersonelSelect) => {
      await axios.delete(`/api/project-personel?id=${values.id}`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: changeActive } = useMutation({
    mutationFn: async (values: ProjectPersonelSelect) => {
      await axios.get(`/api/project-personel/change-active?id=${values.id}`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loader2Icon className="animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-2">Personel Geçmişi</h1>
      {history ? (
        <ul className="space-y-4 divide-y overflow-auto py-4">
          {history.map((item) => (
            <li key={item.id} className="group flex flex-col gap-2 p-2">
              <div className="flex items-center gap-3">
                {item.active ? (
                  <span
                    onClick={() => changeActive(item)}
                    className="cursor-pointer text-green-500 transition-all hover:scale-110 select-none hover:bg-green-100/20 rounded-md p-1"
                  >
                    Aktif
                  </span>
                ) : (
                  <span
                    onClick={() => changeActive(item)}
                    className="cursor-pointer text-red-500 transition-all hover:scale-110 select-none hover:bg-red-100/20 rounded-md p-1"
                  >
                    Pasif
                  </span>
                )}
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">
                      Proje: {item.project.projectName}
                    </span>
                    <span>Ücret: {item.personelPrice}</span>
                  </div>
                  <span>
                    Başlangıç: {new Date(item.startDate).toDateString()}
                  </span>
                  <span>Bitiş: {new Date(item.endDate).toDateString()}</span>
                </div>
                <div className="hidden group-hover:block">
                  <Button
                    onClick={() => removeItem(item)}
                    variant={"destructive"}
                  >
                    Sil
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>Bir kaytı bulunamadı</span>
      )}
    </>
  );
};

export default PersonelHistory;
