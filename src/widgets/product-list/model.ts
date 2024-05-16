import { getCategoriesRoute } from "../../config";
import { $public_api } from "../../shared/api/model";
import { GetProductListDto, GetProductListRes } from "./types";

export const getProductsListQuery = async (
  dto: GetProductListDto
): Promise<GetProductListRes> => {
  const { data } = await $public_api.post<GetProductListRes>(
    getCategoriesRoute("/byId"),
    {
      id: dto.categoryId,
    }
  );

  return data;
};
