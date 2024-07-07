import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { registerUser } from "@/apicall";
import { validatePattern } from "@/utils";
import { emailPattern } from "../patterns";
import { useRouter } from "next/navigation";

const useRegisterUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const { confirmPassword, ...rest } = data;
      if (!validatePattern(rest.email, emailPattern))
        return toast({
          title: "Invalid Email",
          description: "Provide valid email address !",
        });
      const response = await registerUser(rest);
      return response;
    },
    onMutate: () => {
      toast({ title: "Please wait ...",description: "We are processing !" });
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({ title: "Error", description: data.error });
      } else {
        toast({ title: "Registration Successful", description: data.message });
        router.push("/login");

      }
    },
    onError: (error: any) => {
      console.error("Registration Failed:", error);
      toast({ title: "Registration Failed", description: error.message });
    },
  });
};

export default useRegisterUser;
