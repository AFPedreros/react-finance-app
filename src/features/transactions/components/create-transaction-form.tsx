import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import { getOrCreateUUID } from "@/lib/utils";

type CreateTransactionFormProps = {
  onClose: () => void;
};

export function CreateTransactionForm({ onClose }: CreateTransactionFormProps) {
  const userId = getOrCreateUUID();

  // const { mutate } = useCreateTransaction({
  //   mutationConfig: {
  //     onSuccess: () => {
  //       toast.success("Transaction created!");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   },
  // });

  // const {
  //   formState: { isValid, isSubmitting, dirtyFields, errors },
  //   control,
  //   handleSubmit,
  //   reset,
  // } = useForm<CreateTransactionInputs>({
  //   resolver: zodResolver(createTransactionFormSchema),
  //   defaultValues: {
  //     name: "",
  //     color: "#000000",
  //     icon: "",
  //     type: "expense",
  //   },
  //   mode: "onChange",
  // });

  function onSubmit(values: any) {
    // eslint-disable-next-line no-console
    console.log(values, userId);
    // const data = {
    //   ...values,
    //   userId,
    // };

    // mutate({ data });
    // reset();
    onClose();
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
      // onSubmit={handleSubmit(onSubmit)}
      onSubmit={onSubmit}
    >
      <Divider className="my-2" />
      <Button
        fullWidth
        color="primary"
        // isDisabled={!isValid || isSubmitting}
        // isLoading={isSubmitting}
        type="submit"
      >
        {/* {isSubmitting ? "Creating" : "Create"} */}
        Create
      </Button>
    </form>
  );
}
