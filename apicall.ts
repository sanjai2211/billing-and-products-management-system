import { FetchApiParams } from "./lib/types";

async function fetchApi({
  endpoint,
  method = "GET",
  data,
}: {
  endpoint: string;
  method?: string;
  data?: any;
}) {
  const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api${endpoint}`;

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

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
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

export const createNewProduct = async (data: any) => {
  const response = await fetchApi({
    endpoint: "/product/create",
    method: "POST",
    data,
  });
  return response;
};

export const getProductDetailsById = async (productId: any) => {
  const response = await fetchApi({
    endpoint: `/product/${productId}`,
  });
  return response;
};

export const updateProductDetails = async (productId: any,data: any) => {
  const response = await fetchApi({
    endpoint: `/product/${productId}`,
    method : "PATCH",
    data
  });
  return response;
};

export const deleteProduct = async (productId: any) => {
  const response = await fetchApi({
    endpoint: `/product/${productId}`,
    method : "DELETE",
  });
  return response;
};

export const getProductsByShopId = async (shopId: any) => {
  const response = await fetchApi({
    endpoint: `/products/${shopId}`,
  });
  return response;
};

export const createShop = async (data: any) => {
  const response = await fetchApi({
    endpoint: "/shop/create",
    method: "POST",
    data,
  });
  return response;
};

export const updateShop = async (data: any) => {
  const {shopId , ...rest} = data
  const response = await fetchApi({
    endpoint: `/shop/${shopId}`,
    method : "PATCH",
    data : rest
  });
  return response;
};

export const getShopDetailsById = async (shopId: String) => {
  const response = await fetchApi({
    endpoint: `/shop/${shopId}`,
  });
  return response;
};
