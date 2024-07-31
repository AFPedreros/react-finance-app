import { Button } from "@nextui-org/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteAccount } from "../api/delete-account";
import { getAllAccountsQueryOptions } from "../api/get-accounts";
import { getTotalBalanceAccountsQueryOptions } from "../api/get-total-balance-accounts";

import { TrashIcon } from "@/components/ui/icons";

export const DeleteAccountButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAccount,
    onError: () => {
      toast.error("Error deleting account");
    },
    onSuccess: (deletedExpense) => {
      toast.success("Account deleted!");

      queryClient.setQueryData(
        getAllAccountsQueryOptions.queryKey,
        (existingAccounts) =>
          existingAccounts!.filter((account) => account.id !== Number(id)),
      );

      queryClient.setQueryData(
        getTotalBalanceAccountsQueryOptions.queryKey,
        (oldTotalBalance) => {
          const newBalance =
            Number(oldTotalBalance?.totalBalance) -
            Number(deletedExpense.balance);

          return { totalBalance: newBalance.toString() };
        },
      );
    },
  });

  return (
    <Button
      isIconOnly
      color="danger"
      disabled={mutation.isPending}
      isLoading={mutation.isPending}
      size="sm"
      startContent={!mutation.isPending && <TrashIcon size={18} />}
      variant="flat"
      onPress={() => mutation.mutate({ id: Number(id) })}
    />
  );
};
