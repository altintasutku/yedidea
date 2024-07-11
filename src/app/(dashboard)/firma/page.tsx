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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import FirmaForm from "@/components/Forms/FirmaForm";
import { firmaColumns } from "@/components/FirmaColumns";
import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

const FirmaPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const data = await db.select().from(firmTable);

  return (
    <ContentLayout title="Firma">
      <DashboardBreadcrumb page="Firma"/>

      <Card className="mt-4 w-full">
        <CardHeader>
          <CardTitle>Firma Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <FirmaForm />
        </CardContent>
      </Card>

      <DataTable columns={firmaColumns} data={data}/>
    </ContentLayout>
  );
};

export default FirmaPage;
