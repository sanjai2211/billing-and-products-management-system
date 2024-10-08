import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RecordType } from "@/lib/constants";
import { Icon } from "@/lib/icons";
import { CreatePDFDocument, TemplateList } from "@/lib/templates";
import { numberToWords } from "@/lib/utils-helper/calculation/numberToWord";
import { exportToPdf } from "@/lib/utils-helper/export/pdf";
import { handlePrintBill } from "@/lib/utils-helper/export/print-bill";
import { PDFViewer } from "@react-pdf/renderer";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ViewBillTemplate({ billDetails, title = "View Bill",download=false }: any) {
  console.log({ billDetails });
  const [template, setTemplate] = useState(TemplateList["TAX_INVOICE"][0]);
  const { theme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Icon name="Eye" className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full p-4  space-y-4">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <SheetClose>
                <div className="border rounded-md p-1 cursor-pointer">
                  <Icon name="ChevronLeft" />
                </div>
              </SheetClose>
              <SheetTitle>
                View {(RecordType as any)[billDetails?.type]}
              </SheetTitle>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={async () =>
                  await exportToPdf({
                    data: [billDetails],
                    exportOptions: [
                      {
                        templateId: "billTemplate",
                        pdfNameField: "billNumber",
                        template: template?.template,
                      },
                    ],
                  })
                }
                variant="outline"
                size={"icon"}
                disabled={!billDetails?.items?.length}
              >
                <Icon name="Download" className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handlePrintBill({ data: billDetails })}
                variant="outline"
                size={"icon"}
                disabled={!billDetails?.items?.length}
              >
                <Icon name="Printer" className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>

        <div className=" pb-14 h-full">
          <PDFViewer
            style={{
              width: "100%",
              height: "100%",
              paddingVertical: "54px",
              marginVertical: "20px",
            }}
            showToolbar={false}
          >
            <CreatePDFDocument
              data={[billDetails]}
              template={template?.template}
              theme={theme}
              download={download}
            />
          </PDFViewer>
        </div>
      </SheetContent>
    </Sheet>
  );
}
