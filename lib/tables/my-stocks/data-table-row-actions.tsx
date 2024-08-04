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
import { EditDeleteContainer, InformationTooltip } from "@/lib/components";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useAddEditDeleteProduct } from "@/lib/hooks";
import { DeleteAlert } from "@/lib/components/alerts/delete-alert";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  handleDelete?: any;
  handleEdit?: any;
  hideDelete?:any
  alertDelete?:any
}

export function DataTableRowActions<TData>({
  row,
  handleEdit,
  handleDelete,
  alertDelete
}: DataTableRowActionsProps<TData>) {
  const name = row.getValue("productName") as any;
  const code = row.getValue("stockCode") as any;
  const productId = row.getValue("id") as any;

  return (
    <EditDeleteContainer
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      details={{ name : 'Stock', code }}
      id={productId}
      alertDelete={alertDelete}
    />
  );
}
