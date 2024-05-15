import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../config";
import { useMutation } from "@tanstack/react-query";
import { LoginMutation } from "./model";
import { LoginDto } from "./types";
import { useUserStore } from "../../shared/providers/auth_provider/store";

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const navigate = useNavigate();

  const { mutateAsync, isError, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (dto: LoginDto) => LoginMutation(dto),
  });

  const updateUser = useUserStore((state) => state.updateUser);

  const onSubmit = async (data: LoginDto) => {
    const { user } = await mutateAsync(data);
    updateUser(user);
  };

  if (isSuccess) {
    navigate(HOME_ROUTE);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          label="Почта"
          {...register("email", {
            required: 'Поле "Почта" обязательно для заполнения',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неверный формат email адреса",
            },
          })}
          error={!!errors.email}
          helperText={
            errors.email?.message && (
              <Typography>{errors.email.message as string}</Typography>
            )
          }
        />
        <TextField
          label="Пароль"
          type="password"
          {...register("password", {
            required: 'Поле "Пароль" обязательно для заполнения',
          })}
          error={!!errors.password}
          helperText={
            errors.password?.message && (
              <Typography>{errors.password.message as string}</Typography>
            )
          }
        />
        {isError && <Typography>Почта или пароль неверны</Typography>}
        <Button type="submit">Войти</Button>
      </Box>
    </form>
  );
};
