import { useTranslations } from "next-intl";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { ResponseData } from "@/domain/types/response-data";
import { StatusCode } from "@/domain/types/status-code";
import { createElement } from "react";

export const useNotification = () => {
  const t = useTranslations("notification");

  const notify = ({ status, message }: ResponseData) => {
    const isSuccess = status === StatusCode.Success;

    notifications.show({
      message: t(`${isSuccess ? "success" : "error"}.${message ?? "general"}`),
      color: isSuccess ? "green" : "red",
      icon: createElement(isSuccess ? IconCheck : IconX),
      withBorder: true,
    });
  };

  return { notify };
};
