import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  createNewProduct,
  deleteProduct,
  updateProductDetails,
} from "@/apicall";

const useAddEditDeleteProduct = ({ shopId, method }: any) => {
  const router = useRouter();
  const action =
    method === "PATCH" ? "Updat" : method === "DELETE" ? "Delet" : "Creat";
  return useMutation({
    mutationFn: async (data: any) => {
      const { productId, ...rest } = data;
      console.log({data})
      let response;
      if (method === "PATCH")
        response = await updateProductDetails(productId, {
          ...rest,
          shopId,
        });
      else if (method === "DELETE") response = await deleteProduct(productId);
      else
        response = await createNewProduct({
          ...rest,
          shopId,
        });
      return response;
    },
    onMutate: () => {
      toast({
        title: `${action}ing Product... !`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({
          title: `Product ${action}ion Failed !`,
          description: `We encountered an issue while ${action}ing your product. Please try again.`,
        });
      } else {
        toast({
          title: `Product ${action}ed !`,
          description: `Your product has been ${action}ed successfully.`,
        });
        if (action === "Creat") router.push("/products");
        router.refresh();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Product Creation Failed !",
        description:
          error?.error ||
          "We encountered an issue while creating your product. Please try again.",
      });
    },
  });
};

export default useAddEditDeleteProduct;
