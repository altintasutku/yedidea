"use client";

import { Row } from "@tanstack/react-table";
import React, { useMemo } from "react";
import AddPayment from "../Forms/AddPayment";
import { DataTable } from "@/components/DataTable";
import axios from "axios";
import { ProjectPersonelSelect } from "@/lib/schema/project";
import { useQuery } from "@tanstack/react-query";
import { PaymentSelect } from "@/lib/schema/payment";
import { paymentColumns } from "../Columns/PaymentColumns";

type Props = Readonly<{
  row: Row<any>;
}>;

const PayToPersonel = ({ row }: Props) => {
  const { data: payments, refetch: paymentsRefetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const payments = await axios.get("/api/payment");

      const filteredData = payments.data.filter(
        (payment: PaymentSelect) => payment.personelId === row.original.id,
      ) as PaymentSelect[];

      return filteredData;
    },
    staleTime: 0,
  });

  const { data: projectPersonel, refetch: projectPersonelRefecth } = useQuery({
    queryKey: ["projectPersonel"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/project-personel?personelId=${row.original.id}`,
      );

      const filteredData = data.filter(
        (projectPersonel: ProjectPersonelSelect) => {
          return projectPersonel.personelId === row.original.id;
        },
      );

      return filteredData as ProjectPersonelSelect[];
    },
    staleTime: 0,
  });

  const personelDebt = useMemo(
    () =>
      (projectPersonel || []).reduce((acc, projectPersonel) => {
        return acc + Number(projectPersonel.personelPrice);
      }, 0),
    [projectPersonel],
  );

  const totalPaid = useMemo(
    () =>
      (payments || []).reduce((acc, payment) => {
        return acc + Number(payment.paidAmount);
      }, 0),
    [payments],
  );

  if (!projectPersonel || !payments) return;

  return (
    <div className="px-10">
      <div className="flex items-center justify-between">
        <span className="font-bold">
          Kalan Borç: {personelDebt - totalPaid} TL
        </span>
        <AddPayment
          personelId={row.original.id}
          //   refetchs={[paymentsRefetch, projectPersonelRefecth]}
        />
      </div>
      <DataTable columns={paymentColumns} data={payments} />
    </div>
  );
};

export default PayToPersonel;
