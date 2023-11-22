import { StatusCode } from "@/domain/types/status-code";

export type ResponseData = {
  status: StatusCode;
  message?: string;
};
