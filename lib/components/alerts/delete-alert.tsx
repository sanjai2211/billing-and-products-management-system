"use client";

import { Icon } from "@/lib/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { InformationTooltip } from "@/lib/components";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";

export function DeleteAlert<TData>({
  details,
  handleDelete,
  title = "Are you sure you want to delete",
  subTitle = "This action cannot be undone!",
  type = "icon",
}: any) {
  const [confirmationInput, setConfirmationInput] = useState("");
  const { name, code } = details;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {type === "icon" ? (
          <div className="text-destructive rounded-full border p-2 hover:bg-muted/50 cursor-pointer">
            <Icon name="Trash2" className="w-4 h-4" />
          </div>
        ) : (
          <Button type="button" variant={"destructive"}>
            <Icon name="Trash2" className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title} <span className="font-bold">{name?.toUpperCase()}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-xs opacity-50 text-red-500">{subTitle}</p>
            <div className="my-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2">
                  Type{" "}
                  <span className="font-bold text-base opacity-100">
                    {code?.toUpperCase()}
                  </span>{" "}
                  to confirm deletion
                </p>
                <InformationTooltip content={"Case - sensitive"} />
              </div>
              <InputOTP
                maxLength={code?.length}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                className="w-full"
                containerClassName="w-full"
                value={confirmationInput}
                onChange={(value) => setConfirmationInput(value)}
              >
                <InputOTPGroup>
                  {code?.split("").map((_: any, i: number) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmationInput !== code?.toUpperCase()}
            className="flex items-center bg-destructive hover:bg-destructive text-black dark:text-white"
            onClick={() => {
              handleDelete({ id: details?.id });
            }}
          >
            <Icon name="Trash2" className="w-4 h-5 mr-2" />
            <p className="pt-0.5">Delete</p>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
