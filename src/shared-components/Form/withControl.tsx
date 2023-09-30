import { memo } from "react";
import {
  ControllerRenderProps,
  FieldError,
  useController,
  useFormContext,
} from "react-hook-form";

export interface BaseProps {
  name: string;
}

interface ControllerProps<TProps> {
  InputComponent: React.FC<TProps>;
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError;
  field: ControllerRenderProps;
  disabled?: boolean;
}

const Controller = memo(
  <TProps,>({
    InputComponent,
    field,
    error,
    invalid,
    isDirty,
    isTouched,
    ...otherProps
  }: ControllerProps<TProps>) => (
    <InputComponent
      {...(otherProps as any)}
      error={error?.message}
      {...field}
    />
  ),
  (prev, next) =>
    prev.error?.message === next.error?.message &&
    prev.invalid === next.invalid &&
    prev.isDirty === next.isDirty &&
    prev.isTouched === next.isTouched &&
    prev.field.value === next.field.value &&
    prev.disabled === next.disabled
);

export const withControl =
  <T extends React.FC<any>, TProps extends React.ComponentProps<T> & BaseProps>(
    InputComponent: T
  ): React.FC<TProps> =>
  ({ name, ...otherProps }: TProps) => {
    const { control, getFieldState, formState } = useFormContext<any>();
    const { field } = useController({ name, control });
    const fieldState = getFieldState(name, formState);

    return (
      <Controller
        InputComponent={InputComponent}
        field={field}
        {...fieldState}
        {...otherProps}
      />
    );
  };
