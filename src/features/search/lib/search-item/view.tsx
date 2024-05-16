import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { Product } from "../../../../shared";
import { Image } from "../../../../shared";
import { useBasketStore } from "../../../basket/store";

interface ISearchItem {
  product: Product;
  setProduct?: (arg: Product) => void;
}

export const SearchItem: FC<ISearchItem> = ({ product, setProduct }) => {
  const toggleProduct = useBasketStore((state) => state.toggleProduct);
  const products = useBasketStore((state) => state.products);
  return (
    <Box onClick={() => setProduct && setProduct(product)}>
      <Image
        url={product.imageUrl}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <Typography>{product.name}</Typography>
      <Typography>{product.price.toLocaleString("ru")}</Typography>
      <Button onClick={() => toggleProduct(product)}>
        {products.find((item) => item.id === product.id)
          ? "Убрать из корзины"
          : "В корзину"}
      </Button>
    </Box>
  );
};
