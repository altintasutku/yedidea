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
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import Link from "next/link";
import ProjelerForm from "@/components/dashboard/Forms/ProjelerForm";
import { ProjelerColumns } from "@/components/dashboard/Columns/ProjelerColumns";
import { db } from "@/lib/db";
import { personelTable, projectTable } from "@/lib/schema";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import { personelColumns } from "@/components/dashboard/Columns/PersonelColumns";

const ProjelerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const data = await db.select().from(projectTable);

  return (
    <ContentLayout title="Projeler">
      <DashboardBreadcrumb page="Projeler" />

      <Card className="mt-4 w-full">
        <CardHeader>
          <CardTitle>Proje Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjelerForm />
        </CardContent>
      </Card>

      <DataTable columns={ProjelerColumns} data={data} />
    </ContentLayout>
  );
};

export default ProjelerPage;
