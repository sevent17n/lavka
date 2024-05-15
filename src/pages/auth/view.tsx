import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Register, Login } from "../../features";

export const AUTH_PAGE = () => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  return (
    <Box>
      {authMode === "login" ? (
        <Box>
          <Login />
          <Typography variant="subtitle1">Нет аккаунта?</Typography>{" "}
          <Button onClick={() => setAuthMode("register")}>
            Зарегистрироваться
          </Button>
        </Box>
      ) : (
        <Box>
          <Register />
          <Typography variant="subtitle1">Есть аккаунт?</Typography>{" "}
          <Button onClick={() => setAuthMode("login")}>Войти</Button>
        </Box>
      )}
    </Box>
  );
};
