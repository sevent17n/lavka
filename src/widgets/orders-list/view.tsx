import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getOrdersQuery } from "./model";

export const OrdersList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-orders"],
    queryFn: async () => await getOrdersQuery(),
  });
  return (
    <Box>
      {isLoading
        ? "Загрузка"
        : data && data.map((item) => <Box>Заказ #{item.id}</Box>)}
    </Box>
  );
};
