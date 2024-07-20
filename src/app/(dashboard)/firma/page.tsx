import React from "react";

import { ContentLayout } from "@/components/ContentLayout";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import FirmaForm from "@/components/dashboard/Forms/FirmaForm";
import { firmaColumns } from "@/components/dashboard/Columns/FirmaColumns";
import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import CreateFirmButton from "@/components/dashboard/firm/CreateFirmButton";
import EditFirmDialog from "@/components/dashboard/firm/EditFirmDialog";

export const dynamic = 'force-dynamic'

const FirmaPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const data = await db.select().from(firmTable);

  return (
    <ContentLayout title="Firma">
      <DashboardBreadcrumb page="Firma" />

      <div className="flex w-full justify-end">
        <CreateFirmButton />
      </div>

      <DataTable DialogContent={EditFirmDialog} columns={firmaColumns} data={data} />
    </ContentLayout>
  );
};

export default FirmaPage;
