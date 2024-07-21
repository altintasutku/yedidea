import React from "react";
import { ContentLayout } from "@/components/ContentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import CreatePersonelButton from "@/components/dashboard/personel/CreatePersonelButton";
import CreateExpenseButton from "@/components/expenses/CreatePersonelButton";
import EditExpensesDialog from "@/components/expenses/EditExpensesDialog";

const GiderlerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await db.select().from(debtTable);

  return (
    <ContentLayout title="Giderler">
      <DashboardBreadcrumb page="Giderler" />

      <div className="flex w-full justify-end">
        <CreateExpenseButton />
      </div>

      <DataTable
        DialogContent={EditExpensesDialog}
        columns={debtColumns}
        data={data}
      />
    </ContentLayout>
  );
};

export default GiderlerPage;
