export enum ProductCategory {
  TEES = "tees",
  SWEATS = "sweats",
  BOTTOMS = "bottoms",
  HEADWEAR = "headwear",
  KNITWEAR = "knitwear",
  ACCESSORIES = "accessories",
  OTHER = "other",
}

export enum Quantity {
  ONE_TO_FORTY_NINE = "1-49 items",
  FIFTY_TO_NINETY_NINE = "50-99 items",
  ONE_HUNDRED_TO_TWO_HUNDRED_NINETY_NINE = "100-299 items",
  THREE_HUNDRED_PLUS = "300+ items",
}

export enum Embellishment {
  EMBROIDERY = "embroidery",
  SCREEN_PRINT = "screen print",
  PUFF_PRINT = "puff print",
  DIRECT_TO_GARMENT = "direct to garment (DTG)",
  SUBLIMATION = "sublimation (all over print)",
  PATCH_EMBROIDERY = "patch embroidery",
  NONE = "none",
}

export interface FormValues {
  categories: ProductCategory[];
  quantities?: Quantity;
  embellishment: Embellishment[];
  name: string;
  email: string;
  phone?: string;
  company?: string;
  instagram?: string;
  website?: string;
  comment?: string;
}
