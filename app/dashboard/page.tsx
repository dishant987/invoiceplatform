import React, { Suspense } from "react";
import { requireUser } from "../utils/hooks";
import DashboardBlocks from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import prisma from "@/lib/db";
import { EmptyState } from "../components/EmptyState";
import DashboardSkeleton from "../components/DashboardSkeleton";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  return data;
}

const page = async () => {
  const session = await requireUser();
  if (!session) {
    return null;
  }
  const data = await getData(session.user?.id as string);
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      {data.length > 0 ? (
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      ) : (
        <EmptyState />
      )}
    </Suspense>
  );
};

export default page;
