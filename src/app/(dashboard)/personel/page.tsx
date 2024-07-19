import React from "react";
import { ContentLayout } from "@/components/ContentLayout";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { personelColumns } from "@/components/dashboard/Columns/PersonelColumns";
import { db } from "@/lib/db";
import { personelTable } from "@/lib/schema";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import CreatePersonelButton from "@/components/dashboard/personel/CreatePersonelButton";
import EditPersonelDialog from "@/components/dashboard/personel/EditPersonelDialog";

const PersonelPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await db.select().from(personelTable);

  return (
    <ContentLayout title="Personel">
      <DashboardBreadcrumb page="Personel" />
      <div className="flex w-full justify-end">
        <CreatePersonelButton />
      </div>

      <DataTable
        DialogContent={EditPersonelDialog}
        columns={personelColumns}
        data={data}
      />
    </ContentLayout>
  );
};

export default PersonelPage;
