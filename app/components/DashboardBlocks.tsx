import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import {
  ActivityIcon,
  CreditCardIcon,
  IndianRupeeIcon,
  Users,
} from "lucide-react";
import React from "react";
import { requireUser } from "../utils/hooks";
import NumberTicker from "@/components/ui/number-ticker";

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return { data, openInvoices, paidInvoices };
}

const DashboardBlocks = async () => {
  const user = await requireUser();
  const { data, openInvoices, paidInvoices } = await getData(
    user.user?.id as string
  );
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IndianRupeeIcon className="size-4 text-muted-foreground " />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="flex items-center text-2xl font-bold pb-2">
              <IndianRupeeIcon className="size-5  font-bold" />
              <NumberTicker
                value={parseFloat(
                  data.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)
                )}
              />
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">Based on last 30 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Invoices Generated
          </CardTitle>
          <Users className="size-4 text-muted-foreground " />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold pb-2">
            +<NumberTicker value={data.length} />
          </h2>
          <p className="text-xs text-muted-foreground">Total Invoices</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCardIcon className="size-4 text-muted-foreground " />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold pb-2">
            +<NumberTicker value={paidInvoices.length} />
          </h2>
          <p className="text-xs text-muted-foreground">
            Total Invoices which have been paid!{" "}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Open Invoices</CardTitle>
          <ActivityIcon className="size-4 text-muted-foreground " />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold pb-2">
            +<NumberTicker value={openInvoices.length} />
          </h2>
          <p className="text-xs text-muted-foreground">
            Invoices which have not been paid!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBlocks;
