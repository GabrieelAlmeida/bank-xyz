import axios from "axios";
import { loginUserFormData, UserLoginResponse } from "../interfaces/user.interface";

export default {
    user: {
        async login(userToLogin: loginUserFormData): Promise<UserLoginResponse> {
            return (await axios.post("/loginApi/default/login", userToLogin)).data;
        }
    }
}