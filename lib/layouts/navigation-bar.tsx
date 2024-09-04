import React, { useState } from "react";
import { BillTypes, MenuData } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib//icons";
import { useRouter } from "next/navigation";
import { ThemeSwitch, UserSettings } from "@/lib/components";
import { ToolTip } from "@/components/ui/tooltip";
import { useAddEditDeleteBill } from "@/lib/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const NavigationBar = ({ toggled, setToggle }: any) => {
  return (
    <div
      className={` hidden md:block transition-all duration-500 ease-in-out min-h-screen h-full w-full border-r ${
        toggled ? "max-w-16" : "max-w-56"
      }`}
    >
      <div className="flex flex-col justify-between h-screen">
        <div className={`${toggled ? "h-[75%]" : "h-[85%]"}`}>
          <TopBar toggled={toggled} />
          <div className="h-full overflow-y-auto hide-scrollbar">
            <MenuBar toggled={toggled} />
          </div>
        </div>
        <BottomBar toggled={toggled} setToggle={setToggle} />
      </div>
    </div>
  );
};

const TopBar = ({ toggled }: any) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: onSubmit } = useAddEditDeleteBill({ shopId: "" });

  return (
    <div className="border-b p-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full p-1" onClick={() => setOpen(true)}>
            <Icon
              name="SquarePlus"
              className={`w-5 h-5 ${toggled ? "" : "mr-2"}`}
            />
            {toggled ? null : "New Bill"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-2" align="start">
          <div className="grid gap-4"></div>
          {BillTypes?.map((item: any) => (
            <div
              onClick={() => router.push(`/new-bill?type=${item?.value}`)}
              className="text-sm hover:bg-muted cursor-pointer p-2 rounded-sm"
            >
              {item?.label}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

const MenuBar = ({ toggled }: any) => {
  const router = useRouter();
  return (
    <div className="divide-y">
      {MenuData?.map((data) => (
        <div key={data?.id}>
          {data?.sectionName && (
            <div className="flex justify-between px-2 pt-2">
              <div className="flex items-center gap-1 w-full">
                {toggled ? null : (
                  <Icon
                    name={data?.icon as any}
                    className="w-[14px] h-[14px] text-semibold"
                  />
                )}
                <p
                  className={`text-xs font-semibold ${
                    toggled ? "w-full text-center" : "text-left"
                  }`}
                >
                  {data?.sectionName}
                </p>
              </div>
              {/* {
                  data?.addPath &&
                  <div onClick={() => router.push(`${data?.addPath}`)} className="border p-1 rounded-full cursor-pointer">
                    <Icon name='Plus' className='w-2.5 h-2.5' />
                  </div>
                } */}
            </div>
          )}

          <div className="p-2 space-y-2">
            {data?.items?.map((item, index) =>
              toggled ? (
                <div
                  key={index}
                  onClick={() => router.push(`${item?.path}`)}
                  className={`flex items-center justify-center`}
                >
                  <ToolTip
                    side={"left"}
                    trigger={
                      <div
                        key={index}
                        onClick={() => router.push(`${item?.path}`)}
                        className={`hover:bg-secondary p-2 rounded-md cursor-pointer`}
                      >
                        <Icon
                          name={item?.icon as any}
                          className="w-[18px] h-[18px]"
                        />
                      </div>
                    }
                    content={<p>{item?.name}</p>}
                  />
                </div>
              ) : (
                <div
                  key={index}
                  onClick={() => router.push(`${item?.path}`)}
                  className={`flex items-center gap-2 hover:bg-secondary p-2 rounded-md cursor-pointer justify-start`}
                >
                  <Icon
                    name={item?.icon as any}
                    className="w-[18px] h-[18px]"
                  />
                  <p className="text-sm text-semibold">{item?.name}</p>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const BottomBar = ({ toggled, setToggle }: any) => {
  return (
    <div
      className={`flex gap-2 items-center border-t ${
        toggled
          ? "flex-col justify-center py-2"
          : "flex-row h-12 justify-between px-2"
      } bg-background`}
    >
      <div
        className={`flex gap-2 items-center ${
          toggled ? "flex-col" : "flex-row h-12"
        }`}
      >
        <UserSettings />
        <ThemeSwitch />
      </div>
      <div
        onClick={() => setToggle(!toggled)}
        className="border boder-border rounded-md p-1 cursor-pointer"
      >
        <Icon
          name={toggled ? "ArrowRightToLine" : ("ArrowLeftToLine" as any)}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
};
