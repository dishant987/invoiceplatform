import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  ActivityIcon,
  CreditCardIcon,
  IndianRupeeIcon,
  Users,
} from "lucide-react";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {[
          { title: "Total Revenue", icon: IndianRupeeIcon },
          { title: "Total Invoices Generated", icon: Users },
          { title: "Paid Invoices", icon: CreditCardIcon },
          { title: "Open Invoices", icon: ActivityIcon },
        ].map((block, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">
                {block.title}
              </CardTitle>
              <block.icon className="size-4 text-muted-foreground " />
            </CardHeader>
            <CardContent>
              <div>
                <Skeleton className="h-8 w-24 mb-2" />
              </div>
              <Skeleton className="h-4 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        {/* InvoiceGraph Skeleton */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        {/* RecentInvoices Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="hidden sm:flex size-9 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-4 w-20 ml-auto" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
