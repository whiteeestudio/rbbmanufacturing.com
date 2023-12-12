import { atom } from "recoil";
import { FormValues } from "types/types";

const formState = atom({
  key: "packageBuilderForm",
  default: {
    categories: [],
    embellishment: [],
    name: "",
    email: "",
  } as FormValues,
});

export default formState;
