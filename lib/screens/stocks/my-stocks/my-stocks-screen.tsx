"use client";

import { PageHeader } from "@/lib/components";
import { DataTable } from "@/lib/tables/my-stocks/data-table";
import { columns } from "@/lib/tables/my-stocks/columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {   useAddEditDeleteClearStock  } from "@/lib/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";

export default function MyStocksScreen({ stocks, session }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const newParams = new URLSearchParams(searchParams);

  const handleEdit = ({ id }: any) => {
    router.push(`/add-stock/${id}`);
  };

  const { mutate: onSubmit } =   useAddEditDeleteClearStock ({
    shopId: session?.shopId,
    method: "DELETE",
  });

  console.log({ stocks });

  const handleDelte = ({id}: any) => onSubmit({ id,method : "DELETE" });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <PageHeader title={`My Stocks`} />
        <div className="flex items-center gap-4">
          {/* <Tabs
            defaultValue={
              newParams.get("dataStatus") === "DRAFT" ? "draft" : "stocks"
            }
            className="w-fit"
          >
            <TabsList className="h-11">
              <TabsTrigger
                value="stocks"
                onClick={() => {
                  newParams.delete("dataStatus","DRAFT");
                  router.replace(`${pathName}?${newParams.toString()}`);
                }}
                className="h-full"
              >
                Stocks
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                onClick={() => {
                  newParams.append("dataStatus", "DRAFT");
                  router.replace(`${pathName}?${newParams.toString()}`);
                }}
                className="h-full"
              >
                Drafts
              </TabsTrigger>
            </TabsList>
          </Tabs> */}
          <Button onClick={()=>router.push('/add-stock')}>
            <Icon name="Package" className="h-4 w-4 mr-2" />
            New Stock
          </Button>
        </div>
      </div>
      <DataTable
        data={stocks}
        columns={columns}
      />
    </div>
  );
}
