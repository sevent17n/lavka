import { Link } from "react-router-dom";
import { ORDER_ROUTE } from "../../config";
import { useBasketStore } from "./store";

export const Basket = () => {
  const products = useBasketStore((state) => state.products);
  return <Link to={ORDER_ROUTE}>Корзина: {products.length} товаров</Link>;
};
