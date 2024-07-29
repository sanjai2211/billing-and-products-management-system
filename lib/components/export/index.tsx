import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icons";
import JSZip from "jszip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MainView } from "./main-view";
import { useState } from "react";
import { objectSize } from "@/lib/utils-helper/object";
import { Badge } from "@/components/ui/badge";
import { exportToExcel } from "@/lib/utils-helper/export/excel";
import { exportToJson } from "@/lib/utils-helper/export/json";
import { exportToCsv } from "@/lib/utils-helper/export/csv";
import { createDownloadUrl } from "@/lib/utils-helper/export/create-download-url";
import { Checkbox } from "@/components/ui/checkbox";
import { GeneralLayout } from "./export-components";
import { exportToPdf } from "@/lib/utils-helper/export/pdf";
import { FieldSettings } from "./field-settings";

export function ExportButton({ data, exportData }: any) {
  const sections = data?.section;
  const [selectedOptions, setSelectedOptions] = useState({}) as any;
  const [currentOption, setCurrentOption] = useState(null) as any;
  const [zipDownload, setZipDownload] = useState(true);
  const [openGeneralSettings, setOpenGeneralSettings] = useState(false);

  const handleOptionSelected = ({ type, selectedData, parent }: any) => {
    let updatedField = { ...selectedOptions };

    if (selectedOptions?.hasOwnProperty(parent?.id)) {
      if (type === "check") {
        if (selectedOptions[parent?.id]?.hasOwnProperty(selectedData?.id)) {
          const { [selectedData?.id]: removed, ...rest } =
            updatedField[parent?.id];
          updatedField[parent?.id] = rest;
        } else {
          updatedField[parent?.id] = {
            ...updatedField[parent?.id],
            [selectedData?.id]: { ...selectedData },
          };
        }
      } else {
        if (selectedOptions[parent?.id]?.hasOwnProperty(selectedData?.id)) {
          const { [selectedData?.id]: removed, ...rest } =
            updatedField[parent?.id];
          updatedField[parent?.id] = rest;
        } else {
          updatedField[parent?.id] = {
            [selectedData?.id]: { ...selectedData },
          };
        }
      }
    } else {
      updatedField[parent?.id] = {
        [selectedData?.id]: { ...selectedData },
      };
    }
    setSelectedOptions(updatedField);
  };

  const handleDownload = async () => {
    const zip = zipDownload ? new JSZip() : null;
    const promises: any = [];

    Object.entries(selectedOptions)?.forEach(([key, value]: any) => {
      const props = { data: exportData, exportOptions: value, zip };

      if (key === "excel") promises.push(exportToExcel(props));
      else if (key === "csv") promises.push(exportToCsv(props));
      else if (key === "pdf") promises.push(exportToPdf(props));
      else if (key === "json") promises.push(exportToJson(props));
    });

    await Promise.all(promises);

    if (zip) {
      const blob = await zip.generateAsync({ type: "blob" });
      createDownloadUrl({ blob, fileName: "download.zip" });
    }
  };

  const TabIndicator = ({ item }: any) => {
    if (
      selectedOptions?.hasOwnProperty(item?.id) &&
      objectSize(selectedOptions?.[item?.id])
    ) {
      return (
        <div className="flex gap-2 items-center">
          {item?.component === "radio" ? (
            <Icon name={"CircleCheckBig"} className="w-5 h-5 text-green-500" />
          ) : (
            <Badge className="border-green-500 bg-background text-green-500 hover:bg-background px-1.5">
              {objectSize(selectedOptions?.[item?.id])}
            </Badge>
          )}
          <Icon name={"CircleX"} className="w-3 h-3 text-red-500" />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Icon
            name="Download"
            className="w-4 h-4 mr-2 rounded-l-md rounded-r-none rounded-none"
          />
          Export
        </Button>
      </SheetTrigger>

      <SheetContent className=" md:w-[75%] xl:w-[50%] w-full p-0">
        <Tabs
          defaultValue="account"
          className="flex h-full"
          orientation="vertical"
        >
          <TabsList className="flex flex-col gap-4 justify-start items-start w-40 bg-background h-full py-2 border-r rounded-r-none px-0">
            {sections?.map((item: any) => (
              <TabsTrigger
                value={item?.id}
                className="flex gap-2 justify-between w-full"
              >
                <div className="flex gap-1">
                  <Icon name={item?.icon} className="w-4 h-4 mr-2" />
                  {item?.name}
                </div>
                <TabIndicator item={item} />
              </TabsTrigger>
            ))}
            <div className="w-full border" />
            {/* <div className="mx-2">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setOpenGeneralSettings(true)}
              >
                <Icon name={"Settings"} className="w-4 h-4 mr-2" />
                Settings
              </div>
            </div>
            <div className="w-full border" /> */}

            <div className="flex items-center justify-center gap-4 w-full">
              <Checkbox
                id="terms"
                className=""
                checked={zipDownload}
                onClick={() => setZipDownload(!zipDownload)}
              />
              <label htmlFor="terms" className="text-xs">
                Download as ZIP
              </label>
            </div>

            <div className="flex items-center gap-2 mx-2">
              <Button
                variant="destructive"
                onClick={() => setSelectedOptions({})}
                size="icon"
              >
                <Icon name={"CircleX"} className="w-5 h-5" />
              </Button>

              <Button onClick={() => handleDownload()}>Download</Button>
            </div>
          </TabsList>
          {/* <GeneralLayout
            title="Settings"
            description="General settings spaces to have the default setting for your component."
          ></GeneralLayout> */}
          {sections?.map((item: any) => (
            <TabsContent
              value={item?.id}
              className="w-full h-full overflow-y-auto"
            >
              <GeneralLayout
                title="Settings"
                description="General settings spaces to have the default setting for your component."
              >
                {currentOption ? (
                  <FieldSettings
                    data={currentOption}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    setCurrentOption={setCurrentOption}
                  />
                ) : (
                  <MainView
                    data={item}
                    handleOptionSelected={handleOptionSelected}
                    selectedOptions={selectedOptions}
                    setCurrentOption={setCurrentOption}
                  />
                )}
              </GeneralLayout>
            </TabsContent>
          ))}
        </Tabs>
        {currentOption && <div></div>}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
