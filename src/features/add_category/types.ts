import { Category } from "../../shared";

export interface AddCategoryDto extends Omit<Category, "id" | "imageUrl"> {
  image: File | null;
}
