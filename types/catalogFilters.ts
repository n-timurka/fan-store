import type { ProductColorEnum } from "./enums";

export type CatalogFilters = {
  colors: ProductColorEnum[];
  sizes: string[];
  price: { min: number; max: number };
};
