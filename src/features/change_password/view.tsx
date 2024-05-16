import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { changPasswordQuery } from "./model";
import { useUserStore } from "../../shared/providers/auth_provider/store";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { user } = useUserStore();

  const handleCurrentPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await changPasswordQuery(String(user?.email), newPassword, currentPassword);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "auto",
      }}
    >
      <Typography variant="h6" component="div" gutterBottom>
        Поменять пароль
      </Typography>
      <TextField
        label="Текущий пароль"
        type="password"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        required
      />
      <TextField
        label="Новый парольы"
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Изменить
      </Button>
    </Box>
  );
};
