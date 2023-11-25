import { FC } from "react";
import { useController } from "react-hook-form";
import { Textarea, TextareaProps } from "@mantine/core";

type Props = TextareaProps & {
  name: string;
};

export const FormTextarea: FC<Props> = (props) => {
  const { field, error, restProps } = useFormTextarea(props);

  return <Textarea {...field} error={error?.message} {...restProps} />;
};

function useFormTextarea({ name, ...restProps }: Props) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { field, error, restProps };
}
