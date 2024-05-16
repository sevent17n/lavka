import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQuery } from "./model";
import { CategoryCard } from "../../entities";
import { useCategoryStore } from "../product-list/store";
import { useUserStore } from "../../shared/providers/auth_provider/store";

export const Sidebar = () => {
  const setCategory = useCategoryStore((state) => state.setCategory);
  const user = useUserStore((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => getCategoriesQuery(),
  });

  if (!isLoading && data) {
    data[0] && setCategory(data[0]?.id);
  }

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
            <CategoryCard key={item.id} card={item} isAdmin={!!user?.isAdmin} />
          ))
        )}
      </Box>
    </Box>
  );
};
