export const EdgeCase = ({ heading, subHeading }: any) => {
  return (
    <div className="flex flex-col flex-1 gap-4 justify-center h-full items-center">
      <h1 className="text-bold text-xl text-center">{heading}</h1>
      <p className="text-center opacity-50">{subHeading}</p>
    </div>
  );
};
