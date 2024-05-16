import { getOrderRoute } from "../../config";
import { $api } from "../../shared";

export const createOrder = async (userId: number, productsId: number[]) => {
  await $api.post(getOrderRoute("/create"), {
    userId,
    productsId,
  });
};
