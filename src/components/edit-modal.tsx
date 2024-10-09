import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { cloneElement, Fragment, ReactElement, ReactNode } from "react";

import { PenIcon } from "@/components/icons";

type EditModalProps = {
  isLoading?: boolean;
  title: string;
  description: string;
  children: ReactNode;
};

export function EditModal({
  isLoading,
  title,
  description,
  children,
}: EditModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Fragment>
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
                <h1 className="text-xl">{title}</h1>
                <p className="text-small font-normal text-default-500">
                  {description}
                </p>
              </ModalHeader>
              {cloneElement(children as ReactElement, {
                onClose,
              })}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
