import { LoginFormValues } from "@/app/_components/auth/login-form";
import { RegisterFormValues } from "@/app/_components/auth/register-form";

export type RegisterData = Omit<RegisterFormValues, "confirmPassword">;

export type LoginData = LoginFormValues;
