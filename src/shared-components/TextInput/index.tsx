import classNames from "classnames";

import styles from "./TextInput.module.scss";
import { forwardRef } from "react";

interface Props {
  label: string;
  isOptional?: boolean;
  className?: string;
  error?: string;
}

const TextInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props & React.HTMLProps<HTMLInputElement>
> = ({ label, className, isOptional, error, ...props }, ref) => (
  <div className={classNames(styles["container"], className)}>
    <label
      className={classNames(styles["label"], {
        [styles["label--error"]]: !!error,
      })}
    >
      {label} {isOptional && <p>(optional)</p>}
    </label>
    <div className={styles["input-container"]}>
      <input
        ref={ref}
        className={classNames(styles["text-input"], {
          [styles["text-input--error"]]: !!error,
        })}
        {...props}
      />
      {error && <p className={styles["error"]}>{error}</p>}
    </div>
  </div>
);

export default forwardRef(TextInput);
