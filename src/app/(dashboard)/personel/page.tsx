import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
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

const PersonelPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

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
        </BreadcrumbList>

        <div className="grid grid-cols-2">
          <div className="mt-4 rounded-md bg-background/60 p-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Çalışan Ekle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-4">
                  <Input placeholder="Ad" />
                  <Input placeholder="Şirket Adı" />
                  <Input placeholder="Sektör" />
                  <Input placeholder="Başlangıç ve Bitiş Zamanı" />
                  <Input placeholder="Yaş" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Sıfırla</Button>
                <Button>Ekle</Button>
              </CardFooter>
            </Card>
          </div>
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

export default PersonelPage;
