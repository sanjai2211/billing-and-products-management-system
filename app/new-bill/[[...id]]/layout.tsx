"use client";

import { PageHeader } from "@/lib/components";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Layout({ children, add, details, table }: any) {
  const [currentTab, setCurretTab] = useState("bill");

  return (
    <main className="flex  flex-col justify-between max-h-screen h-full overflow-y-scroll hide-scrollbar">
      {/* <div className="flex flex-1 h-full flex-col gap-4">
        <div className="flex md:flex-row flex-col justify-between">
          <PageHeader title={`New Bill`} />
          <div className="flex items-center gap-2 h-full ">
            {children}
            <Tabs defaultValue="bill" className="w-fit">
              <TabsList className="h-11">
                <TabsTrigger
                  value="bill"
                  onClick={() => setCurretTab("bill")}
                  className="h-full"
                >
                  Bill
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  onClick={() => setCurretTab("details")}
                  className="h-full"
                >
                  Details
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button type="submit" className="flex items-center gap-2 ">
              <p>Create Bill</p>
              <Icon name="ClipboardPlus" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {currentTab === "bill" ? (
          <div className="flex md:flex-row flex-col  justify-between gap-4">
            {table}
            <div className="w-80">{add}</div>
          </div>
        ) : (
          details
        )}
      </div> */}
      {children}
    </main>
  );
}
