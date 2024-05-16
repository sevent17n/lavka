import { Box, Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Image } from "../../shared";
import { CategoryCardProps } from "./types";
import EditIcon from "@mui/icons-material/Edit";
import { useCategoryStore } from "../../widgets/product-list/store";
import { useQueryClient } from "@tanstack/react-query";
import { AddProductToCategory } from "../../features";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../config";

export const CategoryCard: FC<CategoryCardProps> = ({ card, isAdmin }) => {
  const setCategory = useCategoryStore((state) => state.setCategory);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const handlecategoryClick = (id: number) => {
    setCategory(id);
    queryClient.refetchQueries({ queryKey: ["get-product-list"] });
  };

  return (
    <Box>
      <Link to={HOME_ROUTE}>
        <Button
          sx={{
            borderRadius: 2,
            margin: 1,
            border: "1px solid black",
          }}
          onClick={() => {
            handlecategoryClick(card.id);
          }}
        >
          <Image
            style={{ height: 40, width: 40, borderRadius: 8 }}
            url={card.imageUrl}
            alt={card.name}
          />
          <Typography variant="subtitle1" textOverflow={"ellipsis"}>
            {card.name}
          </Typography>
        </Button>
      </Link>
      {isAdmin && (
        <>
          <Button onClick={() => setOpen(true)}>
            <EditIcon />
          </Button>
          <AddProductToCategory
            open={open}
            onClose={() => setOpen(false)}
            categoryId={card.id}
          />
        </>
      )}
    </Box>
  );
};
