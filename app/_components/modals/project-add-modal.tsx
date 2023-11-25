import { useNotification } from "@/hooks/use-notification";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ComboboxData,
  Grid,
  GridCol,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormTextInput } from "../base/text-input";
import { FormTextarea } from "../base/textarea";
import { createProject } from "@/domain/actions/projects";
import { useSession } from "next-auth/react";
import { StatusCode } from "@/domain/types/status-code";
import { User } from "@prisma/client";
import { FormMultiSelect } from "../base/multi-select";
import { PROJECT_EMOJI_PLACEHOLDER } from "@/util/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
};

export const ProjectAddModal: FC<Props> = (props) => {
  const {
    t,
    isOpen,
    onClose,
    projectForm,
    isSubmitting,
    userMapper,
    onSubmit,
  } = useProjectAddModal(props);

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
                <FormMultiSelect
                  name="users"
                  label={t("teamLabel")}
                  placeholder={t("teamPlaceholder")}
                  data={userMapper}
                  searchable
                  clearable
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

function useProjectAddModal({ isOpen, onClose, users }: Props) {
  const t = useTranslations("modal.project");
  const { notify } = useNotification();
  const { data } = useSession();
  const userId = data?.user?.id;

  const tValidation = useTranslations("validation");
  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema(tValidation("required"))),
    defaultValues: {
      name: "",
      emoji: "",
      excerpt: "",
      description: "",
      users: [],
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    reset,
    formState: { isSubmitting },
  } = projectForm;

  const userMapper: ComboboxData = users
    .filter((user) => user.id !== userId)
    .map((user) => ({
      value: user.id,
      label: t("user", { firstName: user.firstName, lastName: user.lastName }),
    }));

  const handleSubmit = async ({
    name,
    emoji,
    excerpt,
    description,
    users,
  }: ProjectFormValues) => {
    const response = await createProject({
      name,
      emoji: emoji || PROJECT_EMOJI_PLACEHOLDER,
      excerpt: excerpt || null,
      description: description || null,
      users: [userId!, ...(users ?? [])],
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
    userMapper,
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
    users: z.string().array().optional(),
  });
