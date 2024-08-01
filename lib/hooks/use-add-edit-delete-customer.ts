import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  createCustomer,
  createNewProduct,
  deleteCustomer,
  deleteProduct,
  updateCustomer,
  updateProductDetails,
} from "@/apicall";

const useAddEditDeleteCustomer = ({ shopId, method }: any) => {
  console.log({ shopId, method });
  const router = useRouter();
  const action =
    method === "PATCH" ? "Updat" : method === "DELETE" ? "Delet" : "Creat";
  return useMutation({
    mutationFn: async (data: any) => {
      const {customerId, addressLine1, addressLine2, city, state, zip, ...rest } =
        data;
      const address = {
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
      };
      console.log({ data });
      let response;
      if (method === "PATCH")
        response = await updateCustomer(customerId, {
          ...rest,
          shopId,
        });
      else if (method === "DELETE") response = await deleteCustomer(customerId);
      else
        response = await createCustomer({
          ...rest,
          address,
          shopId,
        });
      return response;
    },
    onMutate: () => {
      toast({
        title: `${action}ing Customer... !`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({
          title: `Customer ${action}ion Failed !`,
          description: `We encountered an issue while ${action}ing your customer. Please try again.`,
        });
      } else {
        toast({
          title: `Customer ${action}ed !`,
          description: `Your customer has been ${action}ed successfully.`,
        });
        if (action === "Creat") router.push("/my-customers");
        router.refresh();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Customer Creation Failed !",
        description:
          error?.error ||
          "We encountered an issue while creating your customer. Please try again.",
      });
    },
  });
};

export default useAddEditDeleteCustomer;
