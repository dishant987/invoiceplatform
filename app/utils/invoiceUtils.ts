import { randomBytes } from "crypto";

let counter = 0;

export function generateUniqueInvoiceNumber(): string {
  const prefix = "INV";
  const timestamp = Date.now().toString(36); // Base-36 encoded current timestamp
  const randomSuffix = randomBytes(4).toString("hex"); // Generate 4 bytes and convert to hex
  counter = (counter + 1) % 1000; // Ensure the counter is always a 3-digit number
  const counterSuffix = counter.toString().padStart(3, "0");

  return `${prefix}-${timestamp}-${randomSuffix}-${counterSuffix}`.toUpperCase();
}
