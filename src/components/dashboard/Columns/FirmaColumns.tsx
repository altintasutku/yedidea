"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CopyIcon,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteFirm } from "@/app/actions/firm";

export const firmaColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div>İsim</div>,
    cell: ({ row }) => {
      return <div className="font-bold">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "sector",
    header: () => <div>Sektör</div>,
    cell: ({ row }) => <div>{row.getValue("sector")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Oluşturma Tarihi</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header(props) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Genel Seçenekler</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                const selectedRows = props.table.getSelectedRowModel().rows;
                deleteFirm(selectedRows.map((row) => row.original));
                props.table.resetRowSelection();
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Seçili olanların HEPSİNİ sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row, table }) => {
      const firm = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Firma Seçenekler</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(firm.id)}
            >
              <CopyIcon className="mr-2 h-4 w-4" />
              Firma ID Kopyala
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                deleteFirm([row.original]);
                table.resetRowSelection();
              }}
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
