"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloudIcon,
  EyeIcon,
  Mail,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function InvoiceActions({ invoiceId }: { invoiceId: string }) {
  
  const handlerSendReminderEmail = async () => {
    toast.promise(
      fetch(`/api/reminderEmail/${invoiceId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
      {
        loading: "Sending email...",
        success: "Email sent successfully",
        error: "Error sending email",
      }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant="outline">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${invoiceId}/edit`}>
            <PencilIcon className="mr-2 h-4 w-4" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/view/${invoiceId}`}>
            <EyeIcon className="mr-2 h-4 w-4" /> View Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link target="_blank" href={`/api/invoice/${invoiceId}`}>
            <DownloadCloudIcon className="mr-2 h-4 w-4" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlerSendReminderEmail}>
          <Mail className="mr-2 h-4 w-4" /> Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${invoiceId}/delete`}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={""}>
            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
