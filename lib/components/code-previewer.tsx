import { ToolTip } from "@/components/ui/tooltip";

export const CodePreviewer = ({ code, content, isDraft }: any) => {
  if (!code && !isDraft) {
    return null;
  }

  if (isDraft) {
    return (
      <p className="text-base border border-amber-50 px-4 py-2 rounded-sm cursor-pointer text-amber-400">
        Draft
      </p>
    );
  }

  return (
    <ToolTip
      trigger={
        <p className="text-xl border px-2 py-1.5 rounded-md cursor-pointer">
          {code}
        </p>
      }
      content={content}
    />
  );
};
