"use server";
import { requireUser } from "@/app/utils/hooks";
import { invoiceFormSchema } from "@/app/utils/zodSchemas";
import prisma from "@/lib/db";
import { z } from "zod";

export const updateInvoice = async (id: string, values: z.infer<typeof invoiceFormSchema>) => {
  const validated = invoiceFormSchema.safeParse(values);
  console.log(validated);
  if (!validated.success) {
    console.error("Validation error:", validated.error);
    return { error: "Invalid fields" };
  }

  // Ensure the user is authenticated
  const user = await requireUser();
  if (!user.user?.id) return { error: "User not found" };

  try {
    const invoice = await prisma.invoice.update({
      where: {
        id: id,
        userId: user.user?.id,
      },
      data: {
        invoiceNumber: values.invoiceNumber,
        draft: values.draft,
        currency: values.currency,
        fromName: values.fromName,
        fromEmail: values.fromEmail,
        fromAddress: values.fromAddress,
        toName: values.toName,
        toEmail: values.toEmail,
        toAddress: values.toAddress,
        date: new Date(values.date),
        dueDate: new Date(values.dueDate),
        subTotal: values.subTotal,
        total: values.total,
        notes: values.notes,
      },
    });

    return { success: "Invoice updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update user. Please try again later." };
  }
};
