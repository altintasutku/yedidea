import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/ContentLayout";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DebtForm } from "@/components/dashboard/Forms/DebtForm";
import { debtColumns } from "@/components/dashboard/Columns/DebtColumns";
import { db } from "@/lib/db";
import { debtTable, incomeTable } from "@/lib/schema";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

const GiderlerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await db.select().from(debtTable);

  return (
    <ContentLayout title="Giderler">
      <DashboardBreadcrumb page="Giderler" />

      <div className="grid grid-cols-2 gap-3">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Gider Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <DebtForm />
          </CardContent>
        </Card>

        <Card className="w-full">
          {/* TODO */}
          <CardHeader>
            <CardTitle>Önceden Verilenler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-4">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={debtColumns} data={data} />
    </ContentLayout>
  );
};

export default GiderlerPage;
