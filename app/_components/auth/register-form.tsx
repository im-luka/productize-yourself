"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Grid, GridCol, Stack, Text, Title } from "@mantine/core";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormTextInput } from "../base/text-input";
import { Link } from "../base/link";
import { paths } from "@/navigation/paths";
import { register } from "@/domain/actions/auth";
import { useNotification } from "@/hooks/use-notification";

export const RegisterForm: FC = () => {
  const { t, registerForm, isSubmitting, onSubmit } = useRegisterForm();

  return (
    <Card maw={600} p="xl">
      <FormProvider {...registerForm}>
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
            <Grid gutter="xs">
              <GridCol span={6}>
                <FormTextInput
                  name="firstName"
                  label={t("form.firstNameLabel")}
                  placeholder={t("form.firstNamePlaceholder")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={6}>
                <FormTextInput
                  name="lastName"
                  label={t("form.lastNameLabel")}
                  placeholder={t("form.lastNamePlaceholder")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={12}>
                <FormTextInput
                  name="email"
                  type="email"
                  label={t("form.emailLabel")}
                  placeholder={t("form.emailPlaceholder")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={12}>
                <FormTextInput
                  name="password"
                  type="password"
                  label={t("form.passwordLabel")}
                  placeholder={t("form.passwordPlaceholder")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={12}>
                <FormTextInput
                  name="confirmPassword"
                  type="password"
                  label={t("form.confirmPasswordLabel")}
                  placeholder={t("form.confirmPasswordPlaceholder")}
                  withAsterisk
                />
              </GridCol>
            </Grid>
            <Stack gap="sm">
              <Button type="submit" loading={isSubmitting}>
                {t("form.submitAction")}
              </Button>
              <Text size="xs" ta="center">
                {t.rich("haveAccountLink", {
                  link: (chunk) => (
                    <Link href={paths.login()} c="blue">
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

const useRegisterForm = () => {
  const t = useTranslations("register");
  const { notify } = useNotification();

  const tValidation = useTranslations("validation");
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(
      registerSchema(
        tValidation("required"),
        tValidation("confirmPassword"),
        tValidation("minPassword")
      )
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    formState: { isSubmitting },
  } = registerForm;

  const handleSubmit = async (values: RegisterFormValues) => {
    const response = await register(values);
    notify(response, paths.login());
  };

  return {
    t,
    registerForm,
    isSubmitting,
    onSubmit: formHandleSubmit(handleSubmit),
  };
};

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
const registerSchema = (
  required: string,
  confirmPassword: string,
  minPassword: string
) =>
  z
    .object({
      firstName: z.string().min(1, required),
      lastName: z.string().min(1, required),
      email: z.string().email().min(1, required),
      password: z.string().min(1, required).min(8, minPassword),
      confirmPassword: z.string(),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: confirmPassword,
      path: ["confirmPassword"],
    });
