import React, { SyntheticEvent } from "react";
import styles from "./Option.module.scss";
import classNames from "classnames";

interface Props {
  id: string;
  label: string;
  description?: string;
  value: string;
  onChange: (e: SyntheticEvent) => void;
  onBlur: (e: SyntheticEvent) => void;
  name: string;
  isRadio?: boolean;
}

const Option = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, description, isRadio, ...restOfProps }, ref) => {
    return (
      <div className={styles["container"]}>
        <input
          id={id}
          type={isRadio ? "radio" : "checkbox"}
          className={classNames(styles["checkbox"], {
            [styles["checkbox--no-description"]]: !description,
          })}
          ref={ref}
          {...restOfProps}
        />
        <label htmlFor={id} className={styles["label-container"]}>
          <span className={styles["label"]}>{label}</span>
          <span className={styles["description"]}>{description}</span>
        </label>
      </div>
    );
  },
);

export default Option;
