import { AnimatePresence, motion } from "framer-motion";

import styles from "./styles.module.scss";
import Button from "shared-components/Button";
import { useCallback, useState } from "react";
import { useWindowView } from "utils/use-window-view";
import PackageBuilderForm from "custom-components/PackageBuilderForm";

const Landing = () => {
  const [isMarketingShown, setIsMarketingShown] = useState(true);
  const { isTablet } = useWindowView();

  const onClick = useCallback(() => {
    setIsMarketingShown(false);
  }, []);

  return (
    <>
      <motion.div className={styles["container"]}>
        <Button
          variant="tertiary"
          onClick={() => {
            setIsMarketingShown(true);
          }}
          className={styles["logo"]}
        >
          <p>© RBB manufacturing</p>
        </Button>
        <AnimatePresence mode="wait">
          {isMarketingShown && (
            <motion.div
              transition={{ ease: "easeInOut", duration: 1 }}
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: isTablet
                  ? "calc(100dvh - 90px)"
                  : "calc(100dvh - 113px)",
                opacity: 1,
                transition: {
                  height: {
                    ease: "easeInOut",
                    duration: 1,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 1,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    ease: "easeInOut",
                    duration: 1,
                    delay: 0.25,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              }}
              className={styles["content"]}
            >
              <div className={styles["catchphrase-container"]}>
                <h1 className={styles["catchphrase"]}>
                  Everything made by one supplier
                </h1>
                <p className={styles["description"]}>
                  Have a design for your collection but don't know how to make
                  it? With a network of 50 reliable manufacturers, we can
                  produce all of your designs at a low cost, low MOQ and with
                  fast shipping speed.
                </p>
                <Button onClick={onClick}>Get started</Button>
              </div>
              <div className={styles["carousel"]}></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {!isMarketingShown && <PackageBuilderForm />}
      </AnimatePresence>
    </>
  );
};

export default Landing;
