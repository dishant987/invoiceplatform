import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceActions } from "./InvoiceActions";
import { getUserInvoice } from "@/actions/getUserInvoice";
import { requireUser } from "../utils/hooks";
import moment from "moment";
import { InvoiceStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export async function InvoiceList() {
  const session = await requireUser();
  const data = await getUserInvoice(session.user?.id as string);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg ">
      <Table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              ID
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Invoice ID
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Customer
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Amount
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Status
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Date
            </TableHead>
            <TableHead className="px-4 py-2 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((invoice, index) => (
            <TableRow
              key={invoice.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                {index + 1}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                {invoice.toName}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                {Number(invoice.total).toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status == ("Paid" as InvoiceStatus)
                      ? "default"
                      : "destructive"
                  }
                  className={
                    invoice.status === ("Paid" as InvoiceStatus)
                      ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                      : ""
                  }
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                {moment(invoice.createdAt).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="px-4 py-2 text-right border-b border-gray-200 dark:border-gray-700">
                <InvoiceActions invoiceId={invoice.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
