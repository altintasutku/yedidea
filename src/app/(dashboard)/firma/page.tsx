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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableDemo } from "@/components/DataTable";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import FirmaForm from "@/components/FirmaForm";

const FirmaPage = async () => {
  const session = await getAuthSession()
  if (!session) {
    return redirect('/login')
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
            <BreadcrumbPage>Firma</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Firma Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <FirmaForm />
        </CardContent>
      </Card>

      <DataTableDemo />
    </ContentLayout>
  );
};

export default FirmaPage;
