import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { requireUser } from "../utils/hooks";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      toName: true,
      toEmail: true,
      createdAt: true,
      status: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
  return data;
}

export async function RecentInvoices() {
  const user = await requireUser();

  if (!user?.user) {
    redirect("/login");
  }
  const data = await getData(user.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((invoice) => (
          <div key={invoice.id} className="flex items-center gap-4">
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback>{invoice.toName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-medium leading-none">
                {invoice.toName}
              </h2>
              <p className="text-sm text-muted-foreground">{invoice.toEmail}</p>
            </div>
            <div className=" text-sm ml-auto">
              +{invoice.total} {invoice.currency}{" "}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
