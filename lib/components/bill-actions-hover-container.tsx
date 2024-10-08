import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { ViewBillTemplate } from "./bill-template";
import { getBillData } from "../utils-helper/screens/getBillData";
import { handlePrintBill } from "../utils-helper/export/print-bill";
import { exportToPdf } from "../utils-helper/export/pdf";
import TemplateOne from "../templates/tax-invoice/template-1";

export const BillActions = ({ data }: any) => {
  const buttonProps: any = {
    variant: "outline",
    size: "icon",
    type: "button",
    className: "rounded-full",
  };

  const billData = getBillData(data);

  const handlePrintBills = () => handlePrintBill({ data: billData });

  const handleDownloadBill = async () =>
    await exportToPdf({
      data: [billData],
      exportOptions: [
        {
          templateId: "billTemplate",
          pdfNameField: "billNumber",
          template: TemplateOne,
        },
      ],
    });

    if(data?.dataStatus === 'IN_PROGRESS'){
      return null
    }

  return (
    <div className="sticky right-0">
      <div className="flex gap-2 p-4 bg-background h-full">
        <ViewBillTemplate billDetails={billData} download={true} />
        <Button {...buttonProps} onClick={handlePrintBills}>
          <Icon name="Printer" className="h-4 w-4" />
        </Button>
        <Button {...buttonProps} onClick={handleDownloadBill}>
          <Icon name="Download" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
