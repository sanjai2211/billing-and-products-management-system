import { Badge } from "@/components/ui/badge";

export const getColor = (field: any, value: any) => {
  switch (field) {
    case "customerType":
      if (value === "SUPPLIER") return "voilet";
      else if (value === "AGENT") return "orange";
      else if (value === "CUSTOMER") return "rose";
      else return "red";
    case "type":
      if (value === "QUOTATION") return "voilet";
      else if (value === "TAX_INVOICE") return "amber";
      else if (value === "BILL") return "rose";
      else return "red";
    case "paymentTerms":
      if (value === "CASH") return "green";
      else if (value === "CREDIT") return "orange";
      else return "red";
    case "totalValue":
      if (value <= 0) return "red";
      else if (value < 50) return "orange";
      else if (value >= 150 && value <= 300) return "yellow";
      else return "green";
    default:
      return "gray";
  }
};

export const getValues = (value: any, data: any) => {
  const type = data?.find((item: any) => item?.value === value)?.label;
  return type;
};

export const getBadge = (field: any, value: any, data: any) => {
  const type = data?.find((item: any) => item?.value === value)?.label;

  const color = getColor(field, value);
  const className = `border-${color}-500 border text-${color}-500 hover:bg-background bg-background border-2 text-center`;

  return <Badge className={className}>{type || "-"}</Badge>;
};
