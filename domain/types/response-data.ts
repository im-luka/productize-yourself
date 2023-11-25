import { StatusCode } from "@/domain/types/status-code";

export type ResponseData<T = void> = {
  status: StatusCode;
  message?: string;
  data?: T;
};
