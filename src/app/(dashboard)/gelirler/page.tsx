import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/DataTable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ContentLayout } from "@/components/ContentLayout";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IncomeForm } from "@/components/Forms/IncomeForm";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import { incomeColumns } from "@/components/IncomeColumns";
import { incomeTable } from "@/lib/schema";
import { db } from "@/lib/db";

const GelirlerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await db.select().from(incomeTable);

  return (
    <ContentLayout title="Gelirler">
      <DashboardBreadcrumb page="Gelirler" />
      
      <div className="grid grid-cols-2 gap-3">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Gelir Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeForm />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Önceden Alınanlar</CardTitle>
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

      <DataTable columns={incomeColumns} data={data} />
    </ContentLayout>
  );
};

export default GelirlerPage;
