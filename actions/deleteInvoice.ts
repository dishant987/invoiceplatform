import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export const deleteInvoice = async (invoiceId: string) => {
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
    await prisma.invoice.delete({
      where: {
        userId: session.user?.id,
        id: invoiceId,
      },
    });
    return { success: true, message: "Invoice deleted successfully" };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later",
    };
  }
};
