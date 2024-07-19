import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferSelectModel } from "drizzle-orm";
import { projectPersonelTable } from "@/lib/schema";

type Props = Readonly<{
  personelId: string;
}>;

const HistoryTable = ({ personelId }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["personels"],
    queryFn: async () => {
      const response = await axios.get("/api/projectHistory");

      response.data = response.data.filter(
        (item: InferSelectModel<typeof projectPersonelTable>) =>
          item.personelId === personelId,
      );
      return response.data as InferSelectModel<typeof projectPersonelTable>[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Table>
      <TableCaption>Önceki Projeler</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Proje Adı</TableHead>
          <TableHead>Personel Ücreti</TableHead>
          <TableHead>Proje Ücreti</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.projectName}</TableCell>
              <TableCell>{item.personelPrice}</TableCell>
              <TableCell>{item.projectPrice}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
