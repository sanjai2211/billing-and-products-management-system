"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SignupSchema } from "@/lib/form-schema";
import { ExportOptionsMyBills, SignupConstants } from "@/lib/constants";
import { DynamicInputField, ExportButton } from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRegisterUser } from "@/lib/hooks";
import { signOut } from "next-auth/react";

type FormData = z.infer<typeof SignupSchema>;

export default function HomeScreen() {
  const form = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: onSubmit } = useRegisterUser();

  return (
    <div className="flex flex-1 items-center h-full flex-col gap-4 w-[300px] mx-auto">
        <div >Home</div>
      <Button onClick={async()=> await signOut()}> Sign Out</Button>
      <ExportButton data={ExportOptionsMyBills}/>
    </div>
  );
}
