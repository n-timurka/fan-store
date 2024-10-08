import type { Product } from "./product";
import type { ProductOption } from "./productOptions";

export type Cart = {
  product: Product;
  options?: ProductOption;
  quantity: number;
};
