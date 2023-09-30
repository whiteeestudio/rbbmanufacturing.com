import classNames from "classnames";

import styles from "./TextInput.module.scss";
import { forwardRef } from "react";

interface Props {
  label?: string;
  className?: string;
  error?: string;
}

const TextInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props & React.HTMLProps<HTMLInputElement>
> = ({ label, className, error, ...props }, ref) => (
  <div className={classNames(styles["container"], className)}>
    {label && (
      <label
        className={classNames(styles["label"], {
          [styles["label--error"]]: !!error,
        })}
      >
        {label}
      </label>
    )}
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
