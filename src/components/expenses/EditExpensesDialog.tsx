"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useMemo } from "react";
import { Row } from "@tanstack/react-table";
import DebtForm from "../dashboard/Forms/DebtForm";
import AddPayment from "../dashboard/Forms/AddPayment";
import { Separator } from "@radix-ui/react-select";
import AddProject from "../dashboard/personel/AddProject";
import { useQuery } from "@tanstack/react-query";
import { PaymentSelect } from "@/lib/schema/payment";
import axios from "axios";
import { DataTable } from "../DataTable";
import { paymentColumns } from "../dashboard/Columns/PaymentColumns";

const EditExpensesDialog = ({ row }: { row: Row<any> }) => {
  const [totalPaid, setTotalPaid] = React.useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axios.get("/api/payment");

      const payments = data.filter((payment: PaymentSelect) => {
        return payment.debtId === row.original.id;
      });
      payments.map((payment: PaymentSelect) => {
        setTotalPaid((prev) => prev + Number(payment.paidAmount));
      });
      return payments as PaymentSelect[];
    },
  });

  return (
    <DialogContent className="max-w-[80dvw]">
      <DialogHeader>
        <DialogTitle>Gider Kartı</DialogTitle>
      </DialogHeader>
      <div>
        <DebtForm action="update" defaultValues={row.original} />
        {/* <div className="px-10">
          <Separator className="mt-2" />
          <div className="flex items-center justify-between">
            <span className="font-bold">
              Kalan Borç: {row.original.amount - totalPaid}
            </span>
            <AddPayment row={row} />
          </div>
          <DataTable columns={paymentColumns} data={data} />
        </div> */}
      </div>
    </DialogContent>
  );
};

export default EditExpensesDialog;
