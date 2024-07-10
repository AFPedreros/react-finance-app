import { Modal, type ModalProps } from "@nextui-org/modal";

export const Drawer = ({ ...props }: ModalProps) => {
  return (
    <Modal
      backdrop="opaque"
      className="w-full max-w-sm max-h-screen rounded-md h-dvh"
      classNames={{
        wrapper: "flex justify-end",
      }}
      isOpen={props.isOpen}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 50,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      placement="center"
      scrollBehavior="inside"
      size="full"
      onOpenChange={props.onOpenChange}
    >
      <>{props.children}</>
    </Modal>
  );
};
