import type { Product } from "./product";
import type { ProductOption } from "./productOptions";

export type CartItem = {
  product: Product;
  options?: ProductOption;
  quantity: number;
};
