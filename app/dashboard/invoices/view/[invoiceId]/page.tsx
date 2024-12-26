import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getInvoice(invoiceId: string) {
  const session = await requireUser();

  if (!session?.user) {
    redirect("/login");
  }

  const data = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: session.user.id },
  });

  const lineItems = await prisma.lineItem.findMany({
    where: { invoiceId: invoiceId },
  });
  return { data, lineItems };
}

type Params = Promise<{ invoiceId: string }>;

export default async function ViewInvoice({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const { data, lineItems } = await getInvoice(invoiceId);
  console.log(data);
  console.log(lineItems);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center font-bold">
          View Invoice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
          {/* Invoice Status and Currency */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Draft</Label>
              <Badge className="w-[80px]">{data?.draft}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Badge
                variant={`${
                  data?.status === "PAID" ? "default" : "destructive"
                }`}
                className="w-[80px]"
              >
                {data?.status}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Invoice Number</Label>
              <Input
                placeholder="Invoice Number"
                value={data?.invoiceNumber}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Currency</Label>
              <Input placeholder="Currency" value={data?.currency} readOnly />
            </div>
          </div>

          {/* From and To Details */}
          <div className="grid grid-cols-2 gap-4">
            {/* From Details */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">From</h3>
              <div className="flex flex-col gap-2">
                <Label>Your Name</Label>
                <Input
                  placeholder="Your Name"
                  value={data?.fromName}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Your Email</Label>
                <Input
                  placeholder="Your Email"
                  value={data?.fromEmail}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Your Address</Label>
                <Textarea
                  placeholder="Your Address"
                  value={data?.fromAddress}
                  readOnly
                />
              </div>
            </div>

            {/* To Details */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">To</h3>
              <div className="flex flex-col gap-2">
                <Label>Client Name</Label>
                <Input
                  placeholder="Client Name"
                  value={data?.toName}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Client Email</Label>
                <Input
                  placeholder="Client Email"
                  value={data?.toEmail}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Client Address</Label>
                <Textarea
                  placeholder="Client Address"
                  value={data?.toAddress}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Input
                placeholder="Date"
                type="date"
                value={data?.date?.toISOString().split("T")[0]}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Due Date</Label>
              <Input
                placeholder="Due Date"
                type="date"
                value={data?.dueDate?.toISOString().split("T")[0]}
                readOnly
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Line Items</h3>
            <div className="flex flex-col gap-2">
              {lineItems?.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex flex-col gap-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="Description"
                      value={item.description}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Quantity</Label>
                    <Input
                      placeholder="Quantity"
                      value={item.quantity}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Rate</Label>
                    <Input
                      placeholder="Rate"
                      value={`₹ ${item.rate.toFixed(2)}`}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Amount</Label>
                    <Input
                      placeholder="Amount"
                      value={`₹ ${item.amount.toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total and Subtotal */}
          <div className=" flex justify-end">
            <div className="w-1/3">
              <div className="flex  justify-between gap-32 mb-3">
                <span>Subtotal</span>
                <span className="font-bold">₹ {data?.subTotal.toFixed(2)}</span>
              </div>

              <div className="flex  justify-between gap-32 border-t pt-3">
                <span>Total ({data?.currency})</span>
                <span className="font-bold underline-offset-[2px] underline">
                  ₹ {data?.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <Label>Notes</Label>
            <Textarea placeholder="Notes" value={data?.notes || ""} readOnly />
          </div>

          {/* Back Button */}
          <div className="flex justify-end">
            <Link
              href="/dashboard/invoices"
              className={buttonVariants({ variant: "outline" })}
            >
              Back
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
