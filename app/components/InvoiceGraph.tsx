import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Graph } from "./Graph";
import prisma from "@/lib/db";
import { requireUser } from "../utils/hooks";

async function fetchInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });


  //Group and aggregate invoices data by date
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      // Format date in IST (Indian Standard Time)
      const date = new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(curr.createdAt));
      acc[date] = (acc[date] || 0) + curr.total;

      return acc;
    },
    {} as { [key: string]: number }
  );

  const transformData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ", " + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({ date, amount }));
  return transformData;
}

export async function InvoiceGraph() {
  const user = await requireUser();
  const data = await fetchInvoices(user.user?.id as string);
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Graph of paid invoices over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  );
}
