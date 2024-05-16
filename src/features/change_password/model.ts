import { getUserRoute } from "../../config";
import { $api } from "../../shared";

export const changPasswordQuery = async (
  email: string,
  password: string,
  oldPassword: string
) => {
  await $api.post(getUserRoute("/change-password"), {
    email,
    password,
    oldPassword,
  });
};
