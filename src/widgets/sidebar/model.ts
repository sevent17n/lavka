import { getCategoriesRoute } from "../../config";
import { $api, Category } from "../../shared";

export const getCategoriesQuery = async (): Promise<Category[]> => {
  const { data } = await $api.get<Category[]>(getCategoriesRoute("/all"));
  return data;
};
