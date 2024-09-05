import { Modal, ModalProps } from "@nextui-org/modal";

export function Drawer({ ...props }: ModalProps) {
  return (
    <Modal
      backdrop="opaque"
      className="h-dvh max-h-screen w-full max-w-sm rounded-md"
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
}
