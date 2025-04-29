import axios, { AxiosError, AxiosResponse } from "axios";
import UseToast from "@/hooks/useToast";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: object,
  contentType: string = 'application/json'
) => {
  const cleanEndpoint = endpoint.trim();
  let token;
  try {
    token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  } catch (error) {
    console.error("Error getting token from sessionStorage:", error);
  }

  try {
    const res: AxiosResponse = await axios({
      method,
      url: `${API_BASE_URL}${cleanEndpoint}`,
      data,
      headers: {
        'Content-Type': contentType,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    console.log("Response:", res.data);
    console.log(API_BASE_URL, endpoint);

    UseToast(res.data.message, "success");

    return res.data;
  } catch (error: AxiosError | Error | unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        window.location.href = "/login";
      }
      UseToast(error.response.data.message, "error");
      throw new Error("Unauthorized");
    }

    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data?.message || "Unknown error";
      UseToast(errorMessage, "error");
      throw new Error(errorMessage);
    }
    UseToast(error instanceof Error ? error.message : String(error), "error");
    throw new Error(`Request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};
