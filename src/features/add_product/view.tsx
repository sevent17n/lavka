import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AddProductDto } from "./types";
import { AddProductMutation } from "./model";

export const AddProduct: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddProductDto>();

  const { mutateAsync } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (dto: AddProductDto) => AddProductMutation(dto),
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

  const onSubmit = async (data: AddProductDto) => {
    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h1">Добавить продукт</Typography>
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

      <TextField
        label="Описание"
        {...register("description", {
          required: 'Поле "Описание" обязательно для заполнения',
        })}
        error={!!errors.description}
        helperText={
          errors.description?.message && (
            <Typography>{errors.description.message as string}</Typography>
          )
        }
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <TextField
        label="Цена"
        type="number"
        {...register("price", {
          required: 'Поле "Цена" обязательно для заполнения',
          valueAsNumber: true,
        })}
        error={!!errors.price}
        helperText={
          errors.price?.message && (
            <Typography>{errors.price.message as string}</Typography>
          )
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Скидка"
        type="number"
        {...register("discount", {
          valueAsNumber: true,
        })}
        error={!!errors.discount}
        helperText={
          errors.discount?.message && (
            <Typography>{errors.discount.message as string}</Typography>
          )
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Количество"
        type="number"
        {...register("count", {
          required: 'Поле "Количество" обязательно для заполнения',
          valueAsNumber: true,
        })}
        error={!!errors.count}
        helperText={
          errors.count?.message && (
            <Typography>{errors.count.message as string}</Typography>
          )
        }
        fullWidth
        margin="normal"
      />

      <TextField
        label="Вес"
        type="number"
        {...register("weight", {
          required: 'Поле "Вес" обязательно для заполнения',
          valueAsNumber: true,
        })}
        error={!!errors.weight}
        helperText={
          errors.weight?.message && (
            <Typography>{errors.weight.message as string}</Typography>
          )
        }
        fullWidth
        margin="normal"
      />

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </Box>
    </form>
  );
};
