import { apiGet } from "@/lib/api";

export type Course = { id: number; nama: string };

type SuggestEnvelope =
  | Course[]
  | { data?: Course[]; items?: Course[] }
  | { items?: Course[] };

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function isArrayOfCourse(x: unknown): x is Course[] {
  return Array.isArray(x) && x.every(
    (v) => isObject(v) && typeof v["id"] === "number" && typeof v["nama"] === "string",
  );
}

function normItems(body: unknown): Course[] {
  if (isArrayOfCourse(body)) return body;

  if (isObject(body)) {
    const b = body as Record<string, unknown>;
    const d = b["data"];
    if (isArrayOfCourse(d)) return d as Course[];
    if (isObject(d)) {
      const items = (d as Record<string, unknown>)["items"];
      if (isArrayOfCourse(items)) return items as Course[];
    }
    const i2 = b["items"];
    if (isArrayOfCourse(i2)) return i2 as Course[];
  }
  return [];
}

/** GET /api/courses/suggest?q=&limit= */
export async function suggestCourses(q: string, limit = 12): Promise<Course[]> {
  const res = await apiGet<SuggestEnvelope>(`/api/courses/suggest?q=${encodeURIComponent(q)}&limit=${limit}`);
  return normItems(res);
}
