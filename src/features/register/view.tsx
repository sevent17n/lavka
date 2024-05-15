import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { RegistrationDto } from "./types";
import { useMutation } from "@tanstack/react-query";
import { RegisterMutation } from "./model";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../config";
import { useUserStore } from "../../shared/providers/auth_provider/store";

export const Register: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationDto>();

  const navigate = useNavigate();

  const { mutateAsync, isError, isSuccess } = useMutation({
    mutationKey: ["registration"],
    mutationFn: async (dto: RegistrationDto) => RegisterMutation(dto),
  });

  const updateUser = useUserStore((state) => state.updateUser);

  const onSubmit = async (data: RegistrationDto) => {
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
          label="Телефон"
          {...register("phone", {
            required: 'Поле "Телефон" обязательно для заполнения',
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: "Неверный формат номера телефона",
            },
          })}
          error={!!errors.phone}
          helperText={
            errors.phone?.message && (
              <Typography>{errors.phone.message as string}</Typography>
            )
          }
        />
        <TextField
          label="ФИО"
          {...register("fio", {
            required: 'Поле "ФИО" обязательно для заполнения',
            pattern: {
              value: /^[a-zA-Zа-яА-Я\s]+$/,
              message: "ФИО должно содержать только буквы и пробелы",
            },
          })}
          error={!!errors.fio}
          helperText={
            errors.fio?.message && (
              <Typography>{errors.fio.message as string}</Typography>
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
        <TextField
          label="Повторите пароль"
          type="password"
          {...register("password_repeat", {
            validate: (value) =>
              value === watch("password") || "Пароли должны совпадать",
          })}
          error={!!errors.password_repeat}
          helperText={
            errors.password_repeat?.message && (
              <Typography>
                {errors.password_repeat.message as string}
              </Typography>
            )
          }
        />
        {isError && <Typography>Почта или пароль заняты</Typography>}
        <Button type="submit">Зарегистрироваться</Button>
      </Box>
    </form>
  );
};
