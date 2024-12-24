import prisma from "@/lib/db";
import jsPdf from "jspdf";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      lineItems: true,
    },
  });
  if (!invoice) return new Response("Invoice not found", { status: 404 });
  const pdf = new jsPdf({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setFont("helvetica");
  pdf.setFontSize(24);

  pdf.text(`Invoice #${invoice.draft}`, 20, 20);

  //From
  pdf.setFontSize(12);
  pdf.text(`From: ${invoice.fromName}`, 20, 30);
  pdf.text(`Email: ${invoice.fromEmail}`, 20, 35);
  pdf.text(`Address: ${invoice.fromAddress}`, 20, 40);

  //To
  pdf.setFontSize(12);
  pdf.text(`To: ${invoice.toName}`, 20, 50);
  pdf.text(`Email: ${invoice.toEmail}`, 20, 55);
  pdf.text(`Address: ${invoice.toAddress}`, 20, 60);

  //Items
  pdf.setFontSize(12);
  pdf.text(`Invoice Number: ${invoice.invoiceNumber}`, 110, 30);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US").format(invoice.date)}`,
    110,
    35
  );
  pdf.text(
    `Due Date: ${new Intl.DateTimeFormat("en-US").format(invoice.dueDate)}`,
    110,
    40
  );
  pdf.text(`Currency: ${invoice.currency}`, 110, 45);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Items", 20, 70);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, 80);
  pdf.text("Quantity", 80, 80);
  pdf.text("Rate", 120, 80);
  pdf.text("Total", 160, 80);

  pdf.line(20, 82, 200, 82);

  //Line Items
  pdf.setFont("helvetica", "normal");

  let yPosition = 90; // Starting Y position for the line items
  const lineHeight = 10; // Height between each line item

  invoice.lineItems.forEach((lineItem) => {
    pdf.text(lineItem.description, 20, yPosition);
    pdf.text(lineItem.quantity.toString(), 80, yPosition);
    pdf.text(`${lineItem.rate.toFixed(2)} ${invoice.currency}`, 120, yPosition);
    pdf.text(
      `${lineItem.amount.toFixed(2)} ${invoice.currency}`,
      160,
      yPosition
    );

    // Draw a horizontal line below each line item
    pdf.line(20, yPosition + 2, 200, yPosition + 2);

    // Move to the next line
    yPosition += lineHeight;
  });

  // Adjust Y position for the subtotal and total
  yPosition += 10; // Add some space after the last line item

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");

  pdf.text(`Subtotal (${invoice.currency}):`, 120, yPosition);
  pdf.text(
    `${invoice.subTotal.toFixed(2)} ${invoice.currency}`,
    160,
    yPosition
  );

  yPosition += lineHeight;

  pdf.text(`Total (${invoice.currency}):`, 120, yPosition);
  pdf.text(`${invoice.total.toFixed(2)} ${invoice.currency}`, 160, yPosition);

  // Additional notes
  if (invoice.notes) {
    yPosition += 20; // Add some space before notes

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Notes:`, 20, yPosition);
    pdf.text(`${invoice.notes}`, 20, yPosition + 5);
  }

  //genrate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice.pdf"`,
    },
  });
}
