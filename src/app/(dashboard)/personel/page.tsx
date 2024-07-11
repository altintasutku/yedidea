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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import PersonelForm from "@/components/PersonelForm";
import Link from "next/link";
import { personelColumns } from "@/components/PersonelColumns";
import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema";

import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema";
import { PersonelColumns } from "@/components/PersonelColumns";

const PersonelPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await db.select().from(personelTable);
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
            <BreadcrumbPage>Personel</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4 w-full">
        <CardHeader>
          <CardTitle>Personel Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonelForm />
        </CardContent>
      </Card>

      <DataTable columns={personelColumns} data={data}/>
    </ContentLayout>
  );
};

export default PersonelPage;
