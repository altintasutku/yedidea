import React from "react";
import { ContentLayout } from "@/components/ContentLayout";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import PersonelForm from "@/components/Forms/PersonelForm";
import Link from "next/link";
import { personelColumns } from "@/components/Columns/PersonelColumns";
import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

const PersonelPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await db.select().from(personelTable);
  return (
    <ContentLayout title="Personel">
      <DashboardBreadcrumb page="Personel" />

      <Card className="mt-4 w-full">
        <CardHeader>
          <CardTitle>Personel Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonelForm />
        </CardContent>
      </Card>

      <DataTable columns={personelColumns} data={data} />
    </ContentLayout>
  );
};

export default PersonelPage;
