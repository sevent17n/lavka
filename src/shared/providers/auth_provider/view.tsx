import { FC, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  AUTH_ROUTE,
  HOME_ROUTE,
  ORDER_ROUTE,
  SETTINGS_ROUTE,
} from "../../../config/router";
import { useQuery } from "@tanstack/react-query";
import { refreshQuery } from "./model";
import { REFRESH_TOKEN } from "../../api/model";
import Cookies from "js-cookie";
import { useUserStore } from "./store";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const protectedRoutes = [SETTINGS_ROUTE, ORDER_ROUTE];

  const refreshToken = Cookies.get(REFRESH_TOKEN);

  const { isLoading, data } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: refreshQuery,
    enabled: !!refreshToken,
  });

  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    const handleAuth = async () => {
      if (isLoading) return;

      if (data) {
        updateUser(data?.user);
      }

      if (data) {
        if (pathname === AUTH_ROUTE) {
          navigate(HOME_ROUTE);
        } else if (pathname === ADMIN_ROUTE && !data.user.isAdmin) {
          navigate(HOME_ROUTE);
        }
      } else if (protectedRoutes.includes(pathname)) {
        navigate(AUTH_ROUTE);
      }
    };

    handleAuth();
  }, [pathname, refreshToken, isLoading]);

  return <>{children}</>;
};
