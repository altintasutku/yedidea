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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import Link from "next/link";
import ProjelerForm from "@/components/ProjelerForm";
import { ProjelerColumns } from "@/components/ProjelerColumns";
import { db } from "@/lib/db";
import { projectTable } from "@/lib/schema";

const ProjelerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const data = await db.select().from(projectTable);

  return (
    <ContentLayout title="Projeler">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Projeler</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
