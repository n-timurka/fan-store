import type { ProductColorEnum } from "./enums";

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  colors?: ProductColorEnum[];
  sizes?: string[];
  rating: number;
  images: string[];
};
