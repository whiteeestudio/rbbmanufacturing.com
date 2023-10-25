import { motion } from "framer-motion";

import styles from "./Blob.module.scss";
import classNames from "classnames";

interface Props {
  width?: number;
  children?: string;
  className?: string;
}

const Blob: React.FC<Props> = ({ width, children, className }) => {
  return (
    <motion.a
      animate={{ scale: [1, 1, 1, 1.2, 1, 1, 1] }}
      transition={{ ease: "easeInOut", repeat: Infinity, duration: 2 }}
      className={classNames(styles["dot-logo"], className)}
      href="https://whiteee.space"
      target="_blank"
    />
  );
};

export default Blob;
