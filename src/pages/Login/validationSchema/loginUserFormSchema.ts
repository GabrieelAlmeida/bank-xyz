import { string, z } from "zod";

export const loginUserFormSchema = z.object({
    email: string().nonempty("E-mail is required!").email("E-mail invalid!"),
    password: string().nonempty("Password is required!")
});