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

export function CreateAccountDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        startContent={
          <PlusIcon className="hidden shrink-0 sm:block" size={18} />
        }
        variant="bordered"
        onPress={onOpen}
      >
        Add New
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <ModalHeader className="flex-col items-start gap-1 px-0">
                <h2 className="text-xl">New account.</h2>
                <p className="text-small font-normal text-default-500">
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
}
