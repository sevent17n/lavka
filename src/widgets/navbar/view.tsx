import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";
import { ADMIN_ROUTE, HOME_ROUTE, SETTINGS_ROUTE } from "../../config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserStore } from "../../shared/providers/auth_provider/store";

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
          <a href={HOME_ROUTE}>Лавка</a>
        </Typography>

        {user?.isAdmin && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <a href={ADMIN_ROUTE}>Панель управления</a>
          </Typography>
        )}

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Поиск…"
            inputProps={{ "aria-label": "Поиск" }}
          />
        </Search>
        <a href={SETTINGS_ROUTE}>
          <AccountCircleIcon />
        </a>
      </Toolbar>
    </AppBar>
  );
};
