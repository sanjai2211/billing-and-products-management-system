import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createNewProduct, updateProductDetails } from "@/apicall";

const useAddEditProduct = (id : String | undefined | null) => {
  const router = useRouter();
  const action = id ? 'Updat' : 'Creat'
  return useMutation({
    mutationFn: async (data : any) => {
      let response 
      if(id)

      response = await updateProductDetails(id,{...data,shopId : '668d44febf3fb97fe519f4f8'});
      else
      response = await createNewProduct({...data,shopId : '668d44febf3fb97fe519f4f8'})
      return response;
    },
    onMutate: () => {
      toast({
        title: `${action}ing Product... !"`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({
          title: `Product ${action}ion Failed !`,
          description:
            `We encountered an issue while ${action}ing your product. Please try again.`,
        });
      } else {
        toast({
          title: `Product ${action}ed !`,
          description: `Your product has been ${action}ed successfully.`,
        });
        // router.push("/products");
        router.refresh()
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

export default useAddEditProduct;
