import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const useSignOutUser = (setIsLoggingOut:any) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => { 
        setIsLoggingOut(true)
      const response = await signOut()
      return response;
    },
    onMutate: () => {
        toast({ title: "Logging Out ...", description: "We are securely logging you out. Please wait a moment." });
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({ title: "Logout Failed !", description: "We encountered an issue while logging you out. Please try again." });    }
     else {
        toast({ title: "Successfully Logged Out !", description: "You have been logged out. We hope to see you again soon!" });
        router.push("/login");
      }
      setIsLoggingOut(false)
    },
    onError: (error: any) => {
      toast({ title: "Logout Failed !", description: "We encountered an issue while logging you out. Please try again." });    
      setIsLoggingOut(false)
    }
  });
};

export default useSignOutUser;
