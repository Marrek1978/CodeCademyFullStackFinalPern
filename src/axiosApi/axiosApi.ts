import axios from "axios";
import type { LoginData } from "../types/AuthTypes.js";

export const apiEndpoint = "http://localhost:3001";

export async function registerUserAxios(data: LoginData) {
  try {
    const email = data.email;
    const password = data.password;
    const url = `${apiEndpoint}/register`;

    console.log("🚀 ~ file: axiosApi.ts:14 ~ registerUserAxios ~ url:", url);
    const response = await axios({
      method: "GET",
      data: { email, password },
      withCredentials: false,
      url: `${apiEndpoint}/register`,
    });
    console.log("🚀 ~ file: axiosApi.ts:19 ~ registerUserAxios ~ response:", response)

    return response;
  } catch (error) {
    return { error: error };
  }
}
