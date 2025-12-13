//export const API_BASE_URL = "http://localhost:3000";

// api.ts
export const API_BASE_URL = "http://localhost:3000/api";

export const AUTH_ENDPOINTS = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
};

export const SWEET_ENDPOINTS = {
  list: `${API_BASE_URL}/sweets`,
  search: `${API_BASE_URL}/sweets/search`,
  purchase: (id: string) => `${API_BASE_URL}/sweets/${id}/purchase`,
  restock: (id: string) => `${API_BASE_URL}/sweets/${id}/restock`,
  update: (id: string) => `${API_BASE_URL}/sweets/${id}`,
  delete: (id: string) => `${API_BASE_URL}/sweets/${id}`,
  create: `${API_BASE_URL}/sweets`,
};

