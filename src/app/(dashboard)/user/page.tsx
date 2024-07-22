import React from "react";
import { ContentLayout } from "@/components/ContentLayout";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { db } from "@/lib/db";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import UserForm from "@/components/dashboard/Forms/UserForm";
import { userColumns } from "@/components/dashboard/Columns/UserColumns";
import { userTable } from "@/lib/schema/user";

const UserPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const data = await db.select().from(userTable);

  return (
    <ContentLayout title="Sistem Kullanıcıları">
      <DashboardBreadcrumb page="Sistem Kullanıcıları" />

      <Card className="mt-4 w-full">
        <CardHeader>
          <CardTitle>Sistem Kullanıcısı Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>

      <DataTable columns={userColumns} data={data} />
    </ContentLayout>
  );
};

export default UserPage;
