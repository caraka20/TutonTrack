// Helper fetch tanpa any, robust terhadap payload JSON / text / boolean
export const API =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001").replace(/\/$/, "");
export const API_BASE = API;

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

// Error ber-jenis (tanpa any) untuk dipakai di FE
export class ApiError<P = unknown> extends Error {
  readonly status: number;
  readonly payload?: P;

  constructor(message: string, status: number, payload?: P) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

// Ambil token admin dulu, lalu student, lalu legacy "token"
function authHeader(withAuth?: boolean): HeadersInit {
  if (!withAuth || typeof window === "undefined") return {};
  const adminToken = localStorage.getItem("tt:admin_token");
  const studentToken = localStorage.getItem("tt:student_token");
  const legacyToken = localStorage.getItem("token");
  const token = adminToken || studentToken || legacyToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function isEnvelope(x: unknown): x is ApiEnvelope<unknown> {
  return typeof x === "object" && x !== null && "data" in (x as Record<string, unknown>);
}

// Parser universal: baca text → coba JSON.parse → fallback boolean/string
function parseBodySafely(raw: string): unknown {
  const t = raw?.trim() ?? "";
  if (!t) return undefined;
  try {
    return JSON.parse(t);
  } catch {
    if (t === "true") return true;
    if (t === "false") return false;
    return t; // biarkan sebagai string
  }
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

  const url = `${API}${path}`;
  const init: RequestInit = {
    method,
    headers: reqHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  };

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(`[api] → ${method} ${url}`, { withAuth: !!withAuth, body });
  }

  const res = await fetch(url, init);

  // Selalu baca sebagai text, lalu parse manual
  const rawText = await res.text();
  const payload = parseBodySafely(rawText);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(`[api] ← ${res.status} ${method} ${url}`, {
      ok: res.ok,
      headers: Object.fromEntries(res.headers.entries()),
      rawText,
      parsed: payload,
    });
  }

  if (!res.ok) {
    // Pesan error terbaik yang ada
    const msg =
      (typeof payload === "object" &&
        payload !== null &&
        "message" in (payload as Record<string, unknown>) &&
        String((payload as Record<string, unknown>).message)) ||
      (typeof payload === "string" && payload) ||
      res.statusText ||
      "Request failed";

    throw new ApiError(msg, res.status, payload);
  }

  // Kalau server kirim {success,message,data}
  if (isEnvelope(payload)) {
    return payload as ApiEnvelope<T>;
  }

  // Kalau server kirim langsung nilai (objek/array/boolean/string)
  return { data: payload as T };
}

// Wrappers
export const apiGet = <T>(path: string, withAuth?: boolean) =>
  request<T>({ method: "GET", path, withAuth });

export const apiPost = <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "POST", path, body, withAuth });

export const apiPut = <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "PUT", path, body, withAuth });

export const apiPatch = <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "PATCH", path, body, withAuth });

export const apiDelete = <T, B = unknown>(path: string, body?: B, withAuth?: boolean) =>
  request<T>({ method: "DELETE", path, body, withAuth });

// Serbaguna
export const api = <T>(
  path: string,
  init?: { method?: HttpMethod; body?: unknown; headers?: HeadersInit },
  withAuth?: boolean,
) =>
  request<T>({
    method: (init?.method ?? "GET") as HttpMethod,
    path,
    body: init?.body,
    headers: init?.headers,
    withAuth,
  });

export default api;
