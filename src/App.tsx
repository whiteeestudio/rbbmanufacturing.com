import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { createClient } from "@supabase/supabase-js";

import Button from "./shared-components/Button";
import { Form, TextInput, TextAreaInput } from "./shared-components/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./App.module.scss";
import Blob from "./shared-components/Blob";
import { useCallback, useMemo, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";

interface FormDataValues {
  name: string;
  subject: string;
  email: string;
  message: string;
}
const supabase = createClient(
  `${process.env.REACT_APP_SUPABASE_URL}`,
  `${process.env.REACT_APP_SUPABASE_ANON_KEY}`
);

const App = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const schema = useMemo(
    () =>
      yup
        .object()
        .shape({
          name: yup.string().required("name is required"),
          subject: yup.string().required("subject is required"),
          email: yup
            .string()
            .email("please enter a valid email.")
            .required("email is required"),
          message: yup.string().required("message is required"),
        })
        .required(),
    []
  );

  const methods = useForm<FormDataValues>({
    resolver: yupResolver(schema),
  });
  const { reset } = methods;

  const onSubmit = useCallback(
    async (formValues: FormDataValues) => {
      const token = await recaptchaRef?.current?.executeAsync();
      console.log(token);
      console.log(formValues);

      const { data } = await supabase.functions.invoke("contact-email", {
        body: {
          reCaptchaToken: token,
          from: formValues.email,
          to: "info@rbbmanufacturing.com",
          ...formValues,
        },
      });

      recaptchaRef?.current?.reset();

      if (data && data.done) {
        setIsError(false);
        setIsSuccess(true);
        reset();
      } else {
        setIsError(true);
        setIsSuccess(false);
      }
    },
    [reset]
  );

  return (
    <>
      <div className={styles["header"]}>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 2 }}
          className={styles["logo"]}
          src={`${process.env.PUBLIC_URL}/RBB-logo.svg`}
          alt={"rbb-manufacturing-logo"}
        />
      </div>
      <div className={styles["container"]}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          badge="bottomleft"
          sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY!}
        />
        <Form {...methods} className={styles["form"]} onSubmit={onSubmit}>
          <TextInput label="name" name={"name"} />
          <TextInput label="email" name={"email"} />
          <TextInput label="subject" name={"subject"} />
          <TextAreaInput label="message" name={"message"} rows={1} />
          <Button type="submit" className={styles["button"]}>
            send message
          </Button>
          {isSuccess && (
            <p
              className={classNames(
                styles["message"],
                styles["message--success"]
              )}
            >
              your message has been sent!
            </p>
          )}
          {isError && (
            <p
              className={classNames(
                styles["message"],
                styles["message--error"]
              )}
            >
              your message could not be sent. please email us directly at
              info@rbbmanufacturing.com.
            </p>
          )}
        </Form>
      </div>
      <Blob className={styles["blob"]} width={275}>
        info@rbbmanufacturing.com
      </Blob>
    </>
  );
};

export default App;
