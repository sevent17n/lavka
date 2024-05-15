import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQuery } from "./model";
import { CategoryCard } from "../../entities";

export const Sidebar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => getCategoriesQuery(),
  });
  console.error(data, isLoading);
  return (
    <Box
      sx={{
        borderRight: "1px solid gray",
        height: "100%",
        paddingLeft: 2,
      }}
    >
      <Typography variant="h5" pt={3}>
        Категории
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {isLoading ? (
          <Typography>Загрузка</Typography>
        ) : (
          data &&
          data.map((item) => (
            <CategoryCard
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
            />
          ))
        )}
      </Box>
    </Box>
  );
};
