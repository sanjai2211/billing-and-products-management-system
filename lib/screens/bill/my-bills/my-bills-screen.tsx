"use client";

import { ExportButton, PageHeader } from "@/lib/components";
import { columns } from "@/lib/tables/bills/columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAddEditDeleteProduct } from "@/lib/hooks";
import { DataTable } from "@/lib/tables/bills/data-table";
import { ExportOptionsMyBills } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyBillsScreen({ bills, session }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const newParams = new URLSearchParams(searchParams);
  const handleEdit = ({ id }: any) => {
    router.push(`/new-bill/${id}`);
  };

  const { mutate: onSubmit } = useAddEditDeleteProduct({
    shopId: session?.shopId,
    method: "DELETE",
  });

  const sectionName: any = {
    BILL: "Bill",
    TAX_INVOICE: "Invoice",
    QUOATATION: "Quoation",
    DRAFT: "Draft",
  };

  const param = newParams.get("dataStatus");

  const handleDelte = (id: String) => onSubmit({ productId: id });
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <PageHeader title={`My Bills`} />
        <div className="flex gap-2">
          <Tabs
            defaultValue={newParams.get("dataStatus") || "all"}
            className="w-fit"
          >
            <TabsList className="h-11">
              <TabsTrigger
                value="all"
                onClick={() => {
                  newParams.delete("dataStatus", "DRAFT");
                  newParams.delete("type");
                  router.replace(`${pathName}?${newParams.toString()}`);
                }}
                className="h-full"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="TAX_INVOICE"
                onClick={() => {
                  newParams.delete("dataStatus", "DRAFT");
                  newParams.set("type", "TAX_INVOICE");
                  router.replace(`${pathName}?${newParams.toString()}`);
                }}
                className="h-full"
              >
                Invoices
              </TabsTrigger>
              <TabsTrigger
                value="BILL"
                onClick={() => {
                  newParams.delete("dataStatus", "DRAFT");
                  newParams.set("type", "BILL");
                  router.replace(`${pathName}?${newParams.toString()}`);
                }}
                className="h-full"
              >
                Bills
              </TabsTrigger>
              <TabsTrigger
                value="QUOTATION"
                onClick={() => {
                  newParams.delete("dataStatus", "DRAFT");
                  newParams.set("type", "QUOTATION");
                  router.replace(`${pathName}?${newParams.toString()}`);
                }}
                className="h-full"
              >
                Quotations
              </TabsTrigger>
              <TabsTrigger
                value="DRAFT"
                onClick={() => {
                  newParams.append("dataStatus", "DRAFT");
                  newParams.delete("type");
                  router.replace(`${pathName}?${newParams.toString()}`);
                }}
                className="h-full"
              >
                Drafts
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {/* <ExportButton data={ExportOptionsMyBills} exportData={bills} /> */}
        </div>
      </div>

      <DataTable
        data={bills}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelte}
      />
    </div>
  );
}
