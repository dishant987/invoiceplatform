import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export const markAsPaid = async (invoiceId: string) => {
  try {
    const session = await requireUser();
    if (!session?.user) {
      redirect("/login");
    }
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });
    if (!invoice) {
      return { success: false, message: "Invoice not found" };
    }
    await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        status: "PAID",
      },
    });
    return { success: true, message: "Invoice marked as paid" };
  } catch (error) {
    console.error("Error marking invoice as paid:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later",
    };
  }
};
