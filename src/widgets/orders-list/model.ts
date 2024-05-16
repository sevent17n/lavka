import { getOrderRoute } from "../../config";
import { $api } from "../../shared";
import { Order } from "../../shared/typings/order.types";

export const getOrdersQuery = async (): Promise<Order[]> => {
  const { data } = await $api.get<Order[]>(getOrderRoute(""));
  return data;
};
