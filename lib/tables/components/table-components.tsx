import { ShowDetails } from "@/lib/components";
import { getColor } from "./table-badge";

export const TotalValue = ({ total }: any) => {
  const color = getColor("totalValue", total);
  return <div className={`text-${color}-500`}>&#8377; {total.toFixed(2)}</div>;
};

export const PeopleDetails = ({ data, people = "Customer" }: any) => {
  if (!data) {
    return <p className="text-sm w-28">No {people} data</p>;
  }

  const { address, id, shopId, bankId, createdAt, updatedAt, ...rest } = data;
  const displayData = {
    ...rest,
    address: address?.addressLine1
      ? `${address?.addressLine1},<br/>${address?.addressLine2},<br/>${address?.city},<br/>${address?.state},<br/>India - ${address?.zip}`
      : "-",
  };

  return (
    <div className="flex justify-between items-center gap-4 w-[240px]">
      <div className="flex flex-col gap-1">
        <p className="text-sm">{rest?.customerName}</p>
        <p className="text-xs opacity-50">{rest?.phoneNumbers}</p>
      </div>
      <ShowDetails title={`${people} Details`} data={displayData} />
    </div>
  );
};

export const BankDetails = ({ data, title = "Bank Details" }: any) => {
  if (!data) {
    return <p className="text-sm w-28">No Bank data</p>;
  }

  const { id, shopId, customerId, createdAt, updatedAt, ...rest } = data;

  return (
    <div className="flex justify-between items-center gap-4 w-[240px]">
      <div className="flex flex-col gap-1">
        <p className="text-sm">{rest?.bankName}</p>
        <p className="text-xs opacity-50">{rest?.branchName}</p>
      </div>
      <ShowDetails title={title} data={rest} />
    </div>
  );
};
