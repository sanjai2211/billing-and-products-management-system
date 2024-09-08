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
import { Icon } from "@/lib/icons";
import { CreatePDFDocument, TemplateList } from "@/lib/templates";
import { numberToWords } from "@/lib/utils-helper/calculation/numberToWord";
import { exportToPdf } from "@/lib/utils-helper/export/pdf";
import { PDFViewer } from "@react-pdf/renderer";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ViewBillTemplate({ billDetails }: any) {
  console.log({ billDetails });
  const [template, setTemplate] = useState(TemplateList["TAX_INVOICE"][0]);
   const {theme } = useTheme()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon name="Eye" className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full p-0">
        <SheetHeader className="flex justify-between">
          <SheetTitle>Bill</SheetTitle>
          <div>
            <div
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
            >
              Download
            </div>
          </div>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>
        {/* <div className="border ">
          <div className="p-2">
            <p className="text-center">{billDetails?.Shop?.name}</p>
            <div className="flex justify-between w-full">
              <div className="w-full">
                <p className="text-xs">
                  {" "}
                  {billDetails?.Shop?.address?.addressLine1},
                </p>
                <p className="text-xs">
                  {" "}
                  {billDetails?.Shop?.address?.addressLine2},
                </p>
                <p className="text-xs"> {billDetails?.Shop?.address?.city},</p>
                <p className="text-xs"> {billDetails?.Shop?.address?.state},</p>
                <p className="text-xs">
                  India - {billDetails?.Shop?.address?.zip}
                </p>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex gap-2 justify-end w-full">
                  <p className="text-xs">Telephone :</p>
                  <p className="text-xs">{billDetails?.Shop?.phoneNumbers}</p>
                </div>
                <div className="flex gap-2 justify-end w-full">
                  <p className="text-xs">Email :</p>
                  <p className="text-xs">{billDetails?.Shop?.phoneNumbers}</p>
                </div>
                <div className="flex gap-2 justify-end w-full">
                  <p className="text-xs">Website :</p>
                  <p className="text-xs">{billDetails?.Shop?.phoneNumbers}</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className=" flex justify-between items-center border-y p-2">
            <div className="flex gap-1 justify-center">
              <p className="font-bold text-sm">GSTIN :</p>
              <p className="text-sm">{billDetails?.gstIn || "GST123456789"}</p>
            </div>
            <p className="font-bold text-center">{billDetails.type}</p>
            <p className="text-xs">Original for Recepient</p>
          </div>
          <div className="flex justify-between gap-1">
            <CustomerDetailsSection />
            <OtherDetailsSection />
          </div>
          <div>
            <table className="w-full">
              <thead className="border divide divide-x">
                <th className="text-xs py-1">S.No</th>
                <th className="text-xs py-1">Description</th>
                <th className="text-xs py-1">HSN/SAC</th>
                <th className="text-xs py-1">Qty</th>
                <th className="text-xs py-1">Rate</th>
                <th className="text-xs py-1">Tax</th>
                <th className="text-xs py-1">Amount</th>
              </thead>
              <tbody className="w-full">
                {billDetails?.items?.map((item: any, index: any) => (
                  <tr>
                    <td className="text-xs">{index + 1}</td>
                    <td className="text-xs">{item?.product?.printName}</td>
                    <td className="text-xs">{item?.product?.hsnCode}</td>
                    <td className="text-xs">{item?.quantity}</td>
                    <td className="text-xs">{item?.cost.toFixed(2)}</td>
                    <td className="text-xs">{item?.quantity.toFixed(2)}</td>
                    <td className="text-xs">
                      {(item?.quantity * item?.cost).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="border divide divide-x">
                  <td className="text-xs"></td>
                  <td className="text-xs">Total</td>
                  <td className="text-xs"></td>
                  <td className="text-xs">154</td>
                  <td className="text-xs">5656</td>
                  <td className="text-xs">455</td>
                  <td className="text-xs">{(5648).toFixed(2)}</td>
                </tr>
              
              </tbody>
            </table>
          </div>

          <div>
            <div></div>
            <div className="flex justify-between ">
              <div className="w-full">
                <div className="border">
                  <p className="text-xs font-bold text-center w-full border">
                    Bank Details
                  </p>
                  <BankDetailsSection />
                </div>
                <div className="space-y-1 px-2 py-1">
                  <p className="text-xs">Total Taxable Amount in Words</p>
                  <p className="text-xs font-bold">
                    {numberToWords(456972)} only
                  </p>
                </div>
              </div>
              <div className="divide divide-y divide-x w-[40%] space-y-0.5">
                <div className="flex gap-1">
                  <p className="text-xs">Total Taxable Amount : </p>
                  <p className="text-xs text-right">49765.00</p>
                </div>
                <div className="flex gap-1 opacity-50">
                  <p className="text-xs">Total IGST </p>
                  <p className="text-xs text-right">49765.00</p>
                </div>
                <div className="flex gap-1 opacity-50">
                  <p className="text-xs">Total IGST </p>
                  <p className="text-xs text-right">49765.00</p>
                </div>
                <div className="flex gap-1 opacity-50">
                  <p className="text-xs">Total IGST </p>
                  <p className="text-xs text-right">49765.00</p>
                </div>
                <div className="flex gap-1">
                  <p className="text-xs">Total GST Amount : </p>
                  <p className="text-xs text-right">49765.00</p>
                </div>
                <div className="flex gap-1">
                  <p className="text-xs">Round Off : </p>
                  <p className="text-xs text-right">- 40</p>
                </div>
                <div className="flex gap-1 py-2">
                  <p className="text-xs">Net Amount : </p>
                  <p className="text-xs text-right">225687</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between divide divide-x w-full">
            <div className="flex gap-2 border w-full p-1">
              <p className="text-xs">E. & O. E. :</p>
              <p className="text-xs" contentEditable></p>
            </div>
            <div className="flex gap-2 border w-full p-1">
              <p className="text-xs">Remarks :</p>
              <p className="text-xs" contentEditable></p>
            </div>
          </div>
          <div className="flex justify-between divide divide-x w-full">
            <div className="flex gap-2 border w-full p-1">
              <p className="text-xs">Terms & Conditions</p>
              <p className="text-xs" contentEditable></p>
            </div>
            <div className="divide divide-y border w-full">
              <div className="p-1">
              <p className="text-[10px] text-center">
                Certified that the above information are true and correct
              </p>
              <p className="text-xs text-center">
                For {billDetails?.Shop?.name.toUpperCase()},
              </p>
              

              </div>
              <div className="h-12">

              </div>
              <div className="border p-1">
                <p className="text-xs text-right">&#40; Authorised Signature &#41;</p>

              </div>
             
              <p className="text-xs text-right"></p>
            </div>
          </div>
        </div> */}

        <PDFViewer
          style={{ width: "100%", height: "100%", backgroundColor: "red" }}
          showToolbar={false}
        >
          <CreatePDFDocument
            data={[billDetails]}
            template={template?.template}
            theme={theme}
          />
        </PDFViewer>

        {/* <SheetFooter className="">
          <div className="p-2">
            {TemplateList["TAX_INVOICE"]?.map((item: any) => (
              <div className="border p-6 rounded-md gap-4"></div>
            ))}
          </div>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
