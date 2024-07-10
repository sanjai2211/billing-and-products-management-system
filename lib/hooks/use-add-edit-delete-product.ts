import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  createNewProduct,
  deleteProduct,
  updateProductDetails,
} from "@/apicall";

const useAddEditDeleteProduct = (id?: String, method?: String) => {
  const router = useRouter();
  const action =
    method === "PATCH" ? "Updat" : method === "DELETE" ? "Delet" : "Creat";
  const shopId = "668d73ba2a6cfb4e622c0255";
  return useMutation({
    mutationFn: async (data: any) => {
      let response;
      if (method === "PATCH")
        response = await updateProductDetails(id, {
          ...data,
          shopId,
        });
      else if (method === "DELETE") response = await deleteProduct(id, shopId);
      else
        response = await createNewProduct({
          ...data,
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
        if (!id) router.push("/products");
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
