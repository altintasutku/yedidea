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


const PersonelPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

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


      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Personel Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonelForm />
        </CardContent>
      </Card>

      <DataTable />
    </ContentLayout>
  );
};

export default PersonelPage;
