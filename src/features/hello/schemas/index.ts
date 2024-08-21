import { z } from "zod";

export const updateHelloFormSchema = z.object({
  message: z
    .string()
    .min(3, { message: "Message must be at least 3 characters" }),
});
