"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { Button, Card, Stack, Text, Title } from "@mantine/core";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormTextInput } from "../base/text-input";
import { Link } from "../base/link";
import { paths } from "@/navigation/paths";
import { useNotification } from "@/hooks/use-notification";
import { ResponseData } from "@/domain/types/response-data";
import { StatusCode } from "@/domain/types/status-code";

export const LoginForm: FC = () => {
  const { t, loginForm, isSubmitting, onSubmit } = useLoginForm();

  return (
    <Card maw={600} p="xl">
      <FormProvider {...loginForm}>
        <form onSubmit={onSubmit}>
          <Stack>
            <Title order={3} ta="center">
              {t.rich("form.title", {
                s: (chunk) => (
                  <Text fz={36} fw={700} c="primary" span>
                    {chunk}
                  </Text>
                ),
              })}
            </Title>
            <Stack gap="xs">
              <FormTextInput
                name="email"
                type="email"
                label={t("form.emailLabel")}
                placeholder={t("form.emailPlaceholder")}
                withAsterisk
              />
              <FormTextInput
                name="password"
                type="password"
                label={t("form.passwordLabel")}
                placeholder={t("form.passwordPlaceholder")}
                withAsterisk
              />
            </Stack>
            <Stack gap="sm">
              <Button type="submit" loading={isSubmitting}>
                {t("form.submitAction")}
              </Button>
              <Text size="xs" ta="center">
                {t.rich("createAccountLink", {
                  link: (chunk) => (
                    <Link href={paths.register()} c="blue">
                      {chunk}
                    </Link>
                  ),
                })}
              </Text>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
};

const useLoginForm = () => {
  const t = useTranslations("login");
  const { notify } = useNotification();

  const tValidation = useTranslations("validation");
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tValidation("required"))),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    formState: { isSubmitting },
  } = loginForm;

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    const responseData: ResponseData = {
      status: response?.ok ? StatusCode.Success : StatusCode.Error,
      message: response?.ok ? "login" : response?.error ?? undefined,
    };
    notify(responseData, paths.home());
  };

  return {
    t,
    loginForm,
    isSubmitting,
    onSubmit: formHandleSubmit(handleSubmit),
  };
};

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
const loginSchema = (required: string) =>
  z.object({
    email: z.string().email().min(1, required),
    password: z.string().min(1, required),
  });
