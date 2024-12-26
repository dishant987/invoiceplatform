import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ViewInvoiceSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl text-center font-bold">
          <Skeleton className="h-8 w-48 mx-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 sm:space-y-8">
          {/* Invoice Status and Currency */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>

          {/* From and To Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-6 w-24" />
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>

          {/* Line Items */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Total and Subtotal */}
          <div className="flex justify-end">
            <div className="w-full sm:w-1/2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex justify-between gap-4 sm:gap-32 mb-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Back Button */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

