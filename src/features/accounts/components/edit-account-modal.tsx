import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { EditAccountForm } from "./edit-account-form";

import { PenIcon } from "@/components/ui/icons";

export type EditAccountModalProps = {
  balance: string;
  id: number;
  name: string;
};

export const EditAccountModal = ({
  balance,
  id,
  name,
}: EditAccountModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        startContent={<PenIcon size={18} />}
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
              <EditAccountForm
                account={{ balance, id, name }}
                onClose={onClose}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
