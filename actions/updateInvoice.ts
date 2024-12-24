"use server";
import { requireUser } from "@/app/utils/hooks";
import { invoiceFormSchema } from "@/app/utils/zodSchemas";
import prisma from "@/lib/db";
import { updateInvoiceMail } from "@/lib/upadeInvoiceMail";
import { z } from "zod";

export const updateInvoice = async (
  id: string,
  values: z.infer<typeof invoiceFormSchema>
) => {
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

    const mail = await updateInvoiceMail(values.toEmail, {
      invoiceId: invoice.id,
      invoiceNumber: values.invoiceNumber,
      fromName: values.fromName,
      fromEmail: values.fromEmail,
      toName: values.toName,
      toEmail: values.toEmail,
      date: values.date,
      dueDate: values.dueDate,
      subTotal: values.subTotal,
      total: values.total,
      lineItems: values.lineItems,
    });

    if (!mail.success) {
      return { error: "Failed to send invoice. Please try again later." };
    }

    console.log(mail);

    return { success: "Invoice updated successfully and sent successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update user. Please try again later." };
  }
};
