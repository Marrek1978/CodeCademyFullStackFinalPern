import axios from "axios";
import type { CardData, LoginData, ProfileData } from "../types/Types.js";

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

function returnErrorObj(err: string, status: number, statusText: string) {
  return {
    data: { error: err },
    status: status,
    statusText: statusText,
  };
}

//***************   USER DETAILS **************************** */

export async function registerUserAxios(data: LoginData) {
  const email = data.email;
  const password = data.password;
  const url = `${apiEndpoint}/register`;

  try {
    const response = await axios({
      method: "POST",
      data: { email, password },
      url: url,
    });

    return response;
  } catch (err) {
    const errRes = err as ErrorResponse;

    if (errRes.response.data.type === "credentials") {
      return returnErrorObj(errRes.response.data.error, 409, "Error");
    }

    if (errRes.response.data.error) {
      return returnErrorObj(errRes.response.data.error, 500, "Error");
    }

    return returnErrorObj((err as Error).message, 500, "Error");
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
      return returnErrorObj(errRes.response.data.error, 401, "Error");
    }

    return returnErrorObj((err as Error).message, 500, "Error");
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
    return returnErrorObj((error as Error).message, 500, "Error");
  }
}

export async function getUserDataAxios(id: string) {
  const url = `${apiEndpoint}/user/${id}`;
  try {
    const response = await axios({
      method: "GET",
      data: { id },
      url: url,
    });
    return response;
  } catch (err) {
    return returnErrorObj(
      (err as ErrorResponse).response.data.error,
      500,
      "Error"
    );
  }
}

export async function submitUserDetails(data: ProfileData, id: string) {
  const url = `${apiEndpoint}/user/${id}`;

  try {
    const response = await axios({
      method: "POST",
      data: { data, id },
      url: url,
    });
    return response;
  } catch (err) {
    return returnErrorObj(
      (err as ErrorResponse).response.data.error,
      500,
      "Error"
    );
  }
}

//***************   USER CC DETAILS **************************** */
export async function getUserCardDetailsAxios(id: string) {
  const url = `${apiEndpoint}/user/${id}/card`;
  try {
    const response = await axios({
      method: "GET",
      data: { id },
      url: url,
    });
    return response;
  } catch (err) {
    return returnErrorObj(
      (err as ErrorResponse).response.data.error,
      500,
      "Error"
    );
  }
}

export async function submitCardDetails(data: CardData, id: string) {
  const url = `${apiEndpoint}/user/${id}/card`;

  try {
    const response = await axios({
      method: "POST",
      data: { data, id },
      url: url,
    });

    return response;
  } catch (err) {
    return returnErrorObj(
      (err as ErrorResponse).response.data.error,
      500,
      "Error"
    );
  }
}

export async function submitSubToDbAxios(userID: string, subFrequency: string) {
  const url = `${apiEndpoint}/user/${userID}/subscription`;

  try {
    const response = await axios({
      method: "POST",
      data: { userID, subFrequency },
      url: url,
    });

    return response;
  } catch (err) {
    return returnErrorObj(
      (err as ErrorResponse).response.data.error,
      500,
      "Error"
    );
  }
}

//???? STRIPE ?????????????????????????????

export interface StripeSessionResponse {
  clientSecret?: string;
  data?: { error: string };
  status?: number;
  statusText?: string;
}

export const getStripSessionAxios = async (
  subscriptionId: string
): Promise<StripeSessionResponse> => {
  const url = `${apiEndpoint}/create-checkout-session`;

  try {
    const stripeRes = await axios({
      method: "POST",
      data: { subscriptionId },
      url: url,
    });

    return stripeRes.data.clientSecret;
  } catch (err) {
    return returnErrorObj(err as string, 500, "Error");
  }
};

export const getStripeSessionStatuAxios = async (sessionId: string) => {
  const url = `${apiEndpoint}/session-status?session_id=${sessionId}`;

  try {
    const response = await axios({
      method: "GET",
      data: { sessionId },
      url: url,
    });

    return response;
  } catch (err) {
    return returnErrorObj(
      (err as ErrorResponse).response.data.error,
      500,
      "Error"
    );
  }
};
