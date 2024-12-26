import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { sendReminderInvoiceMail } from "@/lib/reminderInvoice";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
): Promise<NextResponse> {
  const session = await requireUser();
  if (!session?.user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const { invoiceId } = await params;
  const invoiceData = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { lineItems: true },
  });

  if (!invoiceData) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }
  const mail = await sendReminderInvoiceMail(invoiceData.toEmail, {
    invoiceId: invoiceData.id,
    invoiceNumber: invoiceData.invoiceNumber,
    fromName: invoiceData.fromName,
    fromEmail: invoiceData.fromEmail,
    toName: invoiceData.toName,
    toEmail: invoiceData.toEmail,
    date: invoiceData.date.toLocaleString("en-US", { timeZone: "UTC" }),
    dueDate: invoiceData.dueDate.toLocaleString("en-US", { timeZone: "UTC" }),
    subTotal: invoiceData.subTotal,
    total: invoiceData.total,
    lineItems: invoiceData.lineItems,
    currency: invoiceData.currency,
  });

  if (!mail) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: "Email sent successfully" },
    { status: 200 }
  );
}
