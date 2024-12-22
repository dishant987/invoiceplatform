"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useTransition } from "react";
import { invoiceFormSchema } from "@/app/utils/zodSchemas";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";
// import { updateInvoice } from "@/actions/updateInvoice";
import { redirect } from "next/navigation";
import { LineItem } from "./LineItem";
import { updateInvoice } from "@/actions/updateInvoice";
interface EditInvoiceFormProps {
  invoice: z.infer<typeof invoiceFormSchema>;
  id: string;
}

export default function EditInvoiceForm({ invoice, id }: EditInvoiceFormProps) {
  console.log(invoice.date);
  const [isPending, startTransition] = useTransition();
  const methods = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      ...invoice,
      lineItems: invoice.lineItems.map((item) => ({
        ...item,
        amount: item.quantity * item.rate,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "lineItems",
  });

  const watchLineItems = methods.watch("lineItems");
  const hasValidLineItems = watchLineItems.some(
    (item) => item.description && item.quantity > 0 && item.rate >= 0
  );

  useEffect(() => {
    const subTotal = watchLineItems.reduce(
      (acc, item) => acc + item.quantity * item.rate,
      0
    );
    methods.setValue("subTotal", parseFloat(subTotal.toFixed(2)));
    methods.setValue("total", parseFloat(subTotal.toFixed(2))); // Update if you need to include taxes
  }, [watchLineItems, methods]);

  function onSubmit(values: z.infer<typeof invoiceFormSchema>) {
    try {
      startTransition(async () => {
        const data = await updateInvoice(id, values);
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          redirect("/dashboard/invoices");
        }
      });
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("Something went wrong. Please try again later");
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center font-bold">
          Edit Invoice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center gap-4">
              <Badge className="mr-2 mt-5">Draft</Badge>
              <FormField
                control={methods.control}
                name="draft"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormControl>
                      <Input placeholder="Draft" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={methods.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold mb-2">From</h3>
                <FormField
                  control={methods.control}
                  name="fromName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="fromEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Email"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="fromAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Your Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold mb-2">To</h3>
                <FormField
                  control={methods.control}
                  name="toName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Client Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="toEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Client Email"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="toAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Client Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={methods.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={format(field.value, "yyyy-MM-dd")}
                        type="date"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input {...field}  value={format(field.value, "yyyy-MM-dd")} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Line Items</h3>

              {fields.map((field, index) => (
                <LineItem
                  key={field.id}
                  index={index}
                  remove={() => remove(index)}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({ description: "", quantity: 1, rate: 0, amount: 0 })
                }
              >
                Add Line Item
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={methods.control}
                name="subTotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Total</FormLabel>
                    <FormControl>
                      <div>₹&nbsp;{field.value.toFixed(2)}</div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <div>₹{field.value.toFixed(2)}</div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={methods.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={!hasValidLineItems || isPending}>
                {isPending && (
                  <Spinner className="dark:text-black text-white" />
                )}{" "}
                Update Invoice
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
