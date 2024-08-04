import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  createStock,
  deleteStock,
  stockClearAll,
  updateStock,
} from "@/apicall";

const useAddEditDeleteClearStock = ({ stockId, shopId }: any) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const { edit, id, method, ...rest } = data;

      let response;
      if (method === "PATCH" || method === "FINAL")
        response = await updateStock(stockId, rest);
      else if (method === "DELETE") response = await deleteStock(id);
      else if (method === "CREATE") response = await createStock({ shopId });
      else response = await stockClearAll(stockId);
      return { ...response, method };
    },
    onMutate: (data: any) => {
      const { method } = data;
      const action =
        method === "PATCH"
          ? "Updat"
          : method === "DELETE"
          ? "Delet"
          : method === "CLEAR"
          ? "Clear"
          : "Creat";

      toast({
        title: `${action}ing Stock ... !`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any, context) => {
      const { method } = context;
      const action =
        method === "PATCH"
          ? "Updat"
          : method === "DELETE"
          ? "Delet"
          : method === "CLEAR"
          ? "Clear"
          : "Creat";
      if (data?.error) {
        toast({
          title: `Stock ${action}ion Failed !`,
          description:
            data?.error ||
            `We encountered an issue while ${action}ing your product. Please try again.`,
        });
      } else {
        toast({
          title: `Stock ${action}ed !`,
          description: `Your Stock has been ${action}ed successfully.`,
        });
        if (method === "FINAL" || method === "DELETE") {
          router.push("/my-stocks");
        }
        router.refresh();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Stock Creation Failed !",
        description:
          error?.error ||
          "We encountered an issue while creating your Stock . Please try again.",
      });
    },
  });
};

export default useAddEditDeleteClearStock;
