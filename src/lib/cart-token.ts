// Guest cart এর জন্য browser এ একটা UUID রাখা হয়, যেটা X-Cart-Token header এ যায়।
const KEY = "akhi_cart_token";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "t" + Math.random().toString(36).slice(2) + Date.now().toString(36) + "xxxxxxxx";
}

export function getCartToken(): string {
  if (typeof window === "undefined") return "";
  try {
    let t = window.localStorage.getItem(KEY);
    if (!t || t.length < 16) {
      t = makeId();
      window.localStorage.setItem(KEY, t);
    }
    return t;
  } catch {
    return makeId();
  }
}
