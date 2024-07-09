"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { CreateAccountForm } from "./create-account-form";
import { PlusIcon } from "./icons";

export const CreateAccountModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="w-full md:w-fit"
        color="primary"
        // disabled={mutation.isPending}
        // isLoading={mutation.isPending}
        size="sm"
        startContent={<PlusIcon size={18} />}
        variant="flat"
        onPress={onOpen}
      >
        Add new
      </Button>
      <Modal
        isOpen={isOpen}
        shouldBlockScroll={false}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <ModalHeader className="flex-col items-start gap-1 px-0">
                <h1 className="text-xl">New account.</h1>
                <p className="font-normal text-small text-default-500">
                  Add the name of your account.
                </p>
              </ModalHeader>
              <CreateAccountForm onClose={onClose} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
