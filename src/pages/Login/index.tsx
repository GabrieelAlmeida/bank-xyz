import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserFormSchema } from "./validationSchema/loginUserFormSchema";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUserFormData } from "../../interfaces/user.interface";
import { useEffect } from "react";
import { Logo } from "../../components/Logo";

export function Login() {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<loginUserFormData>({
        resolver: zodResolver(loginUserFormSchema)
    });

    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if(isAuthenticated) navigate("/dashboard");
    }, []);

    async function handleLogin(user: loginUserFormData) {
        try {
            await login(user);
            navigate('/dashboard');
            
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <main className="h-full w-full">
            <div className="flex justify-between text-brand-font-dark-100">
                <Logo />

                <div className="flex flex-col justify-center items-center space-y-8 w-[50vw] h-screen bg-brand-dark-background-500">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                        Access your account
                        </h1>
                        <p className="text-sm text-muted-foreground text-brand-font-dark-300">
                            Manage your finances easily and securely with our internet banking!!
                        </p>
                    </div>

                    <form className="space-y-6 flex flex-col items-center justify-center w-80" onSubmit={handleSubmit(handleLogin)}>
                        <div className="space-y-2 flex flex-col w-full">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="Your e-mail" 
                                className="h-10 rounded border-2 border-brand-dark-background-100 focus:outline-none focus:border-brand-purple-300 px-4"
                                {...register("email")}
                            />
                            {errors?.email && <span className="text-sm text-brand-red">{errors?.email?.message}</span>}
                        </div>

                        <div className="space-y-2 flex flex-col w-full">
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="Your password" 
                                className="h-10 rounded border-2 border-brand-dark-background-100 focus:outline-none focus:border-brand-purple-300 px-4"
                                {...register("password")}
                            />
                            {errors?.password && <span className="text-sm text-brand-red">{errors?.password?.message}</span>}
                        </div>

                        <button 
                            className="w-full bg-brand-purple-300 font-semibold rounded h-10 hover:bg-brand-purple-200 hover:cursor-pointer" 
                            type="submit"
                            disabled={isSubmitting}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}