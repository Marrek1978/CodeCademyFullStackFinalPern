import axios from "axios";
import type { LoginData } from "../types/AuthTypes.js";

export const apiEndpoint = "http://localhost:3001";

export async function registerUserAxios(data: LoginData) {
  const email = data.email;
  const password = data.password;
  const url = `${apiEndpoint}/register`;

  try {
    return await axios({
      method: "POST",
      data: { email, password },
      withCredentials: false,
      url: url,
    });
  } catch (error) {
    return {
      data: { error: (error as Error).message },
      status: 500,
      statusText: "Error",
    };
  }
}

export async function loginUserAxios(data: LoginData) {
  const email = data.email;
  const password = data.password;
  const url = `${apiEndpoint}/login`;

  try {
    return await axios({
      method: "POST",
      data: { email, password },
      withCredentials: false,
      url: url,
    });
  } catch (error) {
    return {
      data: { error: (error as Error).message },
      status: 500,
      statusText: "Error",
    };
  }
}
