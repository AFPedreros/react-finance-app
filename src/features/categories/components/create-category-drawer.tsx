"use client";

import { Button } from "@nextui-org/button";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Fragment } from "react";

import { CreateCategoryForm } from "./create-category-form";

import { Drawer } from "@/components/drawer";
import { PlusIcon } from "@/components/icons";

export function CreateCategoryDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Fragment>
      <Button
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
                <h2 className="text-xl">New Category.</h2>
                <p className="text-small font-normal text-default-500">
                  Add the name of your category.
                </p>
              </ModalHeader>
              <CreateCategoryForm onClose={onClose} />
            </ModalBody>
          )}
        </ModalContent>
      </Drawer>
    </Fragment>
  );
}
