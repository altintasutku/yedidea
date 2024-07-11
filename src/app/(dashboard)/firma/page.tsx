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
import FirmaForm from "@/components/FirmaForm";
import { db } from "@/lib/db";
import { firmTable } from "@/lib/schema";
import { FirmColumns } from "@/components/FirmColumns";

const FirmaPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const data = await db.select().from(firmTable);

  return (
    <ContentLayout title="Firma">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Firma</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4 w-full">
        <CardHeader>
          <CardTitle>Firma Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <FirmaForm />
        </CardContent>
      </Card>

      <DataTable columns={FirmColumns} data={data} />
    </ContentLayout>
  );
};

export default FirmaPage;
