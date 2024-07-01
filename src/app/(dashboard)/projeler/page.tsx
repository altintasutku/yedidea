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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/DataTable";
import Link from "next/link";
import ProjelerForm from "@/components/ProjelerForm";

const ProjelerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

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

      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Proje Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjelerForm />
        </CardContent>
      </Card>

      <DataTableDemo />
    </ContentLayout>
  );
};

export default ProjelerPage;
