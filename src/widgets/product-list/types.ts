import { Category, Product } from "../../shared";

export interface GetProductListDto {
  categoryId: number;
}

export interface GetProductListRes extends Category {
  category_products: { product: Product }[];
}
