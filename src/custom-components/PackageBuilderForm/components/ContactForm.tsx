import { SubmitHandler, useForm } from "react-hook-form";

import styles from "../styles.module.scss";
import { FormValues } from "types/types";
import Button from "shared-components/Button";
import { useRecoilState, useResetRecoilState } from "recoil";
import formState from "states/formState";
import TextInput from "shared-components/TextInput";
import TextAreaInput from "shared-components/TextAreaInput";
import classNames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  `${process.env.REACT_APP_SUPABASE_URL}`,
  `${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
);

interface ContactFormProps {
  onBack?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onBack }) => {
  const [formData] = useRecoilState(formState);
  const resetFormData = useResetRecoilState(formState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object<Partial<FormValues>>({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    company: yup.string(),
    website: yup.string(),
    instagram: yup.string(),
    comment: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<FormValues>>({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Partial<FormValues>> = async (formData) => {
    const allData = { ...formData, ...formData };
    setIsLoading(true);

    const { data } = await supabase.functions.invoke("contact-email", {
      body: allData,
    });

    if (data && data.id) {
      setIsSuccess(true);
      resetFormData();
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className={styles["sent"]}>
        <p>Package inquiry has been sent!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classNames(styles["content"], styles["content--step-2"])}>
        <div>
          <h3>
            Fill in your contact information and some optional details about
            your brand.
          </h3>

          <div className={styles["inputs-container"]}>
            <TextInput
              label={"name"}
              className={styles["text-input"]}
              placeholder="name..."
              error={errors.name?.message}
              {...register("name", { required: true })}
            />
            <TextInput
              label={"email"}
              className={styles["text-input"]}
              placeholder="email..."
              error={errors.email?.message}
              {...register("email", { required: true })}
            />
            <TextInput
              label={"phone"}
              className={styles["text-input"]}
              placeholder="phone..."
              error={errors.phone?.message}
              {...register("phone", { required: true })}
            />
            <TextInput
              label={"company"}
              className={styles["text-input"]}
              placeholder="company..."
              {...register("company")}
              isOptional
            />
            <TextInput
              label={"website"}
              className={styles["text-input"]}
              placeholder="website..."
              {...register("website")}
              isOptional
            />
            <TextInput
              label={"instagram"}
              className={styles["text-input"]}
              placeholder="instagram..."
              {...register("instagram")}
              isOptional
            />
          </div>
        </div>

        <div>
          <h3>Add any comments on deadlines, product details, etc.</h3>
          <div className={styles["inputs-container"]}>
            <TextAreaInput {...register("comment")} />
          </div>
        </div>

        <div className={styles["button-container"]}>
          <Button
            variant="secondary"
            className={styles["button"]}
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            className={styles["button"]}
            disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
