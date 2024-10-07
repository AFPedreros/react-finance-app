import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { TrashIcon } from "@/components/icons";

type DeleteButtonProps<T> = {
  id: T;
  isLoading?: boolean;
  onDelete: (id: T) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
};

export function DeleteButton<T>({
  id,
  isLoading,
  onDelete,
  successMessage = "Item deleted!",
  errorMessage = "Error deleting item",
}: DeleteButtonProps<T>) {
  const handleDelete = async () => {
    try {
      await onDelete(id);
      toast.success(successMessage);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      isIconOnly
      color="danger"
      disabled={isLoading}
      isLoading={isLoading}
      size="sm"
      startContent={!isLoading && <TrashIcon size={18} />}
      variant="flat"
      onPress={handleDelete}
    />
  );
}
