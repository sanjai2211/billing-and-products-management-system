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

export const updateProductDetails = async (productId: any, data: any) => {
  const response = await fetchApi({
    endpoint: `/product/${productId}`,
    method: "PATCH",
    data,
  });
  return response;
};

export const deleteProduct = async (productId: any) => {
  const response = await fetchApi({
    endpoint: `/product/${productId}`,
    method: "DELETE",
  });
  return response;
};

export const getProductsByShopId = async (shopId: any, queryParams='') => {
  const response = await fetchApi({
    endpoint: `/product?id=${shopId}&${queryParams}`,
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
  const { shopId, ...rest } = data;
  const response = await fetchApi({
    endpoint: `/shop/${shopId}`,
    method: "PATCH",
    data: rest,
  });
  return response;
};

export const getShopDetailsById = async (shopId: String) => {
  const response = await fetchApi({
    endpoint: `/shop/${shopId}`,
  });
  return response;
};

export const getBillsByShopId = async (shopId: any, queryParams: any) => {
  const response = await fetchApi({
    endpoint: `/bill?id=${shopId}&${queryParams}`,
  });
  return response;
};

export const createBill = async (data: any) => {
  const response = await fetchApi({
    endpoint: "/bill/create",
    method: "POST",
    data,
  });
  return response;
};

export const updateBill = async (billId: any, data: any) => {
  const response = await fetchApi({
    endpoint: `/bill/${billId}`,
    method: "PATCH",
    data,
  });
  return response;
};

export const getBillDetailsById = async (billId: any) => {
  const response = await fetchApi({
    endpoint: `/bill/${billId}`,
  });
  return response;
};

export const createBillItems = async (data: any) => {
  const response = await fetchApi({
    endpoint: "/bill/bill-items/create",
    method: "POST",
    data,
  });
  return response;
};

export const getBillingItems = async (billId: any) => {
  const response = await fetchApi({
    endpoint: `/bill/bill-items/${billId}`,
  });
  return response;
};

export const updateBillItem = async (billItemId: any, data: any) => {
  const response = await fetchApi({
    endpoint: `/bill/bill-items/${billItemId}`,
    method: "PATCH",
    data,
  });
  return response;
};

export const deleteBillItem = async (billId: any) => {
  const response = await fetchApi({
    endpoint: `/bill/bill-items/${billId}`,
    method: "DELETE",
  });
  return response;
};

export const getCustomersByShopId = async (shopId: any, queryParams='') => {
  const response = await fetchApi({
    endpoint: `/customer?id=${shopId}&${queryParams}`,
  });
  return response;
};

export const getBankDetailsById = async (id: any, type = "shop") => {
  const response = await fetchApi({
    endpoint: `/bank/${id}?type=${type}`,
  });
  return response;
};

export const createCustomer = async (data: any) => {
  const response = await fetchApi({
    endpoint: "/customer/create",
    method: "POST",
    data,
  });
  return response
};

export const getStockDetailsById = async (stockId: any) => {
  const response = await fetchApi({
    endpoint: `/stock/${stockId}`,
  });
  return response;
};



export const updateCustomer = async (customerId: any, data: any) => {
  const response = await fetchApi({
    endpoint: `/customer/${customerId}`,
    method: "PATCH",
    data,
  });
};



export const deleteCustomer = async (customerId: any) => {
  const response = await fetchApi({
    endpoint: `/customer/${customerId}`,
    method: "DELETE",
  });
  return response;
};

export const getCustomerDetailsById = async (customerId: any) => {
  const response = await fetchApi({
    endpoint: `/customer/${customerId}`,
  });
  return response;
};

export const createStock = async (data: any, checkExisting = true) => {
  const response = await fetchApi({
    endpoint: `/stock/create?checkExisiting=${checkExisting}`,
    method: "POST",
    data,
  });
  return response;
};

export const updateStock = async (stockId: any, data: any) => {
  const response = await fetchApi({
    endpoint: `/stock/${stockId}`,
    method: "PATCH",
    data,
  });
  return response;
};

export const deleteStock = async (stockId: any) => {
  const response = await fetchApi({
    endpoint: `/stock/${stockId}`,
    method: "DELETE",
  });
  return response;
};

export const stockClearAll = async (stockId: any) => {
  const response = await fetchApi({
    endpoint: `/stock/${stockId}/clear-all`,
    method: "DELETE",
  });
  return response;
};

export const createStockItems = async (data: any) => {
  const response = await fetchApi({
    endpoint: `/stock/stock-items/create`,
    method: "POST",
    data,
  });
  return response;
};

export const updateStockItems = async (stockItemId: any, data: any) => {
  const response = await fetchApi({
    endpoint: `/stock/stock-items/${stockItemId}`,
    method: "PATCH",
    data,
  });
  return response
};

export const deleteStockItems = async (stockItemId: any) => {
  const response = await fetchApi({
    endpoint: `/stock/stock-items/${stockItemId}`,
    method: "DELETE",
  });
  return response
};

export const getStocksByShopId = async (shopId: any, queryParams='' as any) => {
  const response = await fetchApi({
    endpoint: `/stock?shopId=${shopId}&${queryParams}`,
  });
  return response;
};

export const getStockReportsByShopId = async (shopId: any, queryParams='' as any) => {
  const response = await fetchApi({
    endpoint: `/reports/stocks?shopId=${shopId}&${queryParams}`,
  });
  return response;
};

