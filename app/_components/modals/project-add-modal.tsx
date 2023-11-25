import { useNotification } from "@/hooks/use-notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, GridCol, Modal, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormTextInput } from "../base/text-input";
import { FormTextarea } from "../base/textarea";
import { createProject } from "@/domain/actions/projects";
import { useSession } from "next-auth/react";
import { StatusCode } from "@/domain/types/status-code";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ProjectAddModal: FC<Props> = (props) => {
  const { t, isOpen, onClose, projectForm, isSubmitting, onSubmit } =
    useProjectAddModal(props);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Text size="xl" fw={600} c="primary">
          {t("title")}
        </Text>
      }
    >
      <FormProvider {...projectForm}>
        <form onSubmit={onSubmit}>
          <Stack>
            <Grid>
              <GridCol span={10}>
                <FormTextInput
                  name="name"
                  label={t("nameLabel")}
                  placeholder={t("namePlaceholder")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={2}>
                <FormTextInput
                  name="emoji"
                  label={t("emojiLabel")}
                  placeholder={t("emojiPlaceholder")}
                />
              </GridCol>
              <GridCol span={12}>
                <FormTextInput
                  name="excerpt"
                  label={t("excerptLabel")}
                  placeholder={t("excerptPlaceholder")}
                />
              </GridCol>
              <GridCol span={12}>
                <FormTextarea
                  name="description"
                  label={t("descriptionLabel")}
                  placeholder={t("descriptionPlaceholder")}
                />
              </GridCol>
            </Grid>
            <Button type="submit" loading={isSubmitting}>
              {t("submitAction")}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Modal>
  );
};

function useProjectAddModal({ isOpen, onClose }: Props) {
  const t = useTranslations("modal.project");
  const { data } = useSession();
  const { notify } = useNotification();

  const tValidation = useTranslations("validation");
  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema(tValidation("required"))),
    defaultValues: {
      name: "",
      emoji: "",
      excerpt: "",
      description: "",
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    reset,
    formState: { isSubmitting },
  } = projectForm;

  const handleSubmit = async ({
    name,
    emoji,
    description,
    excerpt,
  }: ProjectFormValues) => {
    const response = await createProject({
      name,
      emoji: emoji ?? null,
      excerpt: excerpt ?? null,
      description: description ?? null,
      users: data?.user?.id ? [data?.user?.id] : [],
    });
    notify(response);
    if (response.status === StatusCode.Success) {
      onClose();
      reset();
    }
  };

  return {
    t,
    isOpen,
    onClose,
    projectForm,
    isSubmitting,
    onSubmit: formHandleSubmit(handleSubmit),
  };
}

export type ProjectFormValues = z.infer<ReturnType<typeof projectSchema>>;
const projectSchema = (required: string) =>
  z.object({
    name: z.string().min(1, required),
    emoji: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
  });
