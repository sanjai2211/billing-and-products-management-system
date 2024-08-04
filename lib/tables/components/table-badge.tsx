import { Badge } from "@/components/ui/badge";

const colorClasses = {
  voilet: "border-violet-500 text-violet-500",
  orange: "border-orange-500 text-orange-500",
  rose: "border-rose-500 text-rose-500",
  red: "border-red-500 text-red-500",
  amber: "border-amber-500 text-amber-500",
  gray: "border-gray-500 text-gray-500",
  green: "border-green-500 text-green-500",
  yellow: "border-yellow-500 text-yellow-500",
  purple : "border-purple-500 text-purple-500"
};

export const getColor = (field: any, value: any) => {
  switch (field) {
    case "customerType":
      if (value === "SUPPLIER") return "voilet";
      if (value === "AGENT") return "orange";
      if (value === "CUSTOMER") return "green";
      return "red";
    case "type":
      if (value === "QUOTATION") return "voilet";
      if (value === "TAX_INVOICE") return "amber";
      if (value === "BILL") return "purple";
      return "red";
    case "dataStatus":
      if (value === "COMPLETED") return "voilet";
      if (value === "NOT_COMPLETED") return "amber";
      return "gray";
    case "paymentTerms":
      if (value === "CASH") return "green";
      if (value === "CREDIT") return "orange";
      return "red";
    case "totalValue":
      if (value <= 0) return "red";
      if (value < 50) return "orange";
      if (value >= 150 && value <= 300) return "yellow";
      return "green";
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
  const color = getColor(field, value) as any;
  const colorClass = (colorClasses as any)[color];

  return (
    <Badge className={`${colorClass} border-2 text-center hover:bg-background bg-background`}>
      {type || "-"}
    </Badge>
  );
};
