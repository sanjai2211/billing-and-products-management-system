import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export const EditDeleteIconContainer = ({
  handleEdit = () => {},
  handleDelete = () => {},
  hideEdit = false,
  hideDelete = false,
}: any) => {
  return (
    <div className="flex gap-2">
      <Button size="icon" type="button" onClick={handleEdit}>
        <Icon name="Pencil" className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleDelete}
        type="button"
      >
        <Icon name="CircleX" className="h-5 w-5" />
      </Button>
    </div>
  );
};

