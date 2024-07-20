import React from "react";
import { Icon } from "@/lib/icons";
import { DeleteAlert } from "./alerts/delete-alert";

const EditDeleteContainer = ({
  handleEdit = () => {},
  handleDelete = () => {},
  className,
  hideEdit = false,
  hideDelete = false,
  alertDelete = true,
  details,
  id,
  data
}: any) => {
  return (
    <div
      className={`absolute right-0 flex items-center justify-center gap-2 w-28 bg-background h-full ${className}`}
    >
      {!hideEdit && (
        <div
          className="rounded-full border p-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => handleEdit({id,data})}
        >
          <Icon name="Pencil" className="w-4 h-4" />
        </div>
      )}
      {!hideDelete ? (
        alertDelete ? (
          <DeleteAlert
            handleDelete={handleDelete}
            details={{ ...details, id }}
          />
        ) : (
          <div
            className="text-destructive rounded-full border p-2 hover:bg-muted/50 cursor-pointer"
            onClick={() => handleDelete(id)}
          >
            <Icon name="Trash2" className="w-4 h-4" />
          </div>
        )
      ) : null}
    </div>
  );
};

export default EditDeleteContainer;
