import EditInvoiceForm from "@/app/dashboard/_components/EditInvoice";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

async function getInvoice(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: userId },
    include: {
      lineItems: true,
    },
  });
  if (!data) return { data: null };
  const invoiceData = {
    ...data,
    date: data.date.toISOString(),
    dueDate: data.dueDate.toISOString(),
    notes: data.notes ?? undefined,
  };
  return { data: invoiceData };
}

type Params = Promise<{ invoiceId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { invoiceId } = await params;
  const session = await requireUser();

  if (!session?.user) {
    redirect("/login");
  }

  const data = await getInvoice(invoiceId, session.user?.id as string);

  return (
    <div>{data.data ? <EditInvoiceForm invoice={data.data} id={invoiceId} /> : null}</div>
  );
};

export default page;
