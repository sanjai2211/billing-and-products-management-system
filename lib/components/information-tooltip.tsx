import React from "react";
import { ToolTip } from "@/components/ui/tooltip";

interface InformationTooltipProps {
  side?: string;
  content: string | JSX.Element; // Define content prop as string or JSX.Element
}

const InformationTooltip: React.FC<InformationTooltipProps> = ({
  side = "top",
  content,
}) => {
  const renderContent = () => {
    if (typeof content === "string") {
      return (
        <p className="text-xs opacity-50 flex items-center gap-2">
          {content}
        </p>
      );
    }
    return content; // Return JSX element directly if it's not a string
  };

  return (
    <ToolTip
      side={side}
      align="end"
      trigger={
        <p className="w-4 h-4 text-[8px] text-center font-bold rounded-full border cursor-pointer">
          i
        </p>
      }
      content={renderContent()} // Render content based on its type
    />
  );
};

export default InformationTooltip;
