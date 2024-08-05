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
import IncomeForm from "@/components/dashboard/Forms/IncomeForm";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import { incomeColumns } from "@/components/dashboard/Columns/IncomeColumns";
import { db } from "@/lib/db";
import CreateIncomeButton from "@/components/incomes/CreateIncomeButton";
import EditIncomesDialog from "@/components/incomes/EditIncomesDialog";
import { incomeTable } from "@/lib/schema/income";

export const dynamic = "force-dynamic";

const GelirlerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await db.select().from(incomeTable);

  return (
    <ContentLayout title="Gelirler">
      <DashboardBreadcrumb page="Gelirler" />

      <div className="flex w-full justify-end">
        <CreateIncomeButton />
      </div>

      <DataTable
        DialogContent={EditIncomesDialog}
        columns={incomeColumns}
        data={data}
      />
    </ContentLayout>
  );
};

export default GelirlerPage;
