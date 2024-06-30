import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTableDemo } from "@/components/DataTable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ContentLayout } from '@/components/ContentLayout';
import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const GelirlerPage = async () => {
  const session = await getAuthSession()
  if (!session) {
    return redirect('/login')
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
        <div className="grid grid-cols-2 gap-3">
          <div className="mt-4 rounded-md bg-background/60 p-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Alacak Düzenleme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-4">
                  <Input placeholder="İsim" />
                  <Input placeholder="Alınan Miktar" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Sıfırla</Button>
                <Button>Ekle</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Önceden Verilenler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </Breadcrumb>
      <div className="py-3"></div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Firma Listesi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
        <DataTableDemo />
      </Breadcrumb>
    </ContentLayout>
  );
};

export default GelirlerPage;
