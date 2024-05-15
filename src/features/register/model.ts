import { getAuthRoute } from "../../config";
import { AuthResponse } from "../../shared";
import {
  $public_api,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../../shared/api/model";
import { RegistrationDto } from "./types";
import Cookies from "js-cookie";

export const RegisterMutation = async (
  dto: RegistrationDto
): Promise<AuthResponse> => {
  const { data } = await $public_api.post<AuthResponse>(
    getAuthRoute("/register"),
    dto
  );

  Cookies.set(ACCESS_TOKEN, data.accessToken, { expires: 9999999 });
  Cookies.set(REFRESH_TOKEN, data.refreshToken, { expires: 9999999 });

  return data;
};
