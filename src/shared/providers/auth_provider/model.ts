import { getAuthRoute } from "../../../config";
import { $api } from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../api/model";
import Cookies from "js-cookie";
import { AuthResponse } from "../../typings";

export const refreshQuery = async (): Promise<AuthResponse> => {
  const refreshToken = Cookies.get(REFRESH_TOKEN);

  const { data } = await $api.post<AuthResponse>(getAuthRoute("/refresh"), {
    refreshToken,
  });

  Cookies.set(ACCESS_TOKEN, data.accessToken, { expires: 9999999 });
  Cookies.set(REFRESH_TOKEN, data.refreshToken, { expires: 9999999 });

  return data;
};
