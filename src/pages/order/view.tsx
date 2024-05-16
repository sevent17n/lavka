import { Button } from "@mui/material";
import { ProductCard } from "../../entities";
import { useBasketStore } from "../../features/basket/store";
import { createOrder } from "./model";
import { useNavigate } from "react-router-dom";
import { SETTINGS_ROUTE } from "../../config";
import { useUserStore } from "../../shared/providers/auth_provider/store";

export const ORDER_PAGE = () => {
  const { products } = useBasketStore();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleCreateOrder = async () => {
    await createOrder(
      Number(user?.id),
      products.map((item) => item.id)
    );
    navigate(SETTINGS_ROUTE);
  };
  return (
    <div>
      <h1>
        Продукты на сумму:{" "}
        {products.reduce((acc, item) => (acc += item.price), 0)}
      </h1>
      <ul>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </ul>

      <Button onClick={handleCreateOrder}>Оплатить</Button>
    </div>
  );
};
