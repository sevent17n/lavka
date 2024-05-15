import { Product } from "../../shared";

export interface AddProductDto extends Omit<Product, "id" | "imageUrl"> {
  image: File | null;
}
