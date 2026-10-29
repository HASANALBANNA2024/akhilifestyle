// কার্ট (guest ও চলবে, X-Cart-Token দিয়ে) + কুপন
import { api } from "./client";
import type { CartSummary, CartView } from "@/types";

export const cartApi = {
  get: () => api<CartView>("/cart", { cart: true }),
  count: () => api<{ count: number }>("/cart/count", { cart: true }),
  add: (product_id: number, quantity = 1) =>
    api<CartView>("/cart/items", { method: "POST", body: { product_id, quantity }, cart: true }),
  setQty: (product_id: number, quantity: number) =>
    api<CartView>(`/cart/items/${product_id}`, { method: "PUT", body: { quantity }, cart: true }),
  remove: (product_id: number) => api<CartView>(`/cart/items/${product_id}`, { method: "DELETE", cart: true }),
  clear: () => api<CartView>("/cart", { method: "DELETE", cart: true }),
  summary: (district?: string, coupon_code?: string) =>
    api<CartSummary>("/cart/summary", { cart: true, query: { district, coupon_code } }),
  validateCoupon: (code: string, subtotal: number) =>
    api<{ code: string; discount: number }>("/coupons/validate", { method: "POST", body: { code, subtotal } }),
};
