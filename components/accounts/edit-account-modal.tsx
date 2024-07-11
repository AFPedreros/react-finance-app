"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { EditAccountForm } from "./edit-account-form";

import { PenIcon } from "@/components/icons";

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
                <h1 className="text-xl">Edit expense.</h1>
                <p className="font-normal text-small text-default-500">
                  Add the details of the expense you want to edit.
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
