import { Embellishment, ProductCategory, Quantity } from "types/types";

export const PRODUCT_CATEGORY = [
  {
    title: ProductCategory.TEES,
    description: "short sleeves, long sleeves, tank tops",
  },
  {
    title: ProductCategory.SWEATS,
    description: "hoodies, sweatshirts, sweatpants",
  },
  {
    title: ProductCategory.BOTTOMS,
    description: "denims, chinos, twill pants",
  },
  {
    title: ProductCategory.HEADWEAR,
    description: "hats, beanies, balaclavas, shiestys",
  },
  {
    title: ProductCategory.KNITWEAR,
    description: "cardigans, sweaters, etc.",
  },
  {
    title: ProductCategory.ACCESSORIES,
    description: "tote bags, scarves, gloves, etc.",
  },
  {
    title: ProductCategory.OTHER,
    description: "stickers, mailers, hangtags, etc.",
  },
];

export const QUANTITY = [
  {
    title: Quantity.ONE_TO_FORTY_NINE,
  },
  {
    title: Quantity.FIFTY_TO_NINETY_NINE,
  },
  {
    title: Quantity.ONE_HUNDRED_TO_TWO_HUNDRED_NINETY_NINE,
  },
  {
    title: Quantity.THREE_HUNDRED_PLUS,
  },
];

export const EMBELLISHMENT = [
  {
    title: Embellishment.EMBROIDERY,
  },
  {
    title: Embellishment.SCREEN_PRINT,
  },
  {
    title: Embellishment.PUFF_PRINT,
  },
  {
    title: Embellishment.DIRECT_TO_GARMENT,
  },
  {
    title: Embellishment.SUBLIMATION,
  },
  {
    title: Embellishment.PATCH_EMBROIDERY,
  },
  {
    title: Embellishment.NONE,
  },
];
