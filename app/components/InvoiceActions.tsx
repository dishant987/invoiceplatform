import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    BookMarked,
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export function InvoiceActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant="outline">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={""}>
            <PencilIcon className="mr-2 h-4 w-4" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={""}>
            <DownloadCloudIcon className="mr-2 h-4 w-4" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={""}>
            <Mail className="mr-2 h-4 w-4" /> Reminder Email
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={""}>
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
