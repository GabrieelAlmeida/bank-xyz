import { z } from "zod";
import { loginUserFormSchema } from "../pages/Login/validationSchema/loginUserFormSchema";

export interface User {
    id?: number,
    name: string,
    email: string
}

export interface UserLoginResponse {
    token: string;
    user: User;
}

export type loginUserFormData = z.infer<typeof loginUserFormSchema>;