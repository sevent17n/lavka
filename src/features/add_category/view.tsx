import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCategoryDto } from "./types";
import { AddCategoryMutation } from "./model";

export const AddCategory: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddCategoryDto>();

  const { mutateAsync } = useMutation({
    mutationKey: ["add-category"],
    mutationFn: async (dto: AddCategoryDto) => AddCategoryMutation(dto),
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const queryClient = useQueryClient();

  const onSubmit = async (data: AddCategoryDto) => {
    await mutateAsync(data);
    queryClient.refetchQueries({ queryKey: ["get-categories"] });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h1">Добавить категорию</Typography>
      <TextField
        label="Название"
        {...register("name", {
          required: 'Поле "Название" обязательно для заполнения',
        })}
        error={!!errors.name}
        helperText={
          errors.name?.message && (
            <Typography>{errors.name.message as string}</Typography>
          )
        }
        fullWidth
        margin="normal"
      />

      <Controller
        name="image"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <>
            <Button variant="contained" component="label">
              Загрузить изображение
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageUpload(e, field.onChange)}
              />
            </Button>
            {field.value && <Typography>{field.value.name}</Typography>}
          </>
        )}
      />
      {errors.image && (
        <Typography color="error">{errors.image.message as string}</Typography>
      )}

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </Box>
    </form>
  );
};
