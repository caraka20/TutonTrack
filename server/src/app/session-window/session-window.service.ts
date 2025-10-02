import { SessionWindowRepository } from "./session-window.repository"
import { PutSessionWindowsBody } from "./session-window.model"

/** dedup by (sesi, jenis) – last one wins */
function dedup(items: PutSessionWindowsBody["items"]) {
  const m = new Map<string, typeof items[number]>()
  for (const it of items) m.set(`${it.jenis}:${it.sesi}`, it)
  return Array.from(m.values())
}

export class SessionWindowService {
  static list() {
    return SessionWindowRepository.listAll()
  }

  static async put(body: PutSessionWindowsBody) {
    const unique = dedup(body.items)
    const res = await SessionWindowRepository.upsertMany(unique)
    return { upserted: res.count }
  }
}
