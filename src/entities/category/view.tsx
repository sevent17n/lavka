import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Category, Image } from "../../shared";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const CategoryCard: FC<Category> = ({ name, imageUrl }) => {
  return (
    <Button
      sx={{
        borderRadius: 2,
        margin: 1,
        border: "1px solid black",
      }}
    >
      <Image
        style={{ height: 40, width: 40, borderRadius: 8 }}
        url={imageUrl}
        alt={name}
      />
      <Typography variant="subtitle1" textOverflow={"ellipsis"}>
        {name}
      </Typography>
    </Button>
  );
};
