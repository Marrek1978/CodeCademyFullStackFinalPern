import axios from "axios";
import type { LoginData } from "../types/AuthTypes.js";

axios.defaults.withCredentials = true;
export const apiEndpoint = "http://localhost:3001";

interface ErrorResponse extends Error {
  response: {
    data: {
      error: string;
      type: string;
    };
  };
}

export async function registerUserAxios(data: LoginData) {
  const email = data.email;
  const password = data.password;
  const url = `${apiEndpoint}/register`;

  try {
    return await axios({
      method: "POST",
      data: { email, password },
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
      url: url,
    });
  } catch (err) {
    const errRes = err as ErrorResponse;

    if (errRes.response.data.type === "credentials") {

      return {
        data: { error: errRes.response.data.error },
        status: 401,
        statusText: "Error",
      };
    }

    return {
      data: { error: (err as Error).message },
      status: 500,
      statusText: "Error",
    };
  }
}

export async function logoutUserAxios() {
  const url = `${apiEndpoint}/logout`;

  try {
    return await axios({
      method: "get",
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


export async function getUserDataAxios(id:string)  {
  const url = `${apiEndpoint}/user/${id}`;
  try {
   const response =  await axios({
      method: "GET",
      data: {id},
      url: url,
    });

    return response
  } catch (err) {
    return {
      data: { error: (err as Error).message },
      status: 500,
      statusText: "Error",
    };
  }
}