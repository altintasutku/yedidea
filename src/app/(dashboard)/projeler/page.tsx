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

const ProjelerPage = async () => {
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

        <div className="mt-4 rounded-md bg-background/60 p-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>İş Ekle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                <Input placeholder="Proje Adı" />
                <Input placeholder="Şirket Adı" />
                <Input placeholder="Şirketten Alınacak Para" />
                <Input placeholder="Sektör" />
                <Input placeholder="Başlangıç ve Bitiş Zamanı" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Input placeholder="Çalışan" />
                <Input placeholder="Personele Verilecek Ücret" />
                <div className="flex flex-row gap-x-2">
                  <Input placeholder="Gittiği Tarihler" />
                  <Button variant={"outline"}></Button>
                </div>
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

export default ProjelerPage;
