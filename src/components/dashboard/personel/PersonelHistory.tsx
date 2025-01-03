"use client";

import { queryClient } from "@/components/Providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectPersonelSelect, ProjectSelect } from "@/lib/schema/project";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { Loader2Icon } from "lucide-react";
import React, { useEffect } from "react";

// Row is a personel
type Props = Readonly<{
  row: Row<any>;
}>;

const PersonelHistory = ({ row }: Props) => {
  const [searchValues, setSearchValues] = React.useState<
    (ProjectPersonelSelect & { project: ProjectSelect })[]
  >([]);

  const [searchValue, setSearchValue] = React.useState("");

  useEffect(() => {
    if (searchValue && history) {
      const filtered = history.filter((item) => {
        return item.project.projectName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setSearchValues(filtered);
    }
  }, [searchValue]);

  const {
    data: history,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["personelHistory", row.original.id],
    queryFn: async () => {
      const data = await fetch(
        `/api/project-personel?personelId=${row.original.id}`,
        { cache: "no-store" },
      ).then((res) => res.json());
      return data as (ProjectPersonelSelect & { project: ProjectSelect })[];
    },
    staleTime: 0,
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: async (values: ProjectPersonelSelect) => {
      await fetch(`/api/project-personel?id=${values.id}`, {
        cache: "no-store",
        method: "DELETE",
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: changeActive } = useMutation({
    mutationFn: async (values: ProjectPersonelSelect) => {
      await fetch(`/api/project-personel/change-active?id=${values.id}`, {
        cache: "no-store",
      });
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
      <h1 className="mt-2 text-center text-3xl font-bold">Personel Geçmişi</h1>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Proje Ara"
      />
      {history ? (
        <ul className="space-y-4 divide-y overflow-auto py-4">
          {searchValue.length > 0
            ? searchValues.map((item) => (
                <li key={item.id} className="group flex flex-col gap-2 p-2">
                  <Card className="bg-slate-100 dark:bg-slate-900">
                    <div className="flex items-center gap-3 px-4 py-4">
                      {item.active ? (
                        <span
                          onClick={() => changeActive(item)}
                          className="cursor-pointer select-none rounded-md p-1 text-green-500 transition-all hover:scale-110 hover:bg-green-100/20"
                        >
                          Aktif
                        </span>
                      ) : (
                        <span
                          onClick={() => changeActive(item)}
                          className="cursor-pointer select-none rounded-md p-1 text-red-500 transition-all hover:scale-110 hover:bg-red-100/20"
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
                        <span>
                          Bitiş: {new Date(item.endDate).toDateString()}
                        </span>
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
                  </Card>
                </li>
              ))
            : history.map((item) => (
                <li key={item.id} className="group flex flex-col gap-2 p-2">
                  <Card className="bg-slate-100 dark:bg-slate-900">
                    <div className="flex items-center gap-3 px-4 py-4">
                      {item.active ? (
                        <span
                          onClick={() => changeActive(item)}
                          className="cursor-pointer select-none rounded-md p-1 text-green-500 transition-all hover:scale-110 hover:bg-green-100/20"
                        >
                          Aktif
                        </span>
                      ) : (
                        <span
                          onClick={() => changeActive(item)}
                          className="cursor-pointer select-none rounded-md p-1 text-red-500 transition-all hover:scale-110 hover:bg-red-100/20"
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
                        <span>
                          Bitiş: {new Date(item.endDate).toDateString()}
                        </span>
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
                  </Card>
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
