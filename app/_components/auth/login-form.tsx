"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Stack, Text, Title } from "@mantine/core";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormTextInput } from "../base/text-input";
import { Link } from "../base/link";
import { paths } from "@/navigation/paths";

export const LoginForm: FC = () => {
  const { t, loginForm } = useLoginForm();

  return (
    <Card maw={600} p="xl">
      <FormProvider {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(() => console.log("submitted"))}>
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
              <Button type="submit">{t("form.submitAction")}</Button>
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

  const tValidation = useTranslations("validation");
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tValidation("required"))),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { t, loginForm };
};

type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
const loginSchema = (required: string) =>
  z.object({
    email: z.string().email().min(1, required),
    password: z.string().min(1, required),
  });
