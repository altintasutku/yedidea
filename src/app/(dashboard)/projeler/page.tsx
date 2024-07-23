import React from "react";
import { ContentLayout } from "@/components/ContentLayout";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import ProjelerForm from "@/components/dashboard/Forms/ProjelerForm";
import { ProjelerColumns } from "@/components/dashboard/Columns/ProjelerColumns";
import { db } from "@/lib/db";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import { projectTable } from "@/lib/schema/project";
import CreateProjectButton from "@/components/dashboard/Projects/CreateProjectButton";
import EditProjectDialog from "@/components/dashboard/Projects/EditProjectDialog";

const ProjelerPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const data = await db.select().from(projectTable);

  return (
    <ContentLayout title="Projeler">
      <DashboardBreadcrumb page="Projeler" />

      <div className="flex w-full justify-end">
        <CreateProjectButton />
      </div>

      <DataTable
        DialogContent={EditProjectDialog}
        columns={ProjelerColumns}
        data={data}
      />
    </ContentLayout>
  );
};

export default ProjelerPage;
