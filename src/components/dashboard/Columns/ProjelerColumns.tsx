"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CopyIcon,
  MoreHorizontal,
  MoreHorizontalIcon,
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
import { deleteProject } from "@/app/actions/project";

export const ProjelerColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "projectName",
    header: () => <div>İsim</div>,
    cell: ({ row }) => {
      return <div className="font-bold">{row.getValue("projectName")}</div>;
    },
  },
  {
    accessorKey: "firmName",
    header: () => <div>Firma</div>,
    cell: ({ row }) => <div>{row.getValue("firmName")}</div>,
  },
  {
    accessorKey: "sector",
    header: () => <div>Sektör</div>,
    cell: ({ row }) => <div>{row.getValue("sector")}</div>,
  },
  {
    accessorKey: "startDate",
    header: () => <div>Başlangıç</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));

      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: () => <div>Bitiş</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));

      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Fiyat</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
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
                deleteProject(selectedRows.map((row) => row.original));
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
      const project = row.original; 

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Proje Seçenekler</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(project.wps)} 
            >
              <CopyIcon className="mr-2 h-4 w-4" />
              Proje ID Kopyala
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                deleteProject([row.original]);
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
