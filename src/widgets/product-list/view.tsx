import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getProductsListQuery } from "./model";
import { FC } from "react";
import { ProductCard } from "../../entities";
import { useCategoryStore } from "./store";

export const ProductList: FC = () => {
  const categoryId = useCategoryStore((state) => state.categoryId);

  const { data, isLoading } = useQuery({
    queryKey: ["get-product-list"],
    queryFn: async () =>
      getProductsListQuery({ categoryId: Number(categoryId) }),
    enabled: !!categoryId,
  });

  return (
    <Box>
      {isLoading ? (
        <Typography variant="h4">Загрузка...</Typography>
      ) : (
        <Box>
          {data?.category_products &&
            data?.category_products.map((item, index) => (
              <ProductCard product={item.product} key={index} />
            ))}
        </Box>
      )}
    </Box>
  );
};
