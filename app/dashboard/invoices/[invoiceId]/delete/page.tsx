import { deleteInvoice } from "@/actions/deleteInvoice";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Params = Promise<{ invoiceId: string }>;

const DeleteInvoice = async ({ params }: { params: Params }) => {
  const { invoiceId } = await params;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-3xl">Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src="/warning.gif"
            alt="Warning"
            width={500}
            height={500}
            loading="lazy"
            className="rounded-lg"
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
            await deleteInvoice(invoiceId);
              redirect("/dashboard/invoices");
            }}
          >
            <SubmitButton
              className={buttonVariants({ variant: "destructive" })}
              text="Delete"
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteInvoice;
