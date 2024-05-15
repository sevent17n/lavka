import { getProductsRoute } from "../../config";
import { $api } from "../../shared";
import { AddProductDto } from "./types";

export const AddProductMutation = async (dto: AddProductDto): Promise<void> => {
  if (!dto.image) throw new Error(`No image provided`);

  const formData = new FormData();

  const { image, ...dtoWithNoImage } = dto;

  formData.append("file", image);
  formData.append("dto", JSON.stringify(dtoWithNoImage));

  await $api.post(getProductsRoute("/create"), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
