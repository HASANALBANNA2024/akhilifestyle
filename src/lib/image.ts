import { API_ORIGIN } from "@/lib/api/client";

// ছবি না থাকলে/লোড না হলে এই প্লেসহোল্ডার দেখাবে
export const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' fill='#FDEEF3'/><g fill='none' stroke='#E8A6BC' stroke-width='10' stroke-linecap='round' stroke-linejoin='round'><path d='M140 170h120l14 120H126z'/><path d='M168 170v-14a32 32 0 0 1 64 0v14'/></g></svg>`,
  );

// Backend এর ছবির url relative (/uploads/..) হলে পুরো ঠিকানা বানায়
export function imageUrl(u?: string | null): string {
  if (!u) return PLACEHOLDER;
  if (/^(https?:)?\/\//.test(u) || u.startsWith("data:")) return u;
  return API_ORIGIN + (u.startsWith("/") ? u : "/" + u);
}
