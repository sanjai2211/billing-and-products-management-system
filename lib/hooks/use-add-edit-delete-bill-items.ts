import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  createBillItems,
  deleteBillItem,
  updateBillItem,
} from "@/apicall";

const useAddEditDeleteBillItems = ({ method,form }: any) => {
  const router = useRouter();
  const action =
    method === "PATCH" ? "Updat" : method === "DELETE" ? "Delet" : "Creat";
  return useMutation({
    mutationFn: async (data: any) => {
        console.log({data})
      const { billItemId, ...rest } = data;
      let response;
      if (method === "PATCH")
        response = await updateBillItem(billItemId, rest);
      else if (method === "DELETE") response = await deleteBillItem(billItemId);
      else
        response = await createBillItems(data);
      return response;
    },
    onMutate: () => {
      toast({
        title: `${action}ing Bill Items ... !`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any) => {
        console.log({data})
      if (data?.error) {
        toast({
          title: `Bill Items ${action}ion Failed !`,
          description: data?.error || `We encountered an issue while ${action}ing your product. Please try again.`,
        });
      } else {
        toast({
          title: `Bill Items ${action}ed !`,
          description: `Your Bill Items has been ${action}ed successfully.`,
        });
        console.log({resssss : data})
        if(method === 'CREATE' || method === 'PATCH'){
          form?.reset()
        }
        router.refresh();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Bill Items Creation Failed !",
        description:
          error?.error ||
          "We encountered an issue while creating your Bill Items. Please try again.",
      });
    },
  });
};

export default useAddEditDeleteBillItems;
