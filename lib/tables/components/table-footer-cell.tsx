export const TableFooterCell = ({ heading, value,valueColor }: any) => {
  return (
    <div className="flex flex-col justify-between gap-1">
        <p></p>
      <p className="text-xs opacity-50 h-4">{heading}</p>
      <p className={`text-base font-bold text-${valueColor}-500`}>{value}</p>
    </div>
  );
};
