// Pastikan file ini ikut ter-compile (cek tsconfig "include": ["src/**/*"])
// File ini meng-augment type Request dari express-serve-static-core
// dan mengekspor alias UserRequest untuk dipakai di controller.

import type { Request } from "express-serve-static-core";

/** Payload auth student (di-set oleh middleware authStudent) */
export type AuthStudent = { id: number; nim: string };

/** Payload auth admin (di-set oleh middleware authAdmin) */
export type AuthAdmin = { id: number; username: string; role: "OWNER" | "ADMIN" };

/** Module augmentation untuk menambahkan properti ke Request */
declare module "express-serve-static-core" {
  interface Request {
    /** Di-set oleh authStudent() ketika token student valid */
    user?: AuthStudent;
    /** Di-set oleh authAdmin() ketika token admin valid */
    admin?: AuthAdmin;
  }
}

/** Alias Request bergenerics (biar enak dipakai di controller kamu) */
export type UserRequest<P = any, ResB = any, ReqB = any, ReqQ = any> =
  Request<P, ResB, ReqB, ReqQ>;
