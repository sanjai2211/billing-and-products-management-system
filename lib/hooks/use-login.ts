import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { validatePattern } from "@/utils";
import { emailPattern } from "../patterns";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      if (!validatePattern(data.email, emailPattern))
        return toast({
          title: "Invalid Email",
          description: "Provide valid email address !",
        });
      const response = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });
      return response;
    },
    onMutate: () => {
      toast({ title: "Please wait ...", description: "We are processing !" });
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({ title: "Error", description: data.error });
      } else {
        toast({ title: "Welcome", description: "Logged in Successfully !" });
        router.push("/");
        router.refresh()
      }
    },
    onError: (error: any) => {
      console.error("Registration Failed:", error);
      toast({ title: "Registration Failed", description: error.message });
    },
  });
};

export default useLogin;
