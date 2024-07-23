import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/ContentLayout";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import * as React from "react";
import GiderDagilimi from "@/components/dashboard/charts/gideroranlari";
import { db } from "@/lib/db";
import GelirDagilimi from "@/components/dashboard/charts/geliroranlari";
import AylikDurum from "@/components/dashboard/charts/aylikdurum";
import Kazanc from "@/components/dashboard/charts/kazanc";

const DashboardPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }

  const debts = await db.query.debtTable.findMany();
  const incomes = await db.query.incomeTable.findMany();

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
        <Kazanc className="sm:col-span-2 md:col-span-3"/>
        <AylikDurum />
        <GiderDagilimi data={debts} />
        <GelirDagilimi data={incomes} />
      </div>
    </ContentLayout>
  );
};

export default DashboardPage;
