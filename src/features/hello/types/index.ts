import { z } from "zod";

import { getHelloQueryOptions } from "../api/get-hello";
import { updateHelloFormSchema } from "../schemas";

import { QueryConfig } from "@/lib/react-query";

export type UseHelloOptions = {
  queryConfig?: QueryConfig<typeof getHelloQueryOptions>;
  message: string;
};

export type UpdateHelloForm = z.infer<typeof updateHelloFormSchema>;
