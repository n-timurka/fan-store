import type { CatalogFilters } from "./catalogFilters";
import type { Product } from "./product";

export type ProductsResponse = {
  products: Product[];
  total: number;
  minPrice: number;
  maxPrice: number;
  filters: CatalogFilters;
};
