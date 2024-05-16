import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ADMIN_ROUTE, HOME_ROUTE, SETTINGS_ROUTE } from "../../config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserStore } from "../../shared/providers/auth_provider/store";
import { Search } from "../../features/search/view";
import { Basket } from "../../features/basket/view";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const user = useUserStore((state) => state.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <Link to={HOME_ROUTE}>Лавка</Link>
        </Typography>

        {user?.isAdmin && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to={ADMIN_ROUTE}>Панель управления</Link>
          </Typography>
        )}
        <Basket />
        <Search />

        <Link to={SETTINGS_ROUTE}>
          <AccountCircleIcon />
        </Link>
      </Toolbar>
    </AppBar>
  );
};
