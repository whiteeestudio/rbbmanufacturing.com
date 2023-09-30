import { useCallback, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";

import styles from "./Blob.module.scss";
import classNames from "classnames";

interface Props {
  width?: number;
  children?: string;
  className?: string;
}

const Blob: React.FC<Props> = ({ width, children, className }) => {
  const [scope, animate] = useAnimate();
  const [startRepeatAnimation, setStartRepeatAnimation] = useState(true);

  const handleHoverStart = useCallback(() => {
    animate(
      scope.current,
      { scale: [1], width: [36, width ?? 180], borderRadius: [50, 20] },
      { ease: "easeInOut", duration: 0.5 }
    );
    animate(
      "div",
      { opacity: [0, 0, 0, 1] },
      { ease: "easeInOut", duration: 0.5 }
    );
  }, [animate, scope, width]);

  const handleHoverEnd = useCallback(async () => {
    animate(
      scope.current,
      { scale: [1], width: [width ?? 180, 36], borderRadius: [20, 50] },
      { ease: "easeInOut", duration: 0.5 }
    );
    animate(
      "div",
      { opacity: [1, 0, 0, 0] },
      { ease: "easeInOut", duration: 0.5 }
    ).then(() => {
      setStartRepeatAnimation(true);
    });
  }, [animate, scope, width]);

  useEffect(() => {
    if (startRepeatAnimation) {
      animate("div", { opacity: [0] });
      animate(
        scope.current,
        { scale: [1, 1, 1, 1.2, 1, 1, 1], width: [36], borderRadius: [50] },
        { ease: "easeInOut", repeat: Infinity, duration: 2 }
      );
      setStartRepeatAnimation(false);
    }
  }, [animate, scope, startRepeatAnimation]);

  return (
    <div
      ref={scope}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      className={classNames(styles["dot-logo"], className)}
    >
      <div
        className={styles["logo-text"]}
        style={{ opacity: 0, marginRight: 15 }}
      >
        {children}
      </div>
    </div>
  );
};

export default Blob;
