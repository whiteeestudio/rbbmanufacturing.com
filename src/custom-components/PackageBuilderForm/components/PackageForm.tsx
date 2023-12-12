import { SubmitHandler, useForm } from "react-hook-form";

import styles from "../styles.module.scss";
import {
  Embellishment,
  FormValues,
  ProductCategory,
  Quantity,
} from "types/types";
import Option from "shared-components/Option";
import { EMBELLISHMENT, PRODUCT_CATEGORY, QUANTITY } from "utils/const/const";
import Button from "shared-components/Button";
import { useRecoilState } from "recoil";
import formState from "states/formState";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface PackageFormProps {
  onNextStep?: () => void;
}

const PackageForm: React.FC<PackageFormProps> = ({ onNextStep }) => {
  const [formData, setFormData] = useRecoilState(formState);

  const schema = yup.object<Partial<FormValues>>({
    categories: yup
      .array(
        yup
          .mixed<ProductCategory>()
          .oneOf(Object.values(ProductCategory))
          .required(),
      )
      .min(1)
      .ensure(),
    quantities: yup.mixed<Quantity>().oneOf(Object.values(Quantity)).required(),
    embellishment: yup
      .array(
        yup
          .mixed<Embellishment>()
          .oneOf(Object.values(Embellishment))
          .required(),
      )
      .min(1)
      .ensure(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<FormValues>>({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Partial<FormValues>> = (data) => {
    setFormData({ ...formData, ...data });
    onNextStep?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["content"]}>
        <div className={styles["title"]}>
          <h1>Package builder</h1>
          <p>
            get a free quote depending on what you would like to make, we will
            reach out to you so you can inquire and relax.
          </p>
        </div>
        <div className={styles["question"]}>
          <h3>What are you looking to make?</h3>
          <p>select one or multiple.</p>
        </div>
        <div className={styles["options"]}>
          {PRODUCT_CATEGORY.map((product) => (
            <Option
              key={product.title}
              id={product.title}
              label={product.title}
              value={product.title}
              description={product.description}
              {...register("categories")}
            />
          ))}
        </div>
        <p className={styles["error-message"]}>{errors.categories?.message}</p>
        <div className={styles["question"]}>
          <h3>Select the approximate quantities you need per design.</h3>
        </div>
        <div className={styles["options"]}>
          {QUANTITY.map((quantity) => (
            <Option
              key={quantity.title}
              id={quantity.title}
              label={quantity.title}
              value={quantity.title}
              isRadio
              {...register("quantities")}
            />
          ))}
        </div>
        <p className={styles["error-message"]}>{errors.quantities?.message}</p>
        <div className={styles["question"]}>
          <h3>Select the embellishments you would like to have.</h3>
          <p>select one or multiple.</p>
        </div>
        <div className={styles["options"]}>
          {EMBELLISHMENT.map((embellishment) => (
            <Option
              key={embellishment.title}
              id={embellishment.title}
              label={embellishment.title}
              value={embellishment.title}
              {...register("embellishment")}
            />
          ))}
        </div>
        <p className={styles["error-message"]}>
          {errors.embellishment?.message}
        </p>
        <Button type="submit" className={styles["button"]}>
          Next step
        </Button>
      </div>
    </form>
  );
};

export default PackageForm;
