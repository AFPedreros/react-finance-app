"use client";

import { Button } from "@nextui-org/button";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { CreateAccountForm } from "./create-account-form";

import { Drawer } from "@/components/drawer";
import { PlusIcon } from "@/components/icons";

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
        startContent={<PlusIcon className="shrink-0" size={18} />}
        onPress={onOpen}
      >
        Add new
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <ModalHeader className="flex-col items-start gap-1 px-0">
                <h2 className="text-xl">New account.</h2>
                <p className="font-normal text-small text-default-500">
                  Add the name of your account.
                </p>
              </ModalHeader>
              <CreateAccountForm onClose={onClose} />
            </ModalBody>
          )}
        </ModalContent>
      </Drawer>
    </>
  );
};
