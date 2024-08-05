"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CopyIcon,
  FileIcon,
  MoreHorizontal,
  SortAsc,
  SortDesc,
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
import { deletePersonel } from "@/app/actions/personel";
import Image from "next/image";

export const personelColumns: ColumnDef<any>[] = [
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
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "photo",
    header: () => <div>Fotoğraf</div>,
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("photo")}
          alt="Profile"
          height={40}
          width={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div>İsim</div>
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="font-bold">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "sector",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div>Sektör</div>
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div>Yaş</div>
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div>Cinsiyet</div>
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div>Şehir</div>
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "files",
    header: "Dosya",
    cell: ({ row }) => {
      return (
        <div>
          <a
            href={row.getValue("files")}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer underline"
            onClick={(e) => e.stopPropagation()}
          >
            Dosyayı Aç
          </a>
        </div>
      );
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
                deletePersonel(selectedRows.map((row) => row.original));
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
      const personel = row.original; // TODO

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Personel Seçenekler</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(personel.id)} // TODO
            >
              <CopyIcon className="mr-2 h-4 w-4" />
              Personel ID Kopyala
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href={row.getValue("files")}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer underline flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <FileIcon className="mr-2 h-4 w-4" />
                Dosyayı Aç
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                deletePersonel([row.original]);
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
