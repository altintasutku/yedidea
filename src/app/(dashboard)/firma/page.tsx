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

const FirmaPage = () => {
  return (
    <ContentLayout title="Firma">
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>Firma Ekle</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div className="mt-4 rounded-md bg-background/60 p-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Firma Ekle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                <Input placeholder="Şirket Adı" />
                <Input placeholder="Sektörü" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Sıfırla</Button>
              <Button>Ekle</Button>
            </CardFooter>
          </Card>
        </div>
      </Breadcrumb>
      <div className="py-3"></div>
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>Firma Listesi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
        <DataTableDemo />
      </Breadcrumb>
    </ContentLayout>
  );
};

export default FirmaPage;
