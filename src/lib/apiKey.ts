// Klucz API Claude: tylko w localStorage tej przeglądarki.
const KEY = "claude-api-key";

export function loadApiKey(): string {
  try { return localStorage.getItem(KEY) ?? ""; } catch { return ""; }
}

export function saveApiKey(value: string) {
  try {
    if (value.trim()) localStorage.setItem(KEY, value.trim());
    else localStorage.removeItem(KEY);
  } catch { /* np. tryb prywatny: klucz zostanie tylko do odświeżenia strony */ }
}
