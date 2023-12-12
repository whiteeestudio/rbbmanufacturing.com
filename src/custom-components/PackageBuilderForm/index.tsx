import Marquee from "react-fast-marquee";

import styles from "./styles.module.scss";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Fragment, useState } from "react";
import PackageForm from "./components/PackageForm";
import ContactForm from "./components/ContactForm";

enum FormStep {
  STEP_ONE,
  STEP_TWO,
}

const STEPS = [
  "send package and designs",
  "receive quote",
  "get sample",
  "iterate on design",
  "send order",
  "receive full shipment",
];

const PackageBuilderForm = () => {
  const { scrollY } = useScroll();
  const [marqueeOpacity, setMarqueeOpacity] = useState(1);
  const [currentStep, setCurrentStep] = useState(FormStep.STEP_ONE);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const opacity = Math.max(0, 1 - latest / 50);
    setMarqueeOpacity(opacity);
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          opacity: {
            duration: 0.5,
            delay: 1.25,
          },
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          opacity: {
            duration: 0.25,
          },
        },
      }}
      className={styles["container"]}
    >
      <Marquee
        className={styles["marquee"]}
        style={{ opacity: marqueeOpacity }}
        autoFill
        pauseOnHover
      >
        <div className={styles["steps"]}>
          {STEPS.map((step, idx) => (
            <Fragment key={step}>
              {idx !== 0 && (
                <img
                  src={`${process.env.PUBLIC_URL}/images/arrow.png`}
                  alt={"step"}
                />
              )}
              <p>{step}</p>
            </Fragment>
          ))}
        </div>
      </Marquee>
      {currentStep === FormStep.STEP_ONE ? (
        <PackageForm onNextStep={() => setCurrentStep(FormStep.STEP_TWO)} />
      ) : (
        <ContactForm onBack={() => setCurrentStep(FormStep.STEP_ONE)} />
      )}
    </motion.div>
  );
};

export default PackageBuilderForm;
