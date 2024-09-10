import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { UpdateAccountForm } from "./update-account-form";

import { PenIcon } from "@/components/icons";

type UpdateAccountModalProps = {
  balance: string;
  id: number;
  isLoading?: boolean;
  name: string;
};

export function UpdateAccountModal({
  balance,
  id,
  isLoading,
  name,
}: UpdateAccountModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        disabled={isLoading}
        isLoading={isLoading}
        size="sm"
        startContent={!isLoading && <PenIcon size={18} />}
        variant="flat"
        onPress={onOpen}
      />
      <Modal
        isOpen={isOpen}
        shouldBlockScroll={false}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <ModalHeader className="flex-col items-center gap-1 px-0 text-center">
                <h1 className="text-xl">Edit account.</h1>
                <p className="text-small font-normal text-default-500">
                  Add the details of the account you want to edit.
                </p>
              </ModalHeader>
              <UpdateAccountForm
                account={{ balance, id, name }}
                onClose={onClose}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
