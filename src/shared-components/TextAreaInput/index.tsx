import classNames from "classnames";

import styles from "./TextAreaInput.module.scss";
import { forwardRef, useRef, useState } from "react";
import useAutosizeTextArea from "../../utils/use-auto-resize-text-area";
import mergeRefs from "merge-refs";

interface Props {
  label?: string;
  className?: string;
  error?: string;
}

const TextAreaInput: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props & React.HTMLProps<HTMLTextAreaElement>
> = ({ label, className, onChange, error, ...props }, ref) => {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
    onChange?.(evt);
  };

  return (
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
        <textarea
          ref={mergeRefs(textAreaRef, ref)}
          onChange={handleChange}
          className={classNames(styles["text-area-input"], {
            [styles["text-area-input--error"]]: !!error,
          })}
          value={value}
          {...props}
        />
        {error && <p className={styles["error"]}>{error}</p>}
      </div>
    </div>
  );
};

export default forwardRef(TextAreaInput);
