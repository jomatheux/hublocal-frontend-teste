import axios, { AxiosError, AxiosResponse } from "axios";
import useToast from "@/hooks/useToast";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: object,
  contentType: string = 'application/json'
) => {
  const token = sessionStorage.getItem("token");
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

    useToast(res.data.message, "success");

    return res.data;
  } catch (error: AxiosError | Error | unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      window.location.href = "/login";
      useToast(error.response.data.message, "error");
      throw new Error("Unauthorized");
    }

    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data?.message || "Unknown error";
      useToast(errorMessage, "error");
      throw new Error(errorMessage);
    }
    useToast(error instanceof Error ? error.message : String(error), "error");
    throw new Error(`Request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};