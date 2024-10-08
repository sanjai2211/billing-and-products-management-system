"use client";

import { PageHeader } from "@/lib/components";
import { DataTable } from "@/lib/tables/my-customers/data-table";
import { columns } from "@/lib/tables/my-customers/columns";
import { useRouter } from "next/navigation";
import { useAddEditDeleteCustomer, useAddEditDeleteProduct } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";

export default function MyCustomersScreen({ customers, session }: any) {
  // const colData = getProductColumns(session?.shopId)
  const router = useRouter();
  const handleEdit = ({ id }: any) => {
    console.log(id);
    router.push(`/add-customer/${id}`);
  };

  const { mutate: onSubmit } = useAddEditDeleteCustomer({
    shopId: session?.shopId,
    method: "DELETE",
  });

  const handleDelte = (id: String) => onSubmit({ customerId: id });
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <PageHeader title={`My Parties`} />
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/add-customer")}>
            <Icon name="User" className="h-4 w-4 mr-2" />
            New Party
          </Button>
        </div>
      </div>
      <DataTable
        data={customers}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelte}
      />
    </div>
  );
}
