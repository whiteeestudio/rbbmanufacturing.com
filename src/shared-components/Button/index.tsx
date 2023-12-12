import classNames from "classnames";

import styles from "./styles.module.scss";

interface Props {
  variant?: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
}

const Button: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  variant = "primary",
  className,
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles["button"],
        styles[`button--${variant}`],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
