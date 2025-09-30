// src/lib/api.ts
// Helper fetch tanpa `any`, dengan envelope { success?, message?, data }
export const API =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

type FetchOptions = {
  method: HttpMethod;
  path: string;
  body?: unknown;
  withAuth?: boolean;
  headers?: HeadersInit;
};

function authHeader(withAuth?: boolean): HeadersInit {
  if (!withAuth || typeof window === "undefined") return {};
  const token = localStorage.getItem("tt:student_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function isEnvelope(x: unknown): x is ApiEnvelope<unknown> {
  return typeof x === "object" && x !== null && "data" in (x as Record<string, unknown>);
}

async function request<T>({
  method,
  path,
  body,
  withAuth,
  headers,
}: FetchOptions): Promise<ApiEnvelope<T>> {
  const reqHeaders = new Headers(headers ?? {});
  if (body !== undefined && !reqHeaders.has("Content-Type")) {
    reqHeaders.set("Content-Type", "application/json");
  }
  // auth
  for (const [k, v] of Object.entries(authHeader(withAuth))) reqHeaders.set(k, String(v));

  const res = await fetch(`${API}${path}`, {
    method,
    headers: reqHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  // Baca payload apa pun yang dikirim server
  const ct = res.headers.get("content-type") ?? "";
  const payload: unknown = ct.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    const msg =
      (typeof payload === "object" &&
        payload !== null &&
        "message" in (payload as Record<string, unknown>) &&
        String((payload as Record<string, unknown>).message)) ||
      res.statusText ||
      "Request failed";
    throw new Error(msg);
  }

  // BE kita umumnya { success, message, data }
  if (isEnvelope(payload)) {
    return payload as ApiEnvelope<T>;
  }

  // fallback: bungkus jadi { data }
  return { data: payload as T };
}

// Wrapper ber-jenis
export const apiGet = <T>(path: string, withAuth?: boolean) =>
  request<T>({ method: "GET", path, withAuth });

export const apiPost = <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "POST", path, body, withAuth });

export const apiPut =  <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "PUT", path, body, withAuth });

export const apiPatch = <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "PATCH", path, body, withAuth });

export const apiDelete = <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "DELETE", path, body, withAuth });
