import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  gender: z.enum(["male", "female"]),
});

export const invoiceFormSchema = z.object({
  draft: z.string().min(1, "Draft is required"),
  invoiceNumber: z.string(),
  currency: z.string(),
  fromName: z.string().min(1, "From Name is required"),
  fromEmail: z.string().email("Invalid email address"),
  fromAddress: z.string().min(1, "From Address is required"),
  toName: z.string().min(1, "To Name is required"),
  toEmail: z.string().email("Invalid email address"),
  toAddress: z.string().min(1, "To Address is required"),
  date: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    {
      message: "Invoice date cannot be in the past",
    }
  ),
  dueDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate > today;
    },
    {
      message: "Due date cannot be in the past",
    }
  ),
  lineItems: z.array(
    z.object({
      description: z.string().min(1, "Description is required"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      rate: z.number().min(0, "Rate must be non-negative"),
      amount: z.number().min(0, "Amount must be non-negative"),
    })
  ),
  subTotal: z.number(),
  total: z.number(),
  notes: z.string().optional(),
});
