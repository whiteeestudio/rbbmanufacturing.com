import classNames from "classnames";

import styles from "./Title.module.scss";

interface Props {
  className?: string;
  variant: "h1" | "h2" | "h3" | "h4" | "h5";
  children: string;
}

const Heading: React.FC<Props & React.HTMLProps<HTMLHeadingElement>> = ({
  variant,
  className,
  children,
  ...props
}) => {
  const Heading = variant;
  return (
    <Heading className={classNames(styles["header"], className)} {...props}>
      {children}
    </Heading>
  );
};

export default Heading;
