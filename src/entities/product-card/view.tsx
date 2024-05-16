import { FC } from "react";
import { ProductCardProps } from "./types";
import { Box, Button, Typography } from "@mui/material";
import { Image } from "../../shared";
import { useBasketStore } from "../../features/basket/store";

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const toggleProduct = useBasketStore((state) => state.toggleProduct);
  const products = useBasketStore((state) => state.products);
  return (
    <Box>
      <Image
        url={product.imageUrl}
        alt={product.name}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <Typography variant="subtitle1">{product.name}</Typography>
      <Typography variant="subtitle2">
        {product.price.toLocaleString("ru")}
      </Typography>
      <Button onClick={() => toggleProduct(product)}>
        {products.find((item) => item.id === product.id)
          ? "Убрать из корзины"
          : "В корзину"}
      </Button>
    </Box>
  );
};
