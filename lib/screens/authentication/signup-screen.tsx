"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SignupSchema } from "@/lib/form-schema";
import { SignupConstants } from "@/lib/constants";
import { DynamicInputField } from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRegisterUser } from "@/lib/hooks";

type FormData = z.infer<typeof SignupSchema>;

export default function SignupScreen() {
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
    <div className="flex flex-1 justify-center items-center ">
      <div className="flex flex-col justify-center w-96 mx-auto border rounded-md bg-slate-50 p-4 ">
        <div className="space-y-8">
          <p className="text-center text-2xl font-semibold">
            Create an Account
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit as any)}
              className="flex flex-col justify-center gap-8 w-full"
            >
              <div>
                {SignupConstants?.map((item) => (
                  <DynamicInputField form={form} data={item} />
                ))}
              </div>

              <div className="flex flex-col gap-2 w-full ">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <Link
                  className="text-blue-500 text-sm text-center w-full"
                  href="/login"
                >
                  Already have an account ?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
