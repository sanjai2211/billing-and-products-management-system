"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createShop, updateShop } from "@/apicall";

const useAddEditShop = ({ shopId }: any) => {
  const router = useRouter();
  const action = shopId ? "Updat" : "Creat";
  return useMutation({
    mutationFn: async (data: any) => {
      const { addressLine1, addressLine2, city, state, zip, userId, ...rest } =
        data;
      const address = {
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
      };
      let response;
      if (shopId) response = await updateShop({ ...rest, address, shopId });
      else
        response = await createShop({
          ...rest,
          userId,
          address,
        });
      return response;
    },
    onMutate: () => {
      toast({
        title: `${action}ing Shop... !`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any) => {
      if (data?.error || !data?.message) {
        toast({
          title: `Shop ${action}ion Failed !`,
          description:
            data?.error ||
            `We encountered an issue while ${action}ing your Shop. Please try again.`,
        });
      } else if (data?.message) {
        toast({
          title: `Shop ${action}ed !`,
          description: `Your Shop has been ${action}ed successfully.`,
        });
        router.refresh();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Shop Creation Failed !",
        description:
          error?.error ||
          "We encountered an issue while creating your Shop. Please try again.",
      });
    },
  });
};

export default useAddEditShop;
