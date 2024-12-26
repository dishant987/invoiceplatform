import { InvoiceList } from "@/app/components/InvoiceList";
import { InvoiceTableSkeleton } from "@/app/components/InvoiceTableSkeleton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const Invoices = () => {
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
              <CardDescription className="text-sm">
                View your invoices
              </CardDescription>
            </div>
            <Link
              href={"/dashboard/invoices/create"}
              className={buttonVariants()}
            >
              <PlusIcon className="h-4 w-4" /> Create Invoice
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<InvoiceTableSkeleton />}>
            <InvoiceList />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default Invoices;
