import { getProductsRoute } from "../../config";
import { Product } from "../../shared";
import { $public_api } from "../../shared/api/model";

export const searchMutation = async (
  searchTerm: string
): Promise<Product[]> => {
  const { data } = await $public_api(getProductsRoute("/search"), {
    params: { searchTerm },
  });
  return data;
};
