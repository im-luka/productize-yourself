import { RegisterFormValues } from "@/app/_components/auth/register-form";

export type RegisterData = Omit<RegisterFormValues, "confirmPassword">;
