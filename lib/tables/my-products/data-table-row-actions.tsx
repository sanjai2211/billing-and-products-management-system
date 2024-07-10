"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icons";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { InformationTooltip } from "@/lib/components";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useAddEditDeleteProduct } from "@/lib/hooks";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const router = useRouter();

  const productName = row.getValue("productName") as any;
  const productCode = row.getValue("code") as any;
  const productId = row.getValue("id") as any

  const { mutate: onSubmit } = useAddEditDeleteProduct(productId,'DELETE');


  return (
    <div>
      <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete{" "}
              <span className="font-bold">{productName.toUpperCase()}</span>?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-xs opacity-50 text-red-500">
                This action cannot be undone!
              </p>
              <div className="my-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2">
                    Type{" "}
                    <span className="font-bold text-base opacity-100">
                      {productCode.toUpperCase()}
                    </span>{" "}
                    to confirm deletion
                  </p>
                  <InformationTooltip content={"Case - sensitive"} />
                </div>
                <InputOTP
                  maxLength={productCode?.length}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  className="w-full"
                  containerClassName="w-full"
                  value={confirmationInput}
                  onChange={(value) => setConfirmationInput(value)}
                >
                  <InputOTPGroup>
                    {productCode?.split("").map((_: any, i: number) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={confirmationInput !== productCode.toUpperCase()}
              className="flex items-center bg-destructive hover:bg-destructive text-black dark:text-white"
              onClick={() => {
                onSubmit()
                setDeleteAlert(false);
              }}
            >
              <Icon name="Trash2" className="w-4 h-5 mr-2" />
              <p className="pt-0.5">Delete</p>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Icon name="MoreHorizontal" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[60px] rounded-md">
          <DropdownMenuItem
            onClick={() => router.push(`/add-product/${row.getValue("id")}`)}
          >
            <Icon name="Pen" className="w-4 h-5 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:text-destructive"
            onClick={() => setDeleteAlert(true)}
          >
            <Icon name="Trash2" className="w-4 h-5 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
