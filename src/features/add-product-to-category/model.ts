import { getCategoriesRoute } from "../../config";
import { $api } from "../../shared";

export const addToCategoryMutation = async (
  categoryId: number,
  productId: number
) => {
  return $api.put(getCategoriesRoute("/update"), { categoryId, productId });
};
