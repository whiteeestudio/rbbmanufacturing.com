import {
  FormProvider,
  FieldValues,
  FormProviderProps,
  SubmitHandler,
} from "react-hook-form";
import classNames from "classnames";
import TextInputComponent from "../TextInput";
import TextAreaInputComponent from "../TextAreaInput";

import styles from "./Form.module.scss";
import { withControl } from "./withControl";

export type FormProps<TFieldValues extends FieldValues> =
  FormProviderProps<TFieldValues> & {
    onSubmit: SubmitHandler<TFieldValues>;
  } & Pick<React.ComponentPropsWithoutRef<"form">, "className">;

export const Form = <TFieldValues extends FieldValues>({
  className,
  onSubmit,
  children,
  handleSubmit,
  ...formProviderProps
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider handleSubmit={handleSubmit} {...formProviderProps}>
      <form
        className={classNames(styles["form-container"], className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export const TextInput = withControl(TextInputComponent);
export const TextAreaInput = withControl(TextAreaInputComponent);
