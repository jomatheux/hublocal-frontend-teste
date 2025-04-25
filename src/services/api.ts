import axios, { AxiosError, AxiosResponse } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: object,
  token?: string,
  contentType: string = 'application/json'
) => {
  try {
    const res: AxiosResponse = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers: {
        'Content-Type': contentType,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    console.log("Response:", res.data);
    console.log(API_BASE_URL, endpoint);

    return res.data;
  } catch (error: AxiosError | Error | unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data?.message || "Unknown error";
      throw new Error(errorMessage);
    }

    throw new Error(`Request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};