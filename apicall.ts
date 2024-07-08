import { FetchApiParams } from "./lib/types";

async function fetchApi({ endpoint, method = "GET", data }: FetchApiParams) {
  const url = `/api${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const registerUser = async (data: { email: string; password: string }) => {
  const response = await fetchApi({
    endpoint: "/auth/register",
    method: "POST",
    data,
  });
  return response;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetchApi({
    endpoint: "/auth/register",
    method: "POST",
    data,
  });
  return response;
};
