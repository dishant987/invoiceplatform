import prisma from "@/lib/db";

export async function getUserInvoice(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      invoiceNumber: true,
      toName: true,
      createdAt: true,
      status: true,
      total: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
