import { z } from "zod";
import { loginUserFormSchema } from "../validationSchema/loginUserFormSchema";

export type loginUserFormData = z.infer<typeof loginUserFormSchema>;