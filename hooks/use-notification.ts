import { useTranslations } from "next-intl";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { ResponseData } from "@/domain/types/response-data";
import { StatusCode } from "@/domain/types/status-code";
import { createElement } from "react";
import { useRouter } from "@/navigation";

export const useNotification = () => {
  const t = useTranslations("notification");
  const { replace } = useRouter();

  const notify = (
    { status, message }: ResponseData,
    successRedirectPath?: string
  ) => {
    const isSuccess = status === StatusCode.Success;

    notifications.show({
      message: t(`${isSuccess ? "success" : "error"}.${message ?? "general"}`),
      color: isSuccess ? "green" : "red",
      icon: createElement(isSuccess ? IconCheck : IconX),
      withBorder: true,
    });

    if (successRedirectPath && isSuccess) {
      replace(successRedirectPath);
    }
  };

  return { notify };
};
