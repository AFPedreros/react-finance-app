"use client";

import { Button } from "@nextui-org/button";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Fragment } from "react";

import { CreateTransactionForm } from "./create-transaction-form";

import { Drawer } from "@/components/drawer";
import { PlusIcon } from "@/components/icons";

export function CreateTransactionDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Fragment>
      <Button
        className="shrink-0"
        color="primary"
        endContent={<PlusIcon className="hidden shrink-0 sm:block" size={18} />}
        onPress={onOpen}
      >
        Add New
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <ModalHeader className="flex-col items-start gap-1 px-0">
                <h2 className="text-xl">New Transaction.</h2>
              </ModalHeader>
              <CreateTransactionForm onClose={onClose} />
            </ModalBody>
          )}
        </ModalContent>
      </Drawer>
    </Fragment>
  );
}
