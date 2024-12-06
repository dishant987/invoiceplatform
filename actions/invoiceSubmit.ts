"use server";
import { requireUser } from "@/app/utils/hooks";
import { invoiceFormSchema } from "@/app/utils/zodSchemas";
import prisma from "@/lib/db";
import { z } from "zod";

export const InvoiceSubmit = async (
  values: z.infer<typeof invoiceFormSchema>
) => {
  const validated = invoiceFormSchema.safeParse(values);

  if (!validated.success) {
    return { error: "Invalid fields" };
  }

  // Ensure the user is authenticated
  const user = await requireUser();

  try {
    // Redirect or return a success message
    return { success: "User updated successfully", data: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update user. Please try again later." };
  }
};
