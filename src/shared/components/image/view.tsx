import { FC } from "react";
import { ImageProps } from "./types";

export const Image: FC<ImageProps> = ({ url, ...props }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  return <img src={BASE_URL + url} {...props} />;
};
