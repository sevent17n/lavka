import { getCategoriesRoute } from "../../config";
import { $api } from "../../shared";
import { AddCategoryDto } from "./types";

export const AddCategoryMutation = async (
  dto: AddCategoryDto
): Promise<void> => {
  if (!dto.image) throw new Error(`No image provided`);

  const formData = new FormData();

  const { image, ...dtoWithNoImage } = dto;

  formData.append("file", image);
  formData.append("dto", JSON.stringify(dtoWithNoImage));

  await $api.post(getCategoriesRoute("/create"), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
