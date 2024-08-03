"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import PersonelForm from "../Forms/PersonelForm";
import { Row } from "@tanstack/react-table";
import AddProject from "./AddProject";
import PersonelHistory from "./PersonelHistory";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table } from "lucide-react";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type Props = Readonly<{
  row: Row<any>;
}>;

const EditPersonelDialog = ({ row }: Props) => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <DialogContent className="max-w-[80dvw]">
      <DialogHeader>
        <DialogTitle>Personel Kartı</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-x-4 divide-x">
        <PersonelForm action="update" defaultValues={row.original} />
        <ScrollArea className="flex h-[85dvh] flex-col p-4">
          <AddProject row={row} />
          <Separator className="mt-2" />
          <div className="flex w-1/2">
            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Ara"
              className="mt-5"
            />
          </div>
          <PersonelHistory searchValue={searchValue} row={row} />
          <Table>
            <TableCaption>Önceden Ödenenler</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tarih</TableHead>
                <TableHead className="text-right">Miktar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </DialogContent>
  );
};

export default EditPersonelDialog;
