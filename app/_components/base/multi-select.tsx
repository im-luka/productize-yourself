import { FC } from "react";
import { useController } from "react-hook-form";
import { MultiSelect, MultiSelectProps } from "@mantine/core";

type Props = MultiSelectProps & {
  name: string;
};

export const FormMultiSelect: FC<Props> = (props) => {
  const { field, error, restProps } = useFormMultiSelect(props);

  return <MultiSelect {...field} error={error?.message} {...restProps} />;
};

function useFormMultiSelect({ name, ...restProps }: Props) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { field, error, restProps };
}
