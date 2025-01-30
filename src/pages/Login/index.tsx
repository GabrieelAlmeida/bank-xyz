import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserFormSchema } from "./validationSchema/loginUserFormSchema";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUserFormData } from "../../interfaces/user.interface";
import { useEffect } from "react";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, []);

  async function handleLogin(user: loginUserFormData) {
    try {
      await login(user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-brand-dark-background-500 flex h-screen w-[50vw] flex-col items-center justify-center space-y-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Access your account
        </h1>

        <p className="text-muted-foreground text-brand-font-dark-300 text-sm">
          Manage your finances easily and securely with our internet banking!!
        </p>
      </div>

      <form
        className="flex w-80 flex-col items-center justify-center space-y-6"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Your e-mail"
            className="border-brand-dark-background-100 focus:border-brand-purple-300 h-10 rounded border-2 px-4 focus:outline-none"
            {...register("email")}
          />
          {errors?.email && (
            <span className="text-brand-red text-sm">
              {errors?.email?.message}
            </span>
          )}
        </div>

        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            className="border-brand-dark-background-100 focus:border-brand-purple-300 h-10 rounded border-2 px-4 focus:outline-none"
            {...register("password")}
          />
          {errors?.password && (
            <span className="text-brand-red text-sm">
              {errors?.password?.message}
            </span>
          )}
        </div>

        <button
          className="bg-brand-purple-300 hover:bg-brand-purple-200 h-10 w-full rounded font-semibold hover:cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
}
