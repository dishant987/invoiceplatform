"use server";
import { requireUser } from "@/app/utils/hooks";
import { onboardingSchema } from "@/app/utils/zodSchemas";
import prisma from "@/lib/db";
import { z } from "zod";

export const onboardUser = async (values: z.infer<typeof onboardingSchema>) => {
  // Validate input fields
  const validated = onboardingSchema.safeParse(values);

  if (!validated.success) {
    return { error: "Invalid fields" }; // Return error message for invalid fields
  }

  // Ensure the user is authenticated
  const user = await requireUser();

  try {
    // Update user details in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: user.user?.id,
      },
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        gender: values.gender,
      },
    });

    // Redirect or return a success message
    return { success: "User updated successfully", data: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update user. Please try again later." };
  }
};
