type FrontendEnv = ImportMetaEnv & {
  REACT_APP_CODESPACE_NAME?: string;
  VITE_CODESPACE_NAME?: string;
  VITE_API_BASE_URL?: string;
};

const env = import.meta.env as FrontendEnv;
export const apiBaseUrl = env.VITE_API_BASE_URL
  ?? '';

export async function getJson<T>(path: string): Promise<T> {
  const endpoint = `${apiBaseUrl}${path}`;
  console.log(`Fetching ${endpoint}`);
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
  return response.json() as Promise<T>;
}

export function responseItems<T>(payload: T[] | { results?: T[] } | Record<string, T[]>): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  const collection = Object.values(payload).find(Array.isArray);
  return (collection as T[] | undefined) ?? [];
}
