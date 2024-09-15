import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { useDeleteAccount } from "../api/delete-account";

import { TrashIcon } from "@/components/icons";

type DeleteAccountButtonProps = {
  id: string;
  isLoading?: boolean;
};

export function DeleteAccountButton({
  id,
  isLoading,
}: DeleteAccountButtonProps) {
  const { mutate } = useDeleteAccount({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Account deleted!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  });

  return (
    <Button
      isIconOnly
      color="danger"
      disabled={isLoading}
      isLoading={isLoading}
      size="sm"
      startContent={!isLoading && <TrashIcon size={18} />}
      variant="flat"
      onPress={() => mutate({ id: Number(id) })}
    />
  );
}
