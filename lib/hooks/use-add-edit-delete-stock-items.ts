import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  createStockItems,
  deleteStockItems,
  updateStockItems,
} from "@/apicall";

const useAddEditDeleteStockItems = ({ clearForm,stockId }: any) => {
  const router = useRouter();
  console.log({clearForm,stockId})
  return useMutation({
    mutationFn: async (data: any) => {
      console.log({data})
      const {edit,id, code, cost, quantity,method } = data;
      const action = method === "PATCH" ? "Updat" : method === "DELETE" ? "Delet" : "Creat";

      let response;
      if (method === "PATCH")
        response = await updateStockItems(id, {
          cost: parseFloat(cost),
          quantity: parseInt(quantity),
        });
      else if (method === "DELETE")
        response = await deleteStockItems(id);
      else
        response = await createStockItems({
          stockId,
          productId: code?.value,
          quantity: parseInt(quantity),
          cost: parseFloat(cost),
        });
      return {...response,action};
    },
    onMutate: (data) => {
      const {method} = data
      const action = method === "PATCH" ? "Updat" : method === "DELETE" ? "Delet" : "Creat";

      toast({
        title: `${action}ing Stock Items ... !`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any) => {
      const {action} = data
      if (data?.error) {
        toast({
          title: `Stock Items ${action}ion Failed !`,
          description:
            data?.error ||
            `We encountered an issue while ${action}ing your product. Please try again.`,
        });
      } else {
        toast({
          title: `Stock Items ${action}ed !`,
          description: `Your Stock Items has been ${action}ed successfully.`,
        });
        clearForm();
        router.refresh();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Stock Items Creation Failed !",
        description:
          error?.error ||
          "We encountered an issue while creating your Stock Items. Please try again.",
      });
    },
  });
};

export default useAddEditDeleteStockItems;
