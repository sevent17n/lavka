import { Box, Button, Modal, Typography } from "@mui/material";
import { FC, useState } from "react";
import { AddProductToCategoryProps } from "./types";
import { Product } from "../../shared";
import { Search } from "../search/view";
import { addToCategoryMutation } from "./model";

export const AddProductToCategory: FC<AddProductToCategoryProps> = ({
  open,
  onClose,
  categoryId,
}) => {
  const [product, setProduct] = useState<Product | null>(null);

  const handleAddProduct = async (productId: number) => {
    await addToCategoryMutation(categoryId, productId);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, background: "white" }}>
        <Typography variant="h4">Добавить товар в категорию</Typography>
        <Search setProduct={setProduct} />
        {product && (
          <Box>
            <Typography>Выбранный продукт: {product.name}</Typography>{" "}
            <Button onClick={() => handleAddProduct(product?.id)}>
              Добавить
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};
