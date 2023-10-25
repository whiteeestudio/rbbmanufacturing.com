import classNames from "classnames";

import styles from "./Link.module.scss";

interface Props {
  className?: string;
}

const Link: React.FC<Props & React.HTMLProps<HTMLAnchorElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <a className={classNames(styles["link"], className)} {...props}>
      {children}
    </a>
  );
};

export default Link;
