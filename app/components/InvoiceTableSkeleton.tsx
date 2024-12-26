import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRow = () => (
  <TableRow>
    {[...Array(7)].map((_, index) => (
      <TableCell key={index} className="px-4 py-2">
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
  </TableRow>
);

export const InvoiceTableSkeleton = () => {
  return (
    <div className="p-4 bg-background rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "ID",
              "Invoice ID",
              "Customer",
              "Amount",
              "Status",
              "Date",
              "Actions",
            ].map((header) => (
              <TableHead key={header} className="px-4 py-2">
                <Skeleton className="h-4 w-3/4" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
