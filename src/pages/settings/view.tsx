import { ChangePassword } from "../../features";
import { OrdersList } from "../../widgets/orders-list/view";

export const SETTINGS_PAGE = () => {
  return (
    <div>
      <OrdersList />
      <ChangePassword />
    </div>
  );
};
