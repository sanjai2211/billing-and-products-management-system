import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  createBill,
  createNewProduct,
  deleteProduct,
  updateBill,
  updateProductDetails,
} from "@/apicall";

const useAddEditDeleteBill = ({ billId, method }: any) => {
  const router = useRouter();
  const action =
    method === "PATCH"
      ? "Updat"
      : method === "FINAL" || "CREATE"
      ? "Creat"
      : "Delet";
  return useMutation({
    mutationFn: async (data: any) => {
      const {
        id,
        shopId,
        bankId,
        name,
        phoneNumbers,
        email,
        gstIn,
        addressLine1,
        addressLine2,
        city,
        state,
        Bank,
        Customer,
        zip,
        bankName,
        address,
        accountNumber,
        branchName,
        ifscCode,
        faxNumber,
        createdAt,
        updatedAt,
        customerId,
        items,
        ...rest
      } = data;

      const customer = {
        id: name?.value,
        name: name?.label,
        phoneNumbers: name?.label,
        email: name?.label,
        gstIn: name?.label,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          zip,
        },
      };

      let response;

      const datas = {
        ...rest,
        customerId: name?.value,
        bankId: bankName?.value,
        shopId,
      };

      if (method === "PATCH" || method === "FINAL") {
        response = await updateBill(billId, datas);
        console.log({ response });
      } else if (method === "DELETE") response = await deleteProduct(billId);
      else
        response = await createBill({
          shopId,
          ...rest,
        });
      return response;
    },
    onMutate: () => {
      toast({
        title: `${action}ing Bill... !`,
        description: "We are processing your request. Please wait a moment.",
      });
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast({
          title: `Bill ${action}ion Failed !`,
          description: `We encountered an issue while ${action}ing your product. Please try again.`,
        });
      } else {
        if (action === "Creat") router.push(`/new-bill/${data?.id}`);
        else router.refresh();
        toast({
          title: `Bill ${action}ed !`,
          description: `Your Bill has been ${action}ed successfully.`,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Bill Creation Failed !",
        description:
          error?.error ||
          "We encountered an issue while creating your Bill. Please try again.",
      });
    },
  });
};

export default useAddEditDeleteBill;
