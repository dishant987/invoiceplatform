import { ReactNode } from "react";
import { requireUser } from "../utils/hooks";
import Link from "next/link";
import { LogOutIcon, MenuIcon, Sidebar, User2Icon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "../utils/auth";
// import { ModeToggle } from "@/components/ui/toggle";
import DashboardLinks from "../components/DashboardLinks";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });

  if (!data?.firstName || !data?.lastName || !data?.address) {
    redirect("/onboarding");
  }
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await requireUser();

  if (!session?.user) {
    redirect("/login");
  }

  const data = await getUser(session.user?.id as string);
  return (
    <>
      <div className="  grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]">
        <div className=" hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-4">
                <Image src="/invoice.png" alt="logo" width={50} height={50} />
                <p className="text-xl font-bold">
                  Invoice <span className="text-blue-600">Dishant</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <header className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="md:hidden">
                  <MenuIcon className="h-8 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>Invoice Dishant</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-1 mt-6">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            {/* <Sidebar className="h-6 w-6 cursor-pointer md:hidden" /> */}
            <div className="flex items-center ml-auto gap-4">
              {/* <div>
                <ModeToggle />
              </div> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    className=" rounded-full"
                    size={"icon"}
                  >
                    <User2Icon className="h-8 w-8" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link className=" cursor-pointer" href="/dashboard">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      className=" cursor-pointer"
                      href="/dashboard/invoices"
                    >
                      Invoices
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button className="flex w-full items-center">
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
