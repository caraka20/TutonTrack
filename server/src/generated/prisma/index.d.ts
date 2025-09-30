
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Student
 * =============== Core ===============
 * *
 *  * Pendaftaran: nama, nim, noHp. Login: nim ATAU noHp (dua-duanya unik).
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model CourseDeadline
 * * Master deadline per (course, jenis, sesi) — di-set oleh OWNER/ADMIN
 */
export type CourseDeadline = $Result.DefaultSelection<Prisma.$CourseDeadlinePayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model TutonItem
 * *
 *  * Item per sesi:
 *  * - Diskusi 1..8
 *  * - Absen   1..8
 *  * - Tugas   3,5,7
 *  * - QUIZ    (opsional, sesi fleksibel)
 */
export type TutonItem = $Result.DefaultSelection<Prisma.$TutonItemPayload>
/**
 * Model Reminder
 * =============== Reminder (manual + preferensi WEB) ===============
 * *
 *  * Dibuat manual oleh admin (source=ADMIN, createdByAdminId != null) atau oleh user/web (source=WEB, createdByAdminId null).
 *  * Admin menekan tombol “Kirim” → update status=SENT, sentAt=now().
 *  * Tambahan:
 *  *  - offsetMin & active: preferensi pengingat (WEB) per item (mis. H-1 = 1440 menit).
 */
export type Reminder = $Result.DefaultSelection<Prisma.$ReminderPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const JenisTugas: {
  DISKUSI: 'DISKUSI',
  ABSEN: 'ABSEN',
  TUGAS: 'TUGAS',
  QUIZ: 'QUIZ'
};

export type JenisTugas = (typeof JenisTugas)[keyof typeof JenisTugas]


export const StatusTugas: {
  BELUM: 'BELUM',
  SELESAI: 'SELESAI'
};

export type StatusTugas = (typeof StatusTugas)[keyof typeof StatusTugas]


export const AdminRole: {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN'
};

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole]


export const ReminderSource: {
  ADMIN: 'ADMIN',
  WEB: 'WEB'
};

export type ReminderSource = (typeof ReminderSource)[keyof typeof ReminderSource]


export const ReminderStatus: {
  PENDING: 'PENDING',
  SENT: 'SENT',
  CANCELLED: 'CANCELLED'
};

export type ReminderStatus = (typeof ReminderStatus)[keyof typeof ReminderStatus]


export const ReminderChannel: {
  WA: 'WA'
};

export type ReminderChannel = (typeof ReminderChannel)[keyof typeof ReminderChannel]

}

export type JenisTugas = $Enums.JenisTugas

export const JenisTugas: typeof $Enums.JenisTugas

export type StatusTugas = $Enums.StatusTugas

export const StatusTugas: typeof $Enums.StatusTugas

export type AdminRole = $Enums.AdminRole

export const AdminRole: typeof $Enums.AdminRole

export type ReminderSource = $Enums.ReminderSource

export const ReminderSource: typeof $Enums.ReminderSource

export type ReminderStatus = $Enums.ReminderStatus

export const ReminderStatus: typeof $Enums.ReminderStatus

export type ReminderChannel = $Enums.ReminderChannel

export const ReminderChannel: typeof $Enums.ReminderChannel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseDeadline`: Exposes CRUD operations for the **CourseDeadline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseDeadlines
    * const courseDeadlines = await prisma.courseDeadline.findMany()
    * ```
    */
  get courseDeadline(): Prisma.CourseDeadlineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tutonItem`: Exposes CRUD operations for the **TutonItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TutonItems
    * const tutonItems = await prisma.tutonItem.findMany()
    * ```
    */
  get tutonItem(): Prisma.TutonItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reminder`: Exposes CRUD operations for the **Reminder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reminders
    * const reminders = await prisma.reminder.findMany()
    * ```
    */
  get reminder(): Prisma.ReminderDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Admin: 'Admin',
    Student: 'Student',
    Course: 'Course',
    CourseDeadline: 'CourseDeadline',
    Enrollment: 'Enrollment',
    TutonItem: 'TutonItem',
    Reminder: 'Reminder'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "admin" | "student" | "course" | "courseDeadline" | "enrollment" | "tutonItem" | "reminder"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      CourseDeadline: {
        payload: Prisma.$CourseDeadlinePayload<ExtArgs>
        fields: Prisma.CourseDeadlineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseDeadlineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseDeadlineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload>
          }
          findFirst: {
            args: Prisma.CourseDeadlineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseDeadlineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload>
          }
          findMany: {
            args: Prisma.CourseDeadlineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload>[]
          }
          create: {
            args: Prisma.CourseDeadlineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload>
          }
          createMany: {
            args: Prisma.CourseDeadlineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseDeadlineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload>
          }
          update: {
            args: Prisma.CourseDeadlineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeadlineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseDeadlineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseDeadlineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseDeadlinePayload>
          }
          aggregate: {
            args: Prisma.CourseDeadlineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseDeadline>
          }
          groupBy: {
            args: Prisma.CourseDeadlineGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseDeadlineGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseDeadlineCountArgs<ExtArgs>
            result: $Utils.Optional<CourseDeadlineCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      TutonItem: {
        payload: Prisma.$TutonItemPayload<ExtArgs>
        fields: Prisma.TutonItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TutonItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TutonItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload>
          }
          findFirst: {
            args: Prisma.TutonItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TutonItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload>
          }
          findMany: {
            args: Prisma.TutonItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload>[]
          }
          create: {
            args: Prisma.TutonItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload>
          }
          createMany: {
            args: Prisma.TutonItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TutonItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload>
          }
          update: {
            args: Prisma.TutonItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload>
          }
          deleteMany: {
            args: Prisma.TutonItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TutonItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TutonItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutonItemPayload>
          }
          aggregate: {
            args: Prisma.TutonItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTutonItem>
          }
          groupBy: {
            args: Prisma.TutonItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<TutonItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.TutonItemCountArgs<ExtArgs>
            result: $Utils.Optional<TutonItemCountAggregateOutputType> | number
          }
        }
      }
      Reminder: {
        payload: Prisma.$ReminderPayload<ExtArgs>
        fields: Prisma.ReminderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReminderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReminderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findFirst: {
            args: Prisma.ReminderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReminderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findMany: {
            args: Prisma.ReminderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          create: {
            args: Prisma.ReminderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          createMany: {
            args: Prisma.ReminderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReminderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          update: {
            args: Prisma.ReminderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          deleteMany: {
            args: Prisma.ReminderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReminderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReminderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          aggregate: {
            args: Prisma.ReminderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReminder>
          }
          groupBy: {
            args: Prisma.ReminderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReminderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReminderCountArgs<ExtArgs>
            result: $Utils.Optional<ReminderCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    admin?: AdminOmit
    student?: StudentOmit
    course?: CourseOmit
    courseDeadline?: CourseDeadlineOmit
    enrollment?: EnrollmentOmit
    tutonItem?: TutonItemOmit
    reminder?: ReminderOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    reminders: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reminders?: boolean | AdminCountOutputTypeCountRemindersArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    enrollments: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | StudentCountOutputTypeCountEnrollmentsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    enrollments: number
    courseDeadlines: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | CourseCountOutputTypeCountEnrollmentsArgs
    courseDeadlines?: boolean | CourseCountOutputTypeCountCourseDeadlinesArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountCourseDeadlinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseDeadlineWhereInput
  }


  /**
   * Count Type EnrollmentCountOutputType
   */

  export type EnrollmentCountOutputType = {
    items: number
  }

  export type EnrollmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | EnrollmentCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * EnrollmentCountOutputType without action
   */
  export type EnrollmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnrollmentCountOutputType
     */
    select?: EnrollmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EnrollmentCountOutputType without action
   */
  export type EnrollmentCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TutonItemWhereInput
  }


  /**
   * Count Type TutonItemCountOutputType
   */

  export type TutonItemCountOutputType = {
    reminders: number
  }

  export type TutonItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reminders?: boolean | TutonItemCountOutputTypeCountRemindersArgs
  }

  // Custom InputTypes
  /**
   * TutonItemCountOutputType without action
   */
  export type TutonItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItemCountOutputType
     */
    select?: TutonItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TutonItemCountOutputType without action
   */
  export type TutonItemCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    username: string | null
    passwordHash: string | null
    role: $Enums.AdminRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    username: string | null
    passwordHash: string | null
    role: $Enums.AdminRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    username: number
    passwordHash: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    username: string
    passwordHash: string
    role: $Enums.AdminRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reminders?: boolean | Admin$remindersArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>



  export type AdminSelectScalar = {
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "passwordHash" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reminders?: boolean | Admin$remindersArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      passwordHash: string
      role: $Enums.AdminRole
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reminders<T extends Admin$remindersArgs<ExtArgs> = {}>(args?: Subset<T, Admin$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly username: FieldRef<"Admin", 'String'>
    readonly passwordHash: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'AdminRole'>
    readonly isActive: FieldRef<"Admin", 'Boolean'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin.reminders
   */
  export type Admin$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    nim: string | null
    noHp: string | null
    nama: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    nim: string | null
    noHp: string | null
    nama: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    nim: number
    noHp: number
    nama: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    nim?: true
    noHp?: true
    nama?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    nim?: true
    noHp?: true
    nama?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    nim?: true
    noHp?: true
    nama?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    nim: string
    noHp: string
    nama: string
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nim?: boolean
    noHp?: boolean
    nama?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    enrollments?: boolean | Student$enrollmentsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>



  export type StudentSelectScalar = {
    id?: boolean
    nim?: boolean
    noHp?: boolean
    nama?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nim" | "noHp" | "nama" | "createdAt" | "updatedAt", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | Student$enrollmentsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nim: string
      noHp: string
      nama: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends Student$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Student$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly nim: FieldRef<"Student", 'String'>
    readonly noHp: FieldRef<"Student", 'String'>
    readonly nama: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.enrollments
   */
  export type Student$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    id: number | null
  }

  export type CourseSumAggregateOutputType = {
    id: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: number | null
    nama: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: number | null
    nama: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    nama: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    id?: true
  }

  export type CourseSumAggregateInputType = {
    id?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    nama?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    nama?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    nama?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: number
    nama: string
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    courseDeadlines?: boolean | Course$courseDeadlinesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>



  export type CourseSelectScalar = {
    id?: boolean
    nama?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "createdAt" | "updatedAt", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    courseDeadlines?: boolean | Course$courseDeadlinesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      courseDeadlines: Prisma.$CourseDeadlinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nama: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends Course$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    courseDeadlines<T extends Course$courseDeadlinesArgs<ExtArgs> = {}>(args?: Subset<T, Course$courseDeadlinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'Int'>
    readonly nama: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.enrollments
   */
  export type Course$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Course.courseDeadlines
   */
  export type Course$courseDeadlinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    where?: CourseDeadlineWhereInput
    orderBy?: CourseDeadlineOrderByWithRelationInput | CourseDeadlineOrderByWithRelationInput[]
    cursor?: CourseDeadlineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseDeadlineScalarFieldEnum | CourseDeadlineScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model CourseDeadline
   */

  export type AggregateCourseDeadline = {
    _count: CourseDeadlineCountAggregateOutputType | null
    _avg: CourseDeadlineAvgAggregateOutputType | null
    _sum: CourseDeadlineSumAggregateOutputType | null
    _min: CourseDeadlineMinAggregateOutputType | null
    _max: CourseDeadlineMaxAggregateOutputType | null
  }

  export type CourseDeadlineAvgAggregateOutputType = {
    id: number | null
    courseId: number | null
    sesi: number | null
  }

  export type CourseDeadlineSumAggregateOutputType = {
    id: number | null
    courseId: number | null
    sesi: number | null
  }

  export type CourseDeadlineMinAggregateOutputType = {
    id: number | null
    courseId: number | null
    jenis: $Enums.JenisTugas | null
    sesi: number | null
    deadlineAt: Date | null
  }

  export type CourseDeadlineMaxAggregateOutputType = {
    id: number | null
    courseId: number | null
    jenis: $Enums.JenisTugas | null
    sesi: number | null
    deadlineAt: Date | null
  }

  export type CourseDeadlineCountAggregateOutputType = {
    id: number
    courseId: number
    jenis: number
    sesi: number
    deadlineAt: number
    _all: number
  }


  export type CourseDeadlineAvgAggregateInputType = {
    id?: true
    courseId?: true
    sesi?: true
  }

  export type CourseDeadlineSumAggregateInputType = {
    id?: true
    courseId?: true
    sesi?: true
  }

  export type CourseDeadlineMinAggregateInputType = {
    id?: true
    courseId?: true
    jenis?: true
    sesi?: true
    deadlineAt?: true
  }

  export type CourseDeadlineMaxAggregateInputType = {
    id?: true
    courseId?: true
    jenis?: true
    sesi?: true
    deadlineAt?: true
  }

  export type CourseDeadlineCountAggregateInputType = {
    id?: true
    courseId?: true
    jenis?: true
    sesi?: true
    deadlineAt?: true
    _all?: true
  }

  export type CourseDeadlineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseDeadline to aggregate.
     */
    where?: CourseDeadlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseDeadlines to fetch.
     */
    orderBy?: CourseDeadlineOrderByWithRelationInput | CourseDeadlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseDeadlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseDeadlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseDeadlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseDeadlines
    **/
    _count?: true | CourseDeadlineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseDeadlineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseDeadlineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseDeadlineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseDeadlineMaxAggregateInputType
  }

  export type GetCourseDeadlineAggregateType<T extends CourseDeadlineAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseDeadline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseDeadline[P]>
      : GetScalarType<T[P], AggregateCourseDeadline[P]>
  }




  export type CourseDeadlineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseDeadlineWhereInput
    orderBy?: CourseDeadlineOrderByWithAggregationInput | CourseDeadlineOrderByWithAggregationInput[]
    by: CourseDeadlineScalarFieldEnum[] | CourseDeadlineScalarFieldEnum
    having?: CourseDeadlineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseDeadlineCountAggregateInputType | true
    _avg?: CourseDeadlineAvgAggregateInputType
    _sum?: CourseDeadlineSumAggregateInputType
    _min?: CourseDeadlineMinAggregateInputType
    _max?: CourseDeadlineMaxAggregateInputType
  }

  export type CourseDeadlineGroupByOutputType = {
    id: number
    courseId: number
    jenis: $Enums.JenisTugas
    sesi: number
    deadlineAt: Date | null
    _count: CourseDeadlineCountAggregateOutputType | null
    _avg: CourseDeadlineAvgAggregateOutputType | null
    _sum: CourseDeadlineSumAggregateOutputType | null
    _min: CourseDeadlineMinAggregateOutputType | null
    _max: CourseDeadlineMaxAggregateOutputType | null
  }

  type GetCourseDeadlineGroupByPayload<T extends CourseDeadlineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseDeadlineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseDeadlineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseDeadlineGroupByOutputType[P]>
            : GetScalarType<T[P], CourseDeadlineGroupByOutputType[P]>
        }
      >
    >


  export type CourseDeadlineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    jenis?: boolean
    sesi?: boolean
    deadlineAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseDeadline"]>



  export type CourseDeadlineSelectScalar = {
    id?: boolean
    courseId?: boolean
    jenis?: boolean
    sesi?: boolean
    deadlineAt?: boolean
  }

  export type CourseDeadlineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "jenis" | "sesi" | "deadlineAt", ExtArgs["result"]["courseDeadline"]>
  export type CourseDeadlineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $CourseDeadlinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseDeadline"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      courseId: number
      jenis: $Enums.JenisTugas
      sesi: number
      deadlineAt: Date | null
    }, ExtArgs["result"]["courseDeadline"]>
    composites: {}
  }

  type CourseDeadlineGetPayload<S extends boolean | null | undefined | CourseDeadlineDefaultArgs> = $Result.GetResult<Prisma.$CourseDeadlinePayload, S>

  type CourseDeadlineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseDeadlineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseDeadlineCountAggregateInputType | true
    }

  export interface CourseDeadlineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseDeadline'], meta: { name: 'CourseDeadline' } }
    /**
     * Find zero or one CourseDeadline that matches the filter.
     * @param {CourseDeadlineFindUniqueArgs} args - Arguments to find a CourseDeadline
     * @example
     * // Get one CourseDeadline
     * const courseDeadline = await prisma.courseDeadline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseDeadlineFindUniqueArgs>(args: SelectSubset<T, CourseDeadlineFindUniqueArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseDeadline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseDeadlineFindUniqueOrThrowArgs} args - Arguments to find a CourseDeadline
     * @example
     * // Get one CourseDeadline
     * const courseDeadline = await prisma.courseDeadline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseDeadlineFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseDeadlineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseDeadline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseDeadlineFindFirstArgs} args - Arguments to find a CourseDeadline
     * @example
     * // Get one CourseDeadline
     * const courseDeadline = await prisma.courseDeadline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseDeadlineFindFirstArgs>(args?: SelectSubset<T, CourseDeadlineFindFirstArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseDeadline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseDeadlineFindFirstOrThrowArgs} args - Arguments to find a CourseDeadline
     * @example
     * // Get one CourseDeadline
     * const courseDeadline = await prisma.courseDeadline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseDeadlineFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseDeadlineFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseDeadlines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseDeadlineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseDeadlines
     * const courseDeadlines = await prisma.courseDeadline.findMany()
     * 
     * // Get first 10 CourseDeadlines
     * const courseDeadlines = await prisma.courseDeadline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseDeadlineWithIdOnly = await prisma.courseDeadline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseDeadlineFindManyArgs>(args?: SelectSubset<T, CourseDeadlineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseDeadline.
     * @param {CourseDeadlineCreateArgs} args - Arguments to create a CourseDeadline.
     * @example
     * // Create one CourseDeadline
     * const CourseDeadline = await prisma.courseDeadline.create({
     *   data: {
     *     // ... data to create a CourseDeadline
     *   }
     * })
     * 
     */
    create<T extends CourseDeadlineCreateArgs>(args: SelectSubset<T, CourseDeadlineCreateArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseDeadlines.
     * @param {CourseDeadlineCreateManyArgs} args - Arguments to create many CourseDeadlines.
     * @example
     * // Create many CourseDeadlines
     * const courseDeadline = await prisma.courseDeadline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseDeadlineCreateManyArgs>(args?: SelectSubset<T, CourseDeadlineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CourseDeadline.
     * @param {CourseDeadlineDeleteArgs} args - Arguments to delete one CourseDeadline.
     * @example
     * // Delete one CourseDeadline
     * const CourseDeadline = await prisma.courseDeadline.delete({
     *   where: {
     *     // ... filter to delete one CourseDeadline
     *   }
     * })
     * 
     */
    delete<T extends CourseDeadlineDeleteArgs>(args: SelectSubset<T, CourseDeadlineDeleteArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseDeadline.
     * @param {CourseDeadlineUpdateArgs} args - Arguments to update one CourseDeadline.
     * @example
     * // Update one CourseDeadline
     * const courseDeadline = await prisma.courseDeadline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseDeadlineUpdateArgs>(args: SelectSubset<T, CourseDeadlineUpdateArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseDeadlines.
     * @param {CourseDeadlineDeleteManyArgs} args - Arguments to filter CourseDeadlines to delete.
     * @example
     * // Delete a few CourseDeadlines
     * const { count } = await prisma.courseDeadline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeadlineDeleteManyArgs>(args?: SelectSubset<T, CourseDeadlineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseDeadlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseDeadlineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseDeadlines
     * const courseDeadline = await prisma.courseDeadline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseDeadlineUpdateManyArgs>(args: SelectSubset<T, CourseDeadlineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseDeadline.
     * @param {CourseDeadlineUpsertArgs} args - Arguments to update or create a CourseDeadline.
     * @example
     * // Update or create a CourseDeadline
     * const courseDeadline = await prisma.courseDeadline.upsert({
     *   create: {
     *     // ... data to create a CourseDeadline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseDeadline we want to update
     *   }
     * })
     */
    upsert<T extends CourseDeadlineUpsertArgs>(args: SelectSubset<T, CourseDeadlineUpsertArgs<ExtArgs>>): Prisma__CourseDeadlineClient<$Result.GetResult<Prisma.$CourseDeadlinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CourseDeadlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseDeadlineCountArgs} args - Arguments to filter CourseDeadlines to count.
     * @example
     * // Count the number of CourseDeadlines
     * const count = await prisma.courseDeadline.count({
     *   where: {
     *     // ... the filter for the CourseDeadlines we want to count
     *   }
     * })
    **/
    count<T extends CourseDeadlineCountArgs>(
      args?: Subset<T, CourseDeadlineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseDeadlineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseDeadline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseDeadlineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseDeadlineAggregateArgs>(args: Subset<T, CourseDeadlineAggregateArgs>): Prisma.PrismaPromise<GetCourseDeadlineAggregateType<T>>

    /**
     * Group by CourseDeadline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseDeadlineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseDeadlineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseDeadlineGroupByArgs['orderBy'] }
        : { orderBy?: CourseDeadlineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseDeadlineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseDeadlineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseDeadline model
   */
  readonly fields: CourseDeadlineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseDeadline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseDeadlineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CourseDeadline model
   */
  interface CourseDeadlineFieldRefs {
    readonly id: FieldRef<"CourseDeadline", 'Int'>
    readonly courseId: FieldRef<"CourseDeadline", 'Int'>
    readonly jenis: FieldRef<"CourseDeadline", 'JenisTugas'>
    readonly sesi: FieldRef<"CourseDeadline", 'Int'>
    readonly deadlineAt: FieldRef<"CourseDeadline", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CourseDeadline findUnique
   */
  export type CourseDeadlineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * Filter, which CourseDeadline to fetch.
     */
    where: CourseDeadlineWhereUniqueInput
  }

  /**
   * CourseDeadline findUniqueOrThrow
   */
  export type CourseDeadlineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * Filter, which CourseDeadline to fetch.
     */
    where: CourseDeadlineWhereUniqueInput
  }

  /**
   * CourseDeadline findFirst
   */
  export type CourseDeadlineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * Filter, which CourseDeadline to fetch.
     */
    where?: CourseDeadlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseDeadlines to fetch.
     */
    orderBy?: CourseDeadlineOrderByWithRelationInput | CourseDeadlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseDeadlines.
     */
    cursor?: CourseDeadlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseDeadlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseDeadlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseDeadlines.
     */
    distinct?: CourseDeadlineScalarFieldEnum | CourseDeadlineScalarFieldEnum[]
  }

  /**
   * CourseDeadline findFirstOrThrow
   */
  export type CourseDeadlineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * Filter, which CourseDeadline to fetch.
     */
    where?: CourseDeadlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseDeadlines to fetch.
     */
    orderBy?: CourseDeadlineOrderByWithRelationInput | CourseDeadlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseDeadlines.
     */
    cursor?: CourseDeadlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseDeadlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseDeadlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseDeadlines.
     */
    distinct?: CourseDeadlineScalarFieldEnum | CourseDeadlineScalarFieldEnum[]
  }

  /**
   * CourseDeadline findMany
   */
  export type CourseDeadlineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * Filter, which CourseDeadlines to fetch.
     */
    where?: CourseDeadlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseDeadlines to fetch.
     */
    orderBy?: CourseDeadlineOrderByWithRelationInput | CourseDeadlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseDeadlines.
     */
    cursor?: CourseDeadlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseDeadlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseDeadlines.
     */
    skip?: number
    distinct?: CourseDeadlineScalarFieldEnum | CourseDeadlineScalarFieldEnum[]
  }

  /**
   * CourseDeadline create
   */
  export type CourseDeadlineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseDeadline.
     */
    data: XOR<CourseDeadlineCreateInput, CourseDeadlineUncheckedCreateInput>
  }

  /**
   * CourseDeadline createMany
   */
  export type CourseDeadlineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseDeadlines.
     */
    data: CourseDeadlineCreateManyInput | CourseDeadlineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseDeadline update
   */
  export type CourseDeadlineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseDeadline.
     */
    data: XOR<CourseDeadlineUpdateInput, CourseDeadlineUncheckedUpdateInput>
    /**
     * Choose, which CourseDeadline to update.
     */
    where: CourseDeadlineWhereUniqueInput
  }

  /**
   * CourseDeadline updateMany
   */
  export type CourseDeadlineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseDeadlines.
     */
    data: XOR<CourseDeadlineUpdateManyMutationInput, CourseDeadlineUncheckedUpdateManyInput>
    /**
     * Filter which CourseDeadlines to update
     */
    where?: CourseDeadlineWhereInput
    /**
     * Limit how many CourseDeadlines to update.
     */
    limit?: number
  }

  /**
   * CourseDeadline upsert
   */
  export type CourseDeadlineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseDeadline to update in case it exists.
     */
    where: CourseDeadlineWhereUniqueInput
    /**
     * In case the CourseDeadline found by the `where` argument doesn't exist, create a new CourseDeadline with this data.
     */
    create: XOR<CourseDeadlineCreateInput, CourseDeadlineUncheckedCreateInput>
    /**
     * In case the CourseDeadline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseDeadlineUpdateInput, CourseDeadlineUncheckedUpdateInput>
  }

  /**
   * CourseDeadline delete
   */
  export type CourseDeadlineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
    /**
     * Filter which CourseDeadline to delete.
     */
    where: CourseDeadlineWhereUniqueInput
  }

  /**
   * CourseDeadline deleteMany
   */
  export type CourseDeadlineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseDeadlines to delete
     */
    where?: CourseDeadlineWhereInput
    /**
     * Limit how many CourseDeadlines to delete.
     */
    limit?: number
  }

  /**
   * CourseDeadline without action
   */
  export type CourseDeadlineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseDeadline
     */
    select?: CourseDeadlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseDeadline
     */
    omit?: CourseDeadlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseDeadlineInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
  }

  export type EnrollmentSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EnrollmentAvgAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
  }

  export type EnrollmentSumAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
  }

  export type EnrollmentMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnrollmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnrollmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _avg?: EnrollmentAvgAggregateInputType
    _sum?: EnrollmentSumAggregateInputType
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: number
    studentId: number
    courseId: number
    createdAt: Date
    updatedAt: Date
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | Enrollment$itemsArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    _count?: boolean | EnrollmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>



  export type EnrollmentSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "createdAt" | "updatedAt", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Enrollment$itemsArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    _count?: boolean | EnrollmentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      items: Prisma.$TutonItemPayload<ExtArgs>[]
      student: Prisma.$StudentPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      courseId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Enrollment$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Enrollment$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'Int'>
    readonly studentId: FieldRef<"Enrollment", 'Int'>
    readonly courseId: FieldRef<"Enrollment", 'Int'>
    readonly createdAt: FieldRef<"Enrollment", 'DateTime'>
    readonly updatedAt: FieldRef<"Enrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment.items
   */
  export type Enrollment$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    where?: TutonItemWhereInput
    orderBy?: TutonItemOrderByWithRelationInput | TutonItemOrderByWithRelationInput[]
    cursor?: TutonItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TutonItemScalarFieldEnum | TutonItemScalarFieldEnum[]
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model TutonItem
   */

  export type AggregateTutonItem = {
    _count: TutonItemCountAggregateOutputType | null
    _avg: TutonItemAvgAggregateOutputType | null
    _sum: TutonItemSumAggregateOutputType | null
    _min: TutonItemMinAggregateOutputType | null
    _max: TutonItemMaxAggregateOutputType | null
  }

  export type TutonItemAvgAggregateOutputType = {
    id: number | null
    enrollmentId: number | null
    sesi: number | null
    nilai: number | null
  }

  export type TutonItemSumAggregateOutputType = {
    id: number | null
    enrollmentId: number | null
    sesi: number | null
    nilai: number | null
  }

  export type TutonItemMinAggregateOutputType = {
    id: number | null
    enrollmentId: number | null
    jenis: $Enums.JenisTugas | null
    sesi: number | null
    status: $Enums.StatusTugas | null
    nilai: number | null
    deskripsi: string | null
    deadlineAt: Date | null
    selesaiAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TutonItemMaxAggregateOutputType = {
    id: number | null
    enrollmentId: number | null
    jenis: $Enums.JenisTugas | null
    sesi: number | null
    status: $Enums.StatusTugas | null
    nilai: number | null
    deskripsi: string | null
    deadlineAt: Date | null
    selesaiAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TutonItemCountAggregateOutputType = {
    id: number
    enrollmentId: number
    jenis: number
    sesi: number
    status: number
    nilai: number
    deskripsi: number
    deadlineAt: number
    selesaiAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TutonItemAvgAggregateInputType = {
    id?: true
    enrollmentId?: true
    sesi?: true
    nilai?: true
  }

  export type TutonItemSumAggregateInputType = {
    id?: true
    enrollmentId?: true
    sesi?: true
    nilai?: true
  }

  export type TutonItemMinAggregateInputType = {
    id?: true
    enrollmentId?: true
    jenis?: true
    sesi?: true
    status?: true
    nilai?: true
    deskripsi?: true
    deadlineAt?: true
    selesaiAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TutonItemMaxAggregateInputType = {
    id?: true
    enrollmentId?: true
    jenis?: true
    sesi?: true
    status?: true
    nilai?: true
    deskripsi?: true
    deadlineAt?: true
    selesaiAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TutonItemCountAggregateInputType = {
    id?: true
    enrollmentId?: true
    jenis?: true
    sesi?: true
    status?: true
    nilai?: true
    deskripsi?: true
    deadlineAt?: true
    selesaiAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TutonItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TutonItem to aggregate.
     */
    where?: TutonItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutonItems to fetch.
     */
    orderBy?: TutonItemOrderByWithRelationInput | TutonItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TutonItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutonItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutonItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TutonItems
    **/
    _count?: true | TutonItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TutonItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TutonItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TutonItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TutonItemMaxAggregateInputType
  }

  export type GetTutonItemAggregateType<T extends TutonItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTutonItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTutonItem[P]>
      : GetScalarType<T[P], AggregateTutonItem[P]>
  }




  export type TutonItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TutonItemWhereInput
    orderBy?: TutonItemOrderByWithAggregationInput | TutonItemOrderByWithAggregationInput[]
    by: TutonItemScalarFieldEnum[] | TutonItemScalarFieldEnum
    having?: TutonItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TutonItemCountAggregateInputType | true
    _avg?: TutonItemAvgAggregateInputType
    _sum?: TutonItemSumAggregateInputType
    _min?: TutonItemMinAggregateInputType
    _max?: TutonItemMaxAggregateInputType
  }

  export type TutonItemGroupByOutputType = {
    id: number
    enrollmentId: number
    jenis: $Enums.JenisTugas
    sesi: number
    status: $Enums.StatusTugas
    nilai: number | null
    deskripsi: string | null
    deadlineAt: Date | null
    selesaiAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TutonItemCountAggregateOutputType | null
    _avg: TutonItemAvgAggregateOutputType | null
    _sum: TutonItemSumAggregateOutputType | null
    _min: TutonItemMinAggregateOutputType | null
    _max: TutonItemMaxAggregateOutputType | null
  }

  type GetTutonItemGroupByPayload<T extends TutonItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TutonItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TutonItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TutonItemGroupByOutputType[P]>
            : GetScalarType<T[P], TutonItemGroupByOutputType[P]>
        }
      >
    >


  export type TutonItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enrollmentId?: boolean
    jenis?: boolean
    sesi?: boolean
    status?: boolean
    nilai?: boolean
    deskripsi?: boolean
    deadlineAt?: boolean
    selesaiAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reminders?: boolean | TutonItem$remindersArgs<ExtArgs>
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    _count?: boolean | TutonItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tutonItem"]>



  export type TutonItemSelectScalar = {
    id?: boolean
    enrollmentId?: boolean
    jenis?: boolean
    sesi?: boolean
    status?: boolean
    nilai?: boolean
    deskripsi?: boolean
    deadlineAt?: boolean
    selesaiAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TutonItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "enrollmentId" | "jenis" | "sesi" | "status" | "nilai" | "deskripsi" | "deadlineAt" | "selesaiAt" | "createdAt" | "updatedAt", ExtArgs["result"]["tutonItem"]>
  export type TutonItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reminders?: boolean | TutonItem$remindersArgs<ExtArgs>
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    _count?: boolean | TutonItemCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TutonItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TutonItem"
    objects: {
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
      enrollment: Prisma.$EnrollmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      enrollmentId: number
      jenis: $Enums.JenisTugas
      sesi: number
      status: $Enums.StatusTugas
      nilai: number | null
      deskripsi: string | null
      deadlineAt: Date | null
      selesaiAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tutonItem"]>
    composites: {}
  }

  type TutonItemGetPayload<S extends boolean | null | undefined | TutonItemDefaultArgs> = $Result.GetResult<Prisma.$TutonItemPayload, S>

  type TutonItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TutonItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TutonItemCountAggregateInputType | true
    }

  export interface TutonItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TutonItem'], meta: { name: 'TutonItem' } }
    /**
     * Find zero or one TutonItem that matches the filter.
     * @param {TutonItemFindUniqueArgs} args - Arguments to find a TutonItem
     * @example
     * // Get one TutonItem
     * const tutonItem = await prisma.tutonItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TutonItemFindUniqueArgs>(args: SelectSubset<T, TutonItemFindUniqueArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TutonItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TutonItemFindUniqueOrThrowArgs} args - Arguments to find a TutonItem
     * @example
     * // Get one TutonItem
     * const tutonItem = await prisma.tutonItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TutonItemFindUniqueOrThrowArgs>(args: SelectSubset<T, TutonItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TutonItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutonItemFindFirstArgs} args - Arguments to find a TutonItem
     * @example
     * // Get one TutonItem
     * const tutonItem = await prisma.tutonItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TutonItemFindFirstArgs>(args?: SelectSubset<T, TutonItemFindFirstArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TutonItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutonItemFindFirstOrThrowArgs} args - Arguments to find a TutonItem
     * @example
     * // Get one TutonItem
     * const tutonItem = await prisma.tutonItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TutonItemFindFirstOrThrowArgs>(args?: SelectSubset<T, TutonItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TutonItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutonItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TutonItems
     * const tutonItems = await prisma.tutonItem.findMany()
     * 
     * // Get first 10 TutonItems
     * const tutonItems = await prisma.tutonItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tutonItemWithIdOnly = await prisma.tutonItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TutonItemFindManyArgs>(args?: SelectSubset<T, TutonItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TutonItem.
     * @param {TutonItemCreateArgs} args - Arguments to create a TutonItem.
     * @example
     * // Create one TutonItem
     * const TutonItem = await prisma.tutonItem.create({
     *   data: {
     *     // ... data to create a TutonItem
     *   }
     * })
     * 
     */
    create<T extends TutonItemCreateArgs>(args: SelectSubset<T, TutonItemCreateArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TutonItems.
     * @param {TutonItemCreateManyArgs} args - Arguments to create many TutonItems.
     * @example
     * // Create many TutonItems
     * const tutonItem = await prisma.tutonItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TutonItemCreateManyArgs>(args?: SelectSubset<T, TutonItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TutonItem.
     * @param {TutonItemDeleteArgs} args - Arguments to delete one TutonItem.
     * @example
     * // Delete one TutonItem
     * const TutonItem = await prisma.tutonItem.delete({
     *   where: {
     *     // ... filter to delete one TutonItem
     *   }
     * })
     * 
     */
    delete<T extends TutonItemDeleteArgs>(args: SelectSubset<T, TutonItemDeleteArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TutonItem.
     * @param {TutonItemUpdateArgs} args - Arguments to update one TutonItem.
     * @example
     * // Update one TutonItem
     * const tutonItem = await prisma.tutonItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TutonItemUpdateArgs>(args: SelectSubset<T, TutonItemUpdateArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TutonItems.
     * @param {TutonItemDeleteManyArgs} args - Arguments to filter TutonItems to delete.
     * @example
     * // Delete a few TutonItems
     * const { count } = await prisma.tutonItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TutonItemDeleteManyArgs>(args?: SelectSubset<T, TutonItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TutonItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutonItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TutonItems
     * const tutonItem = await prisma.tutonItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TutonItemUpdateManyArgs>(args: SelectSubset<T, TutonItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TutonItem.
     * @param {TutonItemUpsertArgs} args - Arguments to update or create a TutonItem.
     * @example
     * // Update or create a TutonItem
     * const tutonItem = await prisma.tutonItem.upsert({
     *   create: {
     *     // ... data to create a TutonItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TutonItem we want to update
     *   }
     * })
     */
    upsert<T extends TutonItemUpsertArgs>(args: SelectSubset<T, TutonItemUpsertArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TutonItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutonItemCountArgs} args - Arguments to filter TutonItems to count.
     * @example
     * // Count the number of TutonItems
     * const count = await prisma.tutonItem.count({
     *   where: {
     *     // ... the filter for the TutonItems we want to count
     *   }
     * })
    **/
    count<T extends TutonItemCountArgs>(
      args?: Subset<T, TutonItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TutonItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TutonItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutonItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TutonItemAggregateArgs>(args: Subset<T, TutonItemAggregateArgs>): Prisma.PrismaPromise<GetTutonItemAggregateType<T>>

    /**
     * Group by TutonItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutonItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TutonItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TutonItemGroupByArgs['orderBy'] }
        : { orderBy?: TutonItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TutonItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTutonItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TutonItem model
   */
  readonly fields: TutonItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TutonItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TutonItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reminders<T extends TutonItem$remindersArgs<ExtArgs> = {}>(args?: Subset<T, TutonItem$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enrollment<T extends EnrollmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EnrollmentDefaultArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TutonItem model
   */
  interface TutonItemFieldRefs {
    readonly id: FieldRef<"TutonItem", 'Int'>
    readonly enrollmentId: FieldRef<"TutonItem", 'Int'>
    readonly jenis: FieldRef<"TutonItem", 'JenisTugas'>
    readonly sesi: FieldRef<"TutonItem", 'Int'>
    readonly status: FieldRef<"TutonItem", 'StatusTugas'>
    readonly nilai: FieldRef<"TutonItem", 'Float'>
    readonly deskripsi: FieldRef<"TutonItem", 'String'>
    readonly deadlineAt: FieldRef<"TutonItem", 'DateTime'>
    readonly selesaiAt: FieldRef<"TutonItem", 'DateTime'>
    readonly createdAt: FieldRef<"TutonItem", 'DateTime'>
    readonly updatedAt: FieldRef<"TutonItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TutonItem findUnique
   */
  export type TutonItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * Filter, which TutonItem to fetch.
     */
    where: TutonItemWhereUniqueInput
  }

  /**
   * TutonItem findUniqueOrThrow
   */
  export type TutonItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * Filter, which TutonItem to fetch.
     */
    where: TutonItemWhereUniqueInput
  }

  /**
   * TutonItem findFirst
   */
  export type TutonItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * Filter, which TutonItem to fetch.
     */
    where?: TutonItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutonItems to fetch.
     */
    orderBy?: TutonItemOrderByWithRelationInput | TutonItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TutonItems.
     */
    cursor?: TutonItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutonItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutonItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TutonItems.
     */
    distinct?: TutonItemScalarFieldEnum | TutonItemScalarFieldEnum[]
  }

  /**
   * TutonItem findFirstOrThrow
   */
  export type TutonItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * Filter, which TutonItem to fetch.
     */
    where?: TutonItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutonItems to fetch.
     */
    orderBy?: TutonItemOrderByWithRelationInput | TutonItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TutonItems.
     */
    cursor?: TutonItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutonItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutonItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TutonItems.
     */
    distinct?: TutonItemScalarFieldEnum | TutonItemScalarFieldEnum[]
  }

  /**
   * TutonItem findMany
   */
  export type TutonItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * Filter, which TutonItems to fetch.
     */
    where?: TutonItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutonItems to fetch.
     */
    orderBy?: TutonItemOrderByWithRelationInput | TutonItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TutonItems.
     */
    cursor?: TutonItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutonItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutonItems.
     */
    skip?: number
    distinct?: TutonItemScalarFieldEnum | TutonItemScalarFieldEnum[]
  }

  /**
   * TutonItem create
   */
  export type TutonItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * The data needed to create a TutonItem.
     */
    data: XOR<TutonItemCreateInput, TutonItemUncheckedCreateInput>
  }

  /**
   * TutonItem createMany
   */
  export type TutonItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TutonItems.
     */
    data: TutonItemCreateManyInput | TutonItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TutonItem update
   */
  export type TutonItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * The data needed to update a TutonItem.
     */
    data: XOR<TutonItemUpdateInput, TutonItemUncheckedUpdateInput>
    /**
     * Choose, which TutonItem to update.
     */
    where: TutonItemWhereUniqueInput
  }

  /**
   * TutonItem updateMany
   */
  export type TutonItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TutonItems.
     */
    data: XOR<TutonItemUpdateManyMutationInput, TutonItemUncheckedUpdateManyInput>
    /**
     * Filter which TutonItems to update
     */
    where?: TutonItemWhereInput
    /**
     * Limit how many TutonItems to update.
     */
    limit?: number
  }

  /**
   * TutonItem upsert
   */
  export type TutonItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * The filter to search for the TutonItem to update in case it exists.
     */
    where: TutonItemWhereUniqueInput
    /**
     * In case the TutonItem found by the `where` argument doesn't exist, create a new TutonItem with this data.
     */
    create: XOR<TutonItemCreateInput, TutonItemUncheckedCreateInput>
    /**
     * In case the TutonItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TutonItemUpdateInput, TutonItemUncheckedUpdateInput>
  }

  /**
   * TutonItem delete
   */
  export type TutonItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
    /**
     * Filter which TutonItem to delete.
     */
    where: TutonItemWhereUniqueInput
  }

  /**
   * TutonItem deleteMany
   */
  export type TutonItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TutonItems to delete
     */
    where?: TutonItemWhereInput
    /**
     * Limit how many TutonItems to delete.
     */
    limit?: number
  }

  /**
   * TutonItem.reminders
   */
  export type TutonItem$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * TutonItem without action
   */
  export type TutonItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutonItem
     */
    select?: TutonItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutonItem
     */
    omit?: TutonItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutonItemInclude<ExtArgs> | null
  }


  /**
   * Model Reminder
   */

  export type AggregateReminder = {
    _count: ReminderCountAggregateOutputType | null
    _avg: ReminderAvgAggregateOutputType | null
    _sum: ReminderSumAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  export type ReminderAvgAggregateOutputType = {
    id: number | null
    itemId: number | null
    createdByAdminId: number | null
    offsetMin: number | null
  }

  export type ReminderSumAggregateOutputType = {
    id: number | null
    itemId: number | null
    createdByAdminId: number | null
    offsetMin: number | null
  }

  export type ReminderMinAggregateOutputType = {
    id: number | null
    itemId: number | null
    source: $Enums.ReminderSource | null
    status: $Enums.ReminderStatus | null
    channel: $Enums.ReminderChannel | null
    note: string | null
    createdByAdminId: number | null
    offsetMin: number | null
    active: boolean | null
    createdAt: Date | null
    sentAt: Date | null
  }

  export type ReminderMaxAggregateOutputType = {
    id: number | null
    itemId: number | null
    source: $Enums.ReminderSource | null
    status: $Enums.ReminderStatus | null
    channel: $Enums.ReminderChannel | null
    note: string | null
    createdByAdminId: number | null
    offsetMin: number | null
    active: boolean | null
    createdAt: Date | null
    sentAt: Date | null
  }

  export type ReminderCountAggregateOutputType = {
    id: number
    itemId: number
    source: number
    status: number
    channel: number
    note: number
    createdByAdminId: number
    offsetMin: number
    active: number
    createdAt: number
    sentAt: number
    _all: number
  }


  export type ReminderAvgAggregateInputType = {
    id?: true
    itemId?: true
    createdByAdminId?: true
    offsetMin?: true
  }

  export type ReminderSumAggregateInputType = {
    id?: true
    itemId?: true
    createdByAdminId?: true
    offsetMin?: true
  }

  export type ReminderMinAggregateInputType = {
    id?: true
    itemId?: true
    source?: true
    status?: true
    channel?: true
    note?: true
    createdByAdminId?: true
    offsetMin?: true
    active?: true
    createdAt?: true
    sentAt?: true
  }

  export type ReminderMaxAggregateInputType = {
    id?: true
    itemId?: true
    source?: true
    status?: true
    channel?: true
    note?: true
    createdByAdminId?: true
    offsetMin?: true
    active?: true
    createdAt?: true
    sentAt?: true
  }

  export type ReminderCountAggregateInputType = {
    id?: true
    itemId?: true
    source?: true
    status?: true
    channel?: true
    note?: true
    createdByAdminId?: true
    offsetMin?: true
    active?: true
    createdAt?: true
    sentAt?: true
    _all?: true
  }

  export type ReminderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminder to aggregate.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reminders
    **/
    _count?: true | ReminderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReminderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReminderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReminderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReminderMaxAggregateInputType
  }

  export type GetReminderAggregateType<T extends ReminderAggregateArgs> = {
        [P in keyof T & keyof AggregateReminder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReminder[P]>
      : GetScalarType<T[P], AggregateReminder[P]>
  }




  export type ReminderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithAggregationInput | ReminderOrderByWithAggregationInput[]
    by: ReminderScalarFieldEnum[] | ReminderScalarFieldEnum
    having?: ReminderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReminderCountAggregateInputType | true
    _avg?: ReminderAvgAggregateInputType
    _sum?: ReminderSumAggregateInputType
    _min?: ReminderMinAggregateInputType
    _max?: ReminderMaxAggregateInputType
  }

  export type ReminderGroupByOutputType = {
    id: number
    itemId: number
    source: $Enums.ReminderSource
    status: $Enums.ReminderStatus
    channel: $Enums.ReminderChannel
    note: string | null
    createdByAdminId: number | null
    offsetMin: number
    active: boolean
    createdAt: Date
    sentAt: Date | null
    _count: ReminderCountAggregateOutputType | null
    _avg: ReminderAvgAggregateOutputType | null
    _sum: ReminderSumAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  type GetReminderGroupByPayload<T extends ReminderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReminderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReminderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReminderGroupByOutputType[P]>
            : GetScalarType<T[P], ReminderGroupByOutputType[P]>
        }
      >
    >


  export type ReminderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    source?: boolean
    status?: boolean
    channel?: boolean
    note?: boolean
    createdByAdminId?: boolean
    offsetMin?: boolean
    active?: boolean
    createdAt?: boolean
    sentAt?: boolean
    item?: boolean | TutonItemDefaultArgs<ExtArgs>
    admin?: boolean | Reminder$adminArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>



  export type ReminderSelectScalar = {
    id?: boolean
    itemId?: boolean
    source?: boolean
    status?: boolean
    channel?: boolean
    note?: boolean
    createdByAdminId?: boolean
    offsetMin?: boolean
    active?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }

  export type ReminderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "itemId" | "source" | "status" | "channel" | "note" | "createdByAdminId" | "offsetMin" | "active" | "createdAt" | "sentAt", ExtArgs["result"]["reminder"]>
  export type ReminderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | TutonItemDefaultArgs<ExtArgs>
    admin?: boolean | Reminder$adminArgs<ExtArgs>
  }

  export type $ReminderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reminder"
    objects: {
      item: Prisma.$TutonItemPayload<ExtArgs>
      admin: Prisma.$AdminPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      itemId: number
      source: $Enums.ReminderSource
      status: $Enums.ReminderStatus
      channel: $Enums.ReminderChannel
      note: string | null
      createdByAdminId: number | null
      offsetMin: number
      active: boolean
      createdAt: Date
      sentAt: Date | null
    }, ExtArgs["result"]["reminder"]>
    composites: {}
  }

  type ReminderGetPayload<S extends boolean | null | undefined | ReminderDefaultArgs> = $Result.GetResult<Prisma.$ReminderPayload, S>

  type ReminderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReminderCountAggregateInputType | true
    }

  export interface ReminderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reminder'], meta: { name: 'Reminder' } }
    /**
     * Find zero or one Reminder that matches the filter.
     * @param {ReminderFindUniqueArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReminderFindUniqueArgs>(args: SelectSubset<T, ReminderFindUniqueArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reminder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReminderFindUniqueOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReminderFindUniqueOrThrowArgs>(args: SelectSubset<T, ReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReminderFindFirstArgs>(args?: SelectSubset<T, ReminderFindFirstArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReminderFindFirstOrThrowArgs>(args?: SelectSubset<T, ReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reminders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reminders
     * const reminders = await prisma.reminder.findMany()
     * 
     * // Get first 10 Reminders
     * const reminders = await prisma.reminder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reminderWithIdOnly = await prisma.reminder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReminderFindManyArgs>(args?: SelectSubset<T, ReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reminder.
     * @param {ReminderCreateArgs} args - Arguments to create a Reminder.
     * @example
     * // Create one Reminder
     * const Reminder = await prisma.reminder.create({
     *   data: {
     *     // ... data to create a Reminder
     *   }
     * })
     * 
     */
    create<T extends ReminderCreateArgs>(args: SelectSubset<T, ReminderCreateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reminders.
     * @param {ReminderCreateManyArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReminderCreateManyArgs>(args?: SelectSubset<T, ReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Reminder.
     * @param {ReminderDeleteArgs} args - Arguments to delete one Reminder.
     * @example
     * // Delete one Reminder
     * const Reminder = await prisma.reminder.delete({
     *   where: {
     *     // ... filter to delete one Reminder
     *   }
     * })
     * 
     */
    delete<T extends ReminderDeleteArgs>(args: SelectSubset<T, ReminderDeleteArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reminder.
     * @param {ReminderUpdateArgs} args - Arguments to update one Reminder.
     * @example
     * // Update one Reminder
     * const reminder = await prisma.reminder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReminderUpdateArgs>(args: SelectSubset<T, ReminderUpdateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reminders.
     * @param {ReminderDeleteManyArgs} args - Arguments to filter Reminders to delete.
     * @example
     * // Delete a few Reminders
     * const { count } = await prisma.reminder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReminderDeleteManyArgs>(args?: SelectSubset<T, ReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReminderUpdateManyArgs>(args: SelectSubset<T, ReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Reminder.
     * @param {ReminderUpsertArgs} args - Arguments to update or create a Reminder.
     * @example
     * // Update or create a Reminder
     * const reminder = await prisma.reminder.upsert({
     *   create: {
     *     // ... data to create a Reminder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reminder we want to update
     *   }
     * })
     */
    upsert<T extends ReminderUpsertArgs>(args: SelectSubset<T, ReminderUpsertArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderCountArgs} args - Arguments to filter Reminders to count.
     * @example
     * // Count the number of Reminders
     * const count = await prisma.reminder.count({
     *   where: {
     *     // ... the filter for the Reminders we want to count
     *   }
     * })
    **/
    count<T extends ReminderCountArgs>(
      args?: Subset<T, ReminderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReminderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReminderAggregateArgs>(args: Subset<T, ReminderAggregateArgs>): Prisma.PrismaPromise<GetReminderAggregateType<T>>

    /**
     * Group by Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReminderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReminderGroupByArgs['orderBy'] }
        : { orderBy?: ReminderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reminder model
   */
  readonly fields: ReminderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reminder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReminderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends TutonItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TutonItemDefaultArgs<ExtArgs>>): Prisma__TutonItemClient<$Result.GetResult<Prisma.$TutonItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin<T extends Reminder$adminArgs<ExtArgs> = {}>(args?: Subset<T, Reminder$adminArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reminder model
   */
  interface ReminderFieldRefs {
    readonly id: FieldRef<"Reminder", 'Int'>
    readonly itemId: FieldRef<"Reminder", 'Int'>
    readonly source: FieldRef<"Reminder", 'ReminderSource'>
    readonly status: FieldRef<"Reminder", 'ReminderStatus'>
    readonly channel: FieldRef<"Reminder", 'ReminderChannel'>
    readonly note: FieldRef<"Reminder", 'String'>
    readonly createdByAdminId: FieldRef<"Reminder", 'Int'>
    readonly offsetMin: FieldRef<"Reminder", 'Int'>
    readonly active: FieldRef<"Reminder", 'Boolean'>
    readonly createdAt: FieldRef<"Reminder", 'DateTime'>
    readonly sentAt: FieldRef<"Reminder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reminder findUnique
   */
  export type ReminderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findUniqueOrThrow
   */
  export type ReminderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findFirst
   */
  export type ReminderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findFirstOrThrow
   */
  export type ReminderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findMany
   */
  export type ReminderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminders to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder create
   */
  export type ReminderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to create a Reminder.
     */
    data: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
  }

  /**
   * Reminder createMany
   */
  export type ReminderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reminder update
   */
  export type ReminderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to update a Reminder.
     */
    data: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
    /**
     * Choose, which Reminder to update.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder updateMany
   */
  export type ReminderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to update.
     */
    limit?: number
  }

  /**
   * Reminder upsert
   */
  export type ReminderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The filter to search for the Reminder to update in case it exists.
     */
    where: ReminderWhereUniqueInput
    /**
     * In case the Reminder found by the `where` argument doesn't exist, create a new Reminder with this data.
     */
    create: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
    /**
     * In case the Reminder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
  }

  /**
   * Reminder delete
   */
  export type ReminderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter which Reminder to delete.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder deleteMany
   */
  export type ReminderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminders to delete
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to delete.
     */
    limit?: number
  }

  /**
   * Reminder.admin
   */
  export type Reminder$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * Reminder without action
   */
  export type ReminderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminScalarFieldEnum: {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    nim: 'nim',
    noHp: 'noHp',
    nama: 'nama',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const CourseDeadlineScalarFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    jenis: 'jenis',
    sesi: 'sesi',
    deadlineAt: 'deadlineAt'
  };

  export type CourseDeadlineScalarFieldEnum = (typeof CourseDeadlineScalarFieldEnum)[keyof typeof CourseDeadlineScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const TutonItemScalarFieldEnum: {
    id: 'id',
    enrollmentId: 'enrollmentId',
    jenis: 'jenis',
    sesi: 'sesi',
    status: 'status',
    nilai: 'nilai',
    deskripsi: 'deskripsi',
    deadlineAt: 'deadlineAt',
    selesaiAt: 'selesaiAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TutonItemScalarFieldEnum = (typeof TutonItemScalarFieldEnum)[keyof typeof TutonItemScalarFieldEnum]


  export const ReminderScalarFieldEnum: {
    id: 'id',
    itemId: 'itemId',
    source: 'source',
    status: 'status',
    channel: 'channel',
    note: 'note',
    createdByAdminId: 'createdByAdminId',
    offsetMin: 'offsetMin',
    active: 'active',
    createdAt: 'createdAt',
    sentAt: 'sentAt'
  };

  export type ReminderScalarFieldEnum = (typeof ReminderScalarFieldEnum)[keyof typeof ReminderScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const AdminOrderByRelevanceFieldEnum: {
    username: 'username',
    passwordHash: 'passwordHash'
  };

  export type AdminOrderByRelevanceFieldEnum = (typeof AdminOrderByRelevanceFieldEnum)[keyof typeof AdminOrderByRelevanceFieldEnum]


  export const StudentOrderByRelevanceFieldEnum: {
    nim: 'nim',
    noHp: 'noHp',
    nama: 'nama'
  };

  export type StudentOrderByRelevanceFieldEnum = (typeof StudentOrderByRelevanceFieldEnum)[keyof typeof StudentOrderByRelevanceFieldEnum]


  export const CourseOrderByRelevanceFieldEnum: {
    nama: 'nama'
  };

  export type CourseOrderByRelevanceFieldEnum = (typeof CourseOrderByRelevanceFieldEnum)[keyof typeof CourseOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const TutonItemOrderByRelevanceFieldEnum: {
    deskripsi: 'deskripsi'
  };

  export type TutonItemOrderByRelevanceFieldEnum = (typeof TutonItemOrderByRelevanceFieldEnum)[keyof typeof TutonItemOrderByRelevanceFieldEnum]


  export const ReminderOrderByRelevanceFieldEnum: {
    note: 'note'
  };

  export type ReminderOrderByRelevanceFieldEnum = (typeof ReminderOrderByRelevanceFieldEnum)[keyof typeof ReminderOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'AdminRole'
   */
  export type EnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'JenisTugas'
   */
  export type EnumJenisTugasFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisTugas'>
    


  /**
   * Reference to a field of type 'StatusTugas'
   */
  export type EnumStatusTugasFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusTugas'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'ReminderSource'
   */
  export type EnumReminderSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderSource'>
    


  /**
   * Reference to a field of type 'ReminderStatus'
   */
  export type EnumReminderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderStatus'>
    


  /**
   * Reference to a field of type 'ReminderChannel'
   */
  export type EnumReminderChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderChannel'>
    
  /**
   * Deep Input Types
   */


  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    username?: StringFilter<"Admin"> | string
    passwordHash?: StringFilter<"Admin"> | string
    role?: EnumAdminRoleFilter<"Admin"> | $Enums.AdminRole
    isActive?: BoolFilter<"Admin"> | boolean
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    reminders?: ReminderListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reminders?: ReminderOrderByRelationAggregateInput
    _relevance?: AdminOrderByRelevanceInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    passwordHash?: StringFilter<"Admin"> | string
    role?: EnumAdminRoleFilter<"Admin"> | $Enums.AdminRole
    isActive?: BoolFilter<"Admin"> | boolean
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    reminders?: ReminderListRelationFilter
  }, "id" | "username">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    username?: StringWithAggregatesFilter<"Admin"> | string
    passwordHash?: StringWithAggregatesFilter<"Admin"> | string
    role?: EnumAdminRoleWithAggregatesFilter<"Admin"> | $Enums.AdminRole
    isActive?: BoolWithAggregatesFilter<"Admin"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    nim?: StringFilter<"Student"> | string
    noHp?: StringFilter<"Student"> | string
    nama?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    enrollments?: EnrollmentListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    nim?: SortOrder
    noHp?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    enrollments?: EnrollmentOrderByRelationAggregateInput
    _relevance?: StudentOrderByRelevanceInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nim?: string
    noHp?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    nama?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    enrollments?: EnrollmentListRelationFilter
  }, "id" | "nim" | "noHp">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    nim?: SortOrder
    noHp?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    nim?: StringWithAggregatesFilter<"Student"> | string
    noHp?: StringWithAggregatesFilter<"Student"> | string
    nama?: StringWithAggregatesFilter<"Student"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: IntFilter<"Course"> | number
    nama?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    enrollments?: EnrollmentListRelationFilter
    courseDeadlines?: CourseDeadlineListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    enrollments?: EnrollmentOrderByRelationAggregateInput
    courseDeadlines?: CourseDeadlineOrderByRelationAggregateInput
    _relevance?: CourseOrderByRelevanceInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nama?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    enrollments?: EnrollmentListRelationFilter
    courseDeadlines?: CourseDeadlineListRelationFilter
  }, "id" | "nama">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Course"> | number
    nama?: StringWithAggregatesFilter<"Course"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type CourseDeadlineWhereInput = {
    AND?: CourseDeadlineWhereInput | CourseDeadlineWhereInput[]
    OR?: CourseDeadlineWhereInput[]
    NOT?: CourseDeadlineWhereInput | CourseDeadlineWhereInput[]
    id?: IntFilter<"CourseDeadline"> | number
    courseId?: IntFilter<"CourseDeadline"> | number
    jenis?: EnumJenisTugasFilter<"CourseDeadline"> | $Enums.JenisTugas
    sesi?: IntFilter<"CourseDeadline"> | number
    deadlineAt?: DateTimeNullableFilter<"CourseDeadline"> | Date | string | null
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type CourseDeadlineOrderByWithRelationInput = {
    id?: SortOrder
    courseId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    course?: CourseOrderByWithRelationInput
  }

  export type CourseDeadlineWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    courseId_jenis_sesi?: CourseDeadlineCourseIdJenisSesiCompoundUniqueInput
    AND?: CourseDeadlineWhereInput | CourseDeadlineWhereInput[]
    OR?: CourseDeadlineWhereInput[]
    NOT?: CourseDeadlineWhereInput | CourseDeadlineWhereInput[]
    courseId?: IntFilter<"CourseDeadline"> | number
    jenis?: EnumJenisTugasFilter<"CourseDeadline"> | $Enums.JenisTugas
    sesi?: IntFilter<"CourseDeadline"> | number
    deadlineAt?: DateTimeNullableFilter<"CourseDeadline"> | Date | string | null
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id" | "courseId_jenis_sesi">

  export type CourseDeadlineOrderByWithAggregationInput = {
    id?: SortOrder
    courseId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    _count?: CourseDeadlineCountOrderByAggregateInput
    _avg?: CourseDeadlineAvgOrderByAggregateInput
    _max?: CourseDeadlineMaxOrderByAggregateInput
    _min?: CourseDeadlineMinOrderByAggregateInput
    _sum?: CourseDeadlineSumOrderByAggregateInput
  }

  export type CourseDeadlineScalarWhereWithAggregatesInput = {
    AND?: CourseDeadlineScalarWhereWithAggregatesInput | CourseDeadlineScalarWhereWithAggregatesInput[]
    OR?: CourseDeadlineScalarWhereWithAggregatesInput[]
    NOT?: CourseDeadlineScalarWhereWithAggregatesInput | CourseDeadlineScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CourseDeadline"> | number
    courseId?: IntWithAggregatesFilter<"CourseDeadline"> | number
    jenis?: EnumJenisTugasWithAggregatesFilter<"CourseDeadline"> | $Enums.JenisTugas
    sesi?: IntWithAggregatesFilter<"CourseDeadline"> | number
    deadlineAt?: DateTimeNullableWithAggregatesFilter<"CourseDeadline"> | Date | string | null
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: IntFilter<"Enrollment"> | number
    studentId?: IntFilter<"Enrollment"> | number
    courseId?: IntFilter<"Enrollment"> | number
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeFilter<"Enrollment"> | Date | string
    items?: TutonItemListRelationFilter
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: TutonItemOrderByRelationAggregateInput
    student?: StudentOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentId_courseId?: EnrollmentStudentIdCourseIdCompoundUniqueInput
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    studentId?: IntFilter<"Enrollment"> | number
    courseId?: IntFilter<"Enrollment"> | number
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeFilter<"Enrollment"> | Date | string
    items?: TutonItemListRelationFilter
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id" | "studentId_courseId">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _avg?: EnrollmentAvgOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
    _sum?: EnrollmentSumOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Enrollment"> | number
    studentId?: IntWithAggregatesFilter<"Enrollment"> | number
    courseId?: IntWithAggregatesFilter<"Enrollment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
  }

  export type TutonItemWhereInput = {
    AND?: TutonItemWhereInput | TutonItemWhereInput[]
    OR?: TutonItemWhereInput[]
    NOT?: TutonItemWhereInput | TutonItemWhereInput[]
    id?: IntFilter<"TutonItem"> | number
    enrollmentId?: IntFilter<"TutonItem"> | number
    jenis?: EnumJenisTugasFilter<"TutonItem"> | $Enums.JenisTugas
    sesi?: IntFilter<"TutonItem"> | number
    status?: EnumStatusTugasFilter<"TutonItem"> | $Enums.StatusTugas
    nilai?: FloatNullableFilter<"TutonItem"> | number | null
    deskripsi?: StringNullableFilter<"TutonItem"> | string | null
    deadlineAt?: DateTimeNullableFilter<"TutonItem"> | Date | string | null
    selesaiAt?: DateTimeNullableFilter<"TutonItem"> | Date | string | null
    createdAt?: DateTimeFilter<"TutonItem"> | Date | string
    updatedAt?: DateTimeFilter<"TutonItem"> | Date | string
    reminders?: ReminderListRelationFilter
    enrollment?: XOR<EnrollmentScalarRelationFilter, EnrollmentWhereInput>
  }

  export type TutonItemOrderByWithRelationInput = {
    id?: SortOrder
    enrollmentId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    status?: SortOrder
    nilai?: SortOrderInput | SortOrder
    deskripsi?: SortOrderInput | SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    selesaiAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reminders?: ReminderOrderByRelationAggregateInput
    enrollment?: EnrollmentOrderByWithRelationInput
    _relevance?: TutonItemOrderByRelevanceInput
  }

  export type TutonItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    enrollmentId_jenis_sesi?: TutonItemEnrollmentIdJenisSesiCompoundUniqueInput
    AND?: TutonItemWhereInput | TutonItemWhereInput[]
    OR?: TutonItemWhereInput[]
    NOT?: TutonItemWhereInput | TutonItemWhereInput[]
    enrollmentId?: IntFilter<"TutonItem"> | number
    jenis?: EnumJenisTugasFilter<"TutonItem"> | $Enums.JenisTugas
    sesi?: IntFilter<"TutonItem"> | number
    status?: EnumStatusTugasFilter<"TutonItem"> | $Enums.StatusTugas
    nilai?: FloatNullableFilter<"TutonItem"> | number | null
    deskripsi?: StringNullableFilter<"TutonItem"> | string | null
    deadlineAt?: DateTimeNullableFilter<"TutonItem"> | Date | string | null
    selesaiAt?: DateTimeNullableFilter<"TutonItem"> | Date | string | null
    createdAt?: DateTimeFilter<"TutonItem"> | Date | string
    updatedAt?: DateTimeFilter<"TutonItem"> | Date | string
    reminders?: ReminderListRelationFilter
    enrollment?: XOR<EnrollmentScalarRelationFilter, EnrollmentWhereInput>
  }, "id" | "enrollmentId_jenis_sesi">

  export type TutonItemOrderByWithAggregationInput = {
    id?: SortOrder
    enrollmentId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    status?: SortOrder
    nilai?: SortOrderInput | SortOrder
    deskripsi?: SortOrderInput | SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    selesaiAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TutonItemCountOrderByAggregateInput
    _avg?: TutonItemAvgOrderByAggregateInput
    _max?: TutonItemMaxOrderByAggregateInput
    _min?: TutonItemMinOrderByAggregateInput
    _sum?: TutonItemSumOrderByAggregateInput
  }

  export type TutonItemScalarWhereWithAggregatesInput = {
    AND?: TutonItemScalarWhereWithAggregatesInput | TutonItemScalarWhereWithAggregatesInput[]
    OR?: TutonItemScalarWhereWithAggregatesInput[]
    NOT?: TutonItemScalarWhereWithAggregatesInput | TutonItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TutonItem"> | number
    enrollmentId?: IntWithAggregatesFilter<"TutonItem"> | number
    jenis?: EnumJenisTugasWithAggregatesFilter<"TutonItem"> | $Enums.JenisTugas
    sesi?: IntWithAggregatesFilter<"TutonItem"> | number
    status?: EnumStatusTugasWithAggregatesFilter<"TutonItem"> | $Enums.StatusTugas
    nilai?: FloatNullableWithAggregatesFilter<"TutonItem"> | number | null
    deskripsi?: StringNullableWithAggregatesFilter<"TutonItem"> | string | null
    deadlineAt?: DateTimeNullableWithAggregatesFilter<"TutonItem"> | Date | string | null
    selesaiAt?: DateTimeNullableWithAggregatesFilter<"TutonItem"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TutonItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TutonItem"> | Date | string
  }

  export type ReminderWhereInput = {
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    id?: IntFilter<"Reminder"> | number
    itemId?: IntFilter<"Reminder"> | number
    source?: EnumReminderSourceFilter<"Reminder"> | $Enums.ReminderSource
    status?: EnumReminderStatusFilter<"Reminder"> | $Enums.ReminderStatus
    channel?: EnumReminderChannelFilter<"Reminder"> | $Enums.ReminderChannel
    note?: StringNullableFilter<"Reminder"> | string | null
    createdByAdminId?: IntNullableFilter<"Reminder"> | number | null
    offsetMin?: IntFilter<"Reminder"> | number
    active?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    item?: XOR<TutonItemScalarRelationFilter, TutonItemWhereInput>
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
  }

  export type ReminderOrderByWithRelationInput = {
    id?: SortOrder
    itemId?: SortOrder
    source?: SortOrder
    status?: SortOrder
    channel?: SortOrder
    note?: SortOrderInput | SortOrder
    createdByAdminId?: SortOrderInput | SortOrder
    offsetMin?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    item?: TutonItemOrderByWithRelationInput
    admin?: AdminOrderByWithRelationInput
    _relevance?: ReminderOrderByRelevanceInput
  }

  export type ReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    itemId?: IntFilter<"Reminder"> | number
    source?: EnumReminderSourceFilter<"Reminder"> | $Enums.ReminderSource
    status?: EnumReminderStatusFilter<"Reminder"> | $Enums.ReminderStatus
    channel?: EnumReminderChannelFilter<"Reminder"> | $Enums.ReminderChannel
    note?: StringNullableFilter<"Reminder"> | string | null
    createdByAdminId?: IntNullableFilter<"Reminder"> | number | null
    offsetMin?: IntFilter<"Reminder"> | number
    active?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    item?: XOR<TutonItemScalarRelationFilter, TutonItemWhereInput>
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
  }, "id">

  export type ReminderOrderByWithAggregationInput = {
    id?: SortOrder
    itemId?: SortOrder
    source?: SortOrder
    status?: SortOrder
    channel?: SortOrder
    note?: SortOrderInput | SortOrder
    createdByAdminId?: SortOrderInput | SortOrder
    offsetMin?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    _count?: ReminderCountOrderByAggregateInput
    _avg?: ReminderAvgOrderByAggregateInput
    _max?: ReminderMaxOrderByAggregateInput
    _min?: ReminderMinOrderByAggregateInput
    _sum?: ReminderSumOrderByAggregateInput
  }

  export type ReminderScalarWhereWithAggregatesInput = {
    AND?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    OR?: ReminderScalarWhereWithAggregatesInput[]
    NOT?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Reminder"> | number
    itemId?: IntWithAggregatesFilter<"Reminder"> | number
    source?: EnumReminderSourceWithAggregatesFilter<"Reminder"> | $Enums.ReminderSource
    status?: EnumReminderStatusWithAggregatesFilter<"Reminder"> | $Enums.ReminderStatus
    channel?: EnumReminderChannelWithAggregatesFilter<"Reminder"> | $Enums.ReminderChannel
    note?: StringNullableWithAggregatesFilter<"Reminder"> | string | null
    createdByAdminId?: IntNullableWithAggregatesFilter<"Reminder"> | number | null
    offsetMin?: IntWithAggregatesFilter<"Reminder"> | number
    active?: BoolWithAggregatesFilter<"Reminder"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"Reminder"> | Date | string | null
  }

  export type AdminCreateInput = {
    username: string
    passwordHash: string
    role?: $Enums.AdminRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reminders?: ReminderCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    username: string
    passwordHash: string
    role?: $Enums.AdminRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reminders?: ReminderUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reminders?: ReminderUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reminders?: ReminderUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type AdminCreateManyInput = {
    id?: number
    username: string
    passwordHash: string
    role?: $Enums.AdminRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    nim: string
    noHp: string
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    nim: string
    noHp: string
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    nim?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nim?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    nim: string
    noHp: string
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    nim?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nim?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    courseDeadlines?: CourseDeadlineCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: number
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    courseDeadlines?: CourseDeadlineUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    courseDeadlines?: CourseDeadlineUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    courseDeadlines?: CourseDeadlineUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: number
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseDeadlineCreateInput = {
    jenis: $Enums.JenisTugas
    sesi: number
    deadlineAt?: Date | string | null
    course: CourseCreateNestedOneWithoutCourseDeadlinesInput
  }

  export type CourseDeadlineUncheckedCreateInput = {
    id?: number
    courseId: number
    jenis: $Enums.JenisTugas
    sesi: number
    deadlineAt?: Date | string | null
  }

  export type CourseDeadlineUpdateInput = {
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    course?: CourseUpdateOneRequiredWithoutCourseDeadlinesNestedInput
  }

  export type CourseDeadlineUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseDeadlineCreateManyInput = {
    id?: number
    courseId: number
    jenis: $Enums.JenisTugas
    sesi: number
    deadlineAt?: Date | string | null
  }

  export type CourseDeadlineUpdateManyMutationInput = {
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseDeadlineUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EnrollmentCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TutonItemCreateNestedManyWithoutEnrollmentInput
    student: StudentCreateNestedOneWithoutEnrollmentsInput
    course: CourseCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id?: number
    studentId: number
    courseId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TutonItemUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TutonItemUpdateManyWithoutEnrollmentNestedInput
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TutonItemUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentCreateManyInput = {
    id?: number
    studentId: number
    courseId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutonItemCreateInput = {
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reminders?: ReminderCreateNestedManyWithoutItemInput
    enrollment: EnrollmentCreateNestedOneWithoutItemsInput
  }

  export type TutonItemUncheckedCreateInput = {
    id?: number
    enrollmentId: number
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reminders?: ReminderUncheckedCreateNestedManyWithoutItemInput
  }

  export type TutonItemUpdateInput = {
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reminders?: ReminderUpdateManyWithoutItemNestedInput
    enrollment?: EnrollmentUpdateOneRequiredWithoutItemsNestedInput
  }

  export type TutonItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    enrollmentId?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reminders?: ReminderUncheckedUpdateManyWithoutItemNestedInput
  }

  export type TutonItemCreateManyInput = {
    id?: number
    enrollmentId: number
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TutonItemUpdateManyMutationInput = {
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutonItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    enrollmentId?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateInput = {
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
    item: TutonItemCreateNestedOneWithoutRemindersInput
    admin?: AdminCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateInput = {
    id?: number
    itemId: number
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    createdByAdminId?: number | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type ReminderUpdateInput = {
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item?: TutonItemUpdateOneRequiredWithoutRemindersNestedInput
    admin?: AdminUpdateOneWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReminderCreateManyInput = {
    id?: number
    itemId: number
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    createdByAdminId?: number | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type ReminderUpdateManyMutationInput = {
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReminderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[]
    notIn?: $Enums.AdminRole[]
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ReminderListRelationFilter = {
    every?: ReminderWhereInput
    some?: ReminderWhereInput
    none?: ReminderWhereInput
  }

  export type ReminderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminOrderByRelevanceInput = {
    fields: AdminOrderByRelevanceFieldEnum | AdminOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[]
    notIn?: $Enums.AdminRole[]
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentOrderByRelevanceInput = {
    fields: StudentOrderByRelevanceFieldEnum | StudentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    nim?: SortOrder
    noHp?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    nim?: SortOrder
    noHp?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    nim?: SortOrder
    noHp?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CourseDeadlineListRelationFilter = {
    every?: CourseDeadlineWhereInput
    some?: CourseDeadlineWhereInput
    none?: CourseDeadlineWhereInput
  }

  export type CourseDeadlineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseOrderByRelevanceInput = {
    fields: CourseOrderByRelevanceFieldEnum | CourseOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumJenisTugasFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisTugas | EnumJenisTugasFieldRefInput<$PrismaModel>
    in?: $Enums.JenisTugas[]
    notIn?: $Enums.JenisTugas[]
    not?: NestedEnumJenisTugasFilter<$PrismaModel> | $Enums.JenisTugas
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CourseDeadlineCourseIdJenisSesiCompoundUniqueInput = {
    courseId: number
    jenis: $Enums.JenisTugas
    sesi: number
  }

  export type CourseDeadlineCountOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    deadlineAt?: SortOrder
  }

  export type CourseDeadlineAvgOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    sesi?: SortOrder
  }

  export type CourseDeadlineMaxOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    deadlineAt?: SortOrder
  }

  export type CourseDeadlineMinOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    deadlineAt?: SortOrder
  }

  export type CourseDeadlineSumOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    sesi?: SortOrder
  }

  export type EnumJenisTugasWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisTugas | EnumJenisTugasFieldRefInput<$PrismaModel>
    in?: $Enums.JenisTugas[]
    notIn?: $Enums.JenisTugas[]
    not?: NestedEnumJenisTugasWithAggregatesFilter<$PrismaModel> | $Enums.JenisTugas
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJenisTugasFilter<$PrismaModel>
    _max?: NestedEnumJenisTugasFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TutonItemListRelationFilter = {
    every?: TutonItemWhereInput
    some?: TutonItemWhereInput
    none?: TutonItemWhereInput
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type TutonItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnrollmentStudentIdCourseIdCompoundUniqueInput = {
    studentId: number
    courseId: number
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnrollmentAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnrollmentSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
  }

  export type EnumStatusTugasFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasFilter<$PrismaModel> | $Enums.StatusTugas
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnrollmentScalarRelationFilter = {
    is?: EnrollmentWhereInput
    isNot?: EnrollmentWhereInput
  }

  export type TutonItemOrderByRelevanceInput = {
    fields: TutonItemOrderByRelevanceFieldEnum | TutonItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TutonItemEnrollmentIdJenisSesiCompoundUniqueInput = {
    enrollmentId: number
    jenis: $Enums.JenisTugas
    sesi: number
  }

  export type TutonItemCountOrderByAggregateInput = {
    id?: SortOrder
    enrollmentId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    status?: SortOrder
    nilai?: SortOrder
    deskripsi?: SortOrder
    deadlineAt?: SortOrder
    selesaiAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TutonItemAvgOrderByAggregateInput = {
    id?: SortOrder
    enrollmentId?: SortOrder
    sesi?: SortOrder
    nilai?: SortOrder
  }

  export type TutonItemMaxOrderByAggregateInput = {
    id?: SortOrder
    enrollmentId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    status?: SortOrder
    nilai?: SortOrder
    deskripsi?: SortOrder
    deadlineAt?: SortOrder
    selesaiAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TutonItemMinOrderByAggregateInput = {
    id?: SortOrder
    enrollmentId?: SortOrder
    jenis?: SortOrder
    sesi?: SortOrder
    status?: SortOrder
    nilai?: SortOrder
    deskripsi?: SortOrder
    deadlineAt?: SortOrder
    selesaiAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TutonItemSumOrderByAggregateInput = {
    id?: SortOrder
    enrollmentId?: SortOrder
    sesi?: SortOrder
    nilai?: SortOrder
  }

  export type EnumStatusTugasWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasWithAggregatesFilter<$PrismaModel> | $Enums.StatusTugas
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusTugasFilter<$PrismaModel>
    _max?: NestedEnumStatusTugasFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumReminderSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderSource | EnumReminderSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderSource[]
    notIn?: $Enums.ReminderSource[]
    not?: NestedEnumReminderSourceFilter<$PrismaModel> | $Enums.ReminderSource
  }

  export type EnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[]
    notIn?: $Enums.ReminderStatus[]
    not?: NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus
  }

  export type EnumReminderChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[]
    notIn?: $Enums.ReminderChannel[]
    not?: NestedEnumReminderChannelFilter<$PrismaModel> | $Enums.ReminderChannel
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TutonItemScalarRelationFilter = {
    is?: TutonItemWhereInput
    isNot?: TutonItemWhereInput
  }

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type ReminderOrderByRelevanceInput = {
    fields: ReminderOrderByRelevanceFieldEnum | ReminderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ReminderCountOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    source?: SortOrder
    status?: SortOrder
    channel?: SortOrder
    note?: SortOrder
    createdByAdminId?: SortOrder
    offsetMin?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type ReminderAvgOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    createdByAdminId?: SortOrder
    offsetMin?: SortOrder
  }

  export type ReminderMaxOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    source?: SortOrder
    status?: SortOrder
    channel?: SortOrder
    note?: SortOrder
    createdByAdminId?: SortOrder
    offsetMin?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type ReminderMinOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    source?: SortOrder
    status?: SortOrder
    channel?: SortOrder
    note?: SortOrder
    createdByAdminId?: SortOrder
    offsetMin?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type ReminderSumOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    createdByAdminId?: SortOrder
    offsetMin?: SortOrder
  }

  export type EnumReminderSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderSource | EnumReminderSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderSource[]
    notIn?: $Enums.ReminderSource[]
    not?: NestedEnumReminderSourceWithAggregatesFilter<$PrismaModel> | $Enums.ReminderSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderSourceFilter<$PrismaModel>
    _max?: NestedEnumReminderSourceFilter<$PrismaModel>
  }

  export type EnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[]
    notIn?: $Enums.ReminderStatus[]
    not?: NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderStatusFilter<$PrismaModel>
    _max?: NestedEnumReminderStatusFilter<$PrismaModel>
  }

  export type EnumReminderChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[]
    notIn?: $Enums.ReminderChannel[]
    not?: NestedEnumReminderChannelWithAggregatesFilter<$PrismaModel> | $Enums.ReminderChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderChannelFilter<$PrismaModel>
    _max?: NestedEnumReminderChannelFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ReminderCreateNestedManyWithoutAdminInput = {
    create?: XOR<ReminderCreateWithoutAdminInput, ReminderUncheckedCreateWithoutAdminInput> | ReminderCreateWithoutAdminInput[] | ReminderUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutAdminInput | ReminderCreateOrConnectWithoutAdminInput[]
    createMany?: ReminderCreateManyAdminInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<ReminderCreateWithoutAdminInput, ReminderUncheckedCreateWithoutAdminInput> | ReminderCreateWithoutAdminInput[] | ReminderUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutAdminInput | ReminderCreateOrConnectWithoutAdminInput[]
    createMany?: ReminderCreateManyAdminInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAdminRoleFieldUpdateOperationsInput = {
    set?: $Enums.AdminRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReminderUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ReminderCreateWithoutAdminInput, ReminderUncheckedCreateWithoutAdminInput> | ReminderCreateWithoutAdminInput[] | ReminderUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutAdminInput | ReminderCreateOrConnectWithoutAdminInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutAdminInput | ReminderUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ReminderCreateManyAdminInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutAdminInput | ReminderUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutAdminInput | ReminderUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ReminderUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ReminderCreateWithoutAdminInput, ReminderUncheckedCreateWithoutAdminInput> | ReminderCreateWithoutAdminInput[] | ReminderUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutAdminInput | ReminderCreateOrConnectWithoutAdminInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutAdminInput | ReminderUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ReminderCreateManyAdminInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutAdminInput | ReminderUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutAdminInput | ReminderUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type EnrollmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type EnrollmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type EnrollmentCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type CourseDeadlineCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseDeadlineCreateWithoutCourseInput, CourseDeadlineUncheckedCreateWithoutCourseInput> | CourseDeadlineCreateWithoutCourseInput[] | CourseDeadlineUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseDeadlineCreateOrConnectWithoutCourseInput | CourseDeadlineCreateOrConnectWithoutCourseInput[]
    createMany?: CourseDeadlineCreateManyCourseInputEnvelope
    connect?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type CourseDeadlineUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseDeadlineCreateWithoutCourseInput, CourseDeadlineUncheckedCreateWithoutCourseInput> | CourseDeadlineCreateWithoutCourseInput[] | CourseDeadlineUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseDeadlineCreateOrConnectWithoutCourseInput | CourseDeadlineCreateOrConnectWithoutCourseInput[]
    createMany?: CourseDeadlineCreateManyCourseInputEnvelope
    connect?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
  }

  export type EnrollmentUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type CourseDeadlineUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseDeadlineCreateWithoutCourseInput, CourseDeadlineUncheckedCreateWithoutCourseInput> | CourseDeadlineCreateWithoutCourseInput[] | CourseDeadlineUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseDeadlineCreateOrConnectWithoutCourseInput | CourseDeadlineCreateOrConnectWithoutCourseInput[]
    upsert?: CourseDeadlineUpsertWithWhereUniqueWithoutCourseInput | CourseDeadlineUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseDeadlineCreateManyCourseInputEnvelope
    set?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    disconnect?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    delete?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    connect?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    update?: CourseDeadlineUpdateWithWhereUniqueWithoutCourseInput | CourseDeadlineUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseDeadlineUpdateManyWithWhereWithoutCourseInput | CourseDeadlineUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseDeadlineScalarWhereInput | CourseDeadlineScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type CourseDeadlineUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseDeadlineCreateWithoutCourseInput, CourseDeadlineUncheckedCreateWithoutCourseInput> | CourseDeadlineCreateWithoutCourseInput[] | CourseDeadlineUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseDeadlineCreateOrConnectWithoutCourseInput | CourseDeadlineCreateOrConnectWithoutCourseInput[]
    upsert?: CourseDeadlineUpsertWithWhereUniqueWithoutCourseInput | CourseDeadlineUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseDeadlineCreateManyCourseInputEnvelope
    set?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    disconnect?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    delete?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    connect?: CourseDeadlineWhereUniqueInput | CourseDeadlineWhereUniqueInput[]
    update?: CourseDeadlineUpdateWithWhereUniqueWithoutCourseInput | CourseDeadlineUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseDeadlineUpdateManyWithWhereWithoutCourseInput | CourseDeadlineUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseDeadlineScalarWhereInput | CourseDeadlineScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutCourseDeadlinesInput = {
    create?: XOR<CourseCreateWithoutCourseDeadlinesInput, CourseUncheckedCreateWithoutCourseDeadlinesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseDeadlinesInput
    connect?: CourseWhereUniqueInput
  }

  export type EnumJenisTugasFieldUpdateOperationsInput = {
    set?: $Enums.JenisTugas
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CourseUpdateOneRequiredWithoutCourseDeadlinesNestedInput = {
    create?: XOR<CourseCreateWithoutCourseDeadlinesInput, CourseUncheckedCreateWithoutCourseDeadlinesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseDeadlinesInput
    upsert?: CourseUpsertWithoutCourseDeadlinesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutCourseDeadlinesInput, CourseUpdateWithoutCourseDeadlinesInput>, CourseUncheckedUpdateWithoutCourseDeadlinesInput>
  }

  export type TutonItemCreateNestedManyWithoutEnrollmentInput = {
    create?: XOR<TutonItemCreateWithoutEnrollmentInput, TutonItemUncheckedCreateWithoutEnrollmentInput> | TutonItemCreateWithoutEnrollmentInput[] | TutonItemUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: TutonItemCreateOrConnectWithoutEnrollmentInput | TutonItemCreateOrConnectWithoutEnrollmentInput[]
    createMany?: TutonItemCreateManyEnrollmentInputEnvelope
    connect?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
  }

  export type StudentCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentsInput
    connect?: StudentWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
  }

  export type TutonItemUncheckedCreateNestedManyWithoutEnrollmentInput = {
    create?: XOR<TutonItemCreateWithoutEnrollmentInput, TutonItemUncheckedCreateWithoutEnrollmentInput> | TutonItemCreateWithoutEnrollmentInput[] | TutonItemUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: TutonItemCreateOrConnectWithoutEnrollmentInput | TutonItemCreateOrConnectWithoutEnrollmentInput[]
    createMany?: TutonItemCreateManyEnrollmentInputEnvelope
    connect?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
  }

  export type TutonItemUpdateManyWithoutEnrollmentNestedInput = {
    create?: XOR<TutonItemCreateWithoutEnrollmentInput, TutonItemUncheckedCreateWithoutEnrollmentInput> | TutonItemCreateWithoutEnrollmentInput[] | TutonItemUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: TutonItemCreateOrConnectWithoutEnrollmentInput | TutonItemCreateOrConnectWithoutEnrollmentInput[]
    upsert?: TutonItemUpsertWithWhereUniqueWithoutEnrollmentInput | TutonItemUpsertWithWhereUniqueWithoutEnrollmentInput[]
    createMany?: TutonItemCreateManyEnrollmentInputEnvelope
    set?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    disconnect?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    delete?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    connect?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    update?: TutonItemUpdateWithWhereUniqueWithoutEnrollmentInput | TutonItemUpdateWithWhereUniqueWithoutEnrollmentInput[]
    updateMany?: TutonItemUpdateManyWithWhereWithoutEnrollmentInput | TutonItemUpdateManyWithWhereWithoutEnrollmentInput[]
    deleteMany?: TutonItemScalarWhereInput | TutonItemScalarWhereInput[]
  }

  export type StudentUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentsInput
    upsert?: StudentUpsertWithoutEnrollmentsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutEnrollmentsInput, StudentUpdateWithoutEnrollmentsInput>, StudentUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    upsert?: CourseUpsertWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutEnrollmentsInput, CourseUpdateWithoutEnrollmentsInput>, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type TutonItemUncheckedUpdateManyWithoutEnrollmentNestedInput = {
    create?: XOR<TutonItemCreateWithoutEnrollmentInput, TutonItemUncheckedCreateWithoutEnrollmentInput> | TutonItemCreateWithoutEnrollmentInput[] | TutonItemUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: TutonItemCreateOrConnectWithoutEnrollmentInput | TutonItemCreateOrConnectWithoutEnrollmentInput[]
    upsert?: TutonItemUpsertWithWhereUniqueWithoutEnrollmentInput | TutonItemUpsertWithWhereUniqueWithoutEnrollmentInput[]
    createMany?: TutonItemCreateManyEnrollmentInputEnvelope
    set?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    disconnect?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    delete?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    connect?: TutonItemWhereUniqueInput | TutonItemWhereUniqueInput[]
    update?: TutonItemUpdateWithWhereUniqueWithoutEnrollmentInput | TutonItemUpdateWithWhereUniqueWithoutEnrollmentInput[]
    updateMany?: TutonItemUpdateManyWithWhereWithoutEnrollmentInput | TutonItemUpdateManyWithWhereWithoutEnrollmentInput[]
    deleteMany?: TutonItemScalarWhereInput | TutonItemScalarWhereInput[]
  }

  export type ReminderCreateNestedManyWithoutItemInput = {
    create?: XOR<ReminderCreateWithoutItemInput, ReminderUncheckedCreateWithoutItemInput> | ReminderCreateWithoutItemInput[] | ReminderUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutItemInput | ReminderCreateOrConnectWithoutItemInput[]
    createMany?: ReminderCreateManyItemInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedOneWithoutItemsInput = {
    create?: XOR<EnrollmentCreateWithoutItemsInput, EnrollmentUncheckedCreateWithoutItemsInput>
    connectOrCreate?: EnrollmentCreateOrConnectWithoutItemsInput
    connect?: EnrollmentWhereUniqueInput
  }

  export type ReminderUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ReminderCreateWithoutItemInput, ReminderUncheckedCreateWithoutItemInput> | ReminderCreateWithoutItemInput[] | ReminderUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutItemInput | ReminderCreateOrConnectWithoutItemInput[]
    createMany?: ReminderCreateManyItemInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type EnumStatusTugasFieldUpdateOperationsInput = {
    set?: $Enums.StatusTugas
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ReminderUpdateManyWithoutItemNestedInput = {
    create?: XOR<ReminderCreateWithoutItemInput, ReminderUncheckedCreateWithoutItemInput> | ReminderCreateWithoutItemInput[] | ReminderUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutItemInput | ReminderCreateOrConnectWithoutItemInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutItemInput | ReminderUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ReminderCreateManyItemInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutItemInput | ReminderUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutItemInput | ReminderUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type EnrollmentUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<EnrollmentCreateWithoutItemsInput, EnrollmentUncheckedCreateWithoutItemsInput>
    connectOrCreate?: EnrollmentCreateOrConnectWithoutItemsInput
    upsert?: EnrollmentUpsertWithoutItemsInput
    connect?: EnrollmentWhereUniqueInput
    update?: XOR<XOR<EnrollmentUpdateToOneWithWhereWithoutItemsInput, EnrollmentUpdateWithoutItemsInput>, EnrollmentUncheckedUpdateWithoutItemsInput>
  }

  export type ReminderUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ReminderCreateWithoutItemInput, ReminderUncheckedCreateWithoutItemInput> | ReminderCreateWithoutItemInput[] | ReminderUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutItemInput | ReminderCreateOrConnectWithoutItemInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutItemInput | ReminderUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ReminderCreateManyItemInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutItemInput | ReminderUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutItemInput | ReminderUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type TutonItemCreateNestedOneWithoutRemindersInput = {
    create?: XOR<TutonItemCreateWithoutRemindersInput, TutonItemUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: TutonItemCreateOrConnectWithoutRemindersInput
    connect?: TutonItemWhereUniqueInput
  }

  export type AdminCreateNestedOneWithoutRemindersInput = {
    create?: XOR<AdminCreateWithoutRemindersInput, AdminUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: AdminCreateOrConnectWithoutRemindersInput
    connect?: AdminWhereUniqueInput
  }

  export type EnumReminderSourceFieldUpdateOperationsInput = {
    set?: $Enums.ReminderSource
  }

  export type EnumReminderStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReminderStatus
  }

  export type EnumReminderChannelFieldUpdateOperationsInput = {
    set?: $Enums.ReminderChannel
  }

  export type TutonItemUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: XOR<TutonItemCreateWithoutRemindersInput, TutonItemUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: TutonItemCreateOrConnectWithoutRemindersInput
    upsert?: TutonItemUpsertWithoutRemindersInput
    connect?: TutonItemWhereUniqueInput
    update?: XOR<XOR<TutonItemUpdateToOneWithWhereWithoutRemindersInput, TutonItemUpdateWithoutRemindersInput>, TutonItemUncheckedUpdateWithoutRemindersInput>
  }

  export type AdminUpdateOneWithoutRemindersNestedInput = {
    create?: XOR<AdminCreateWithoutRemindersInput, AdminUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: AdminCreateOrConnectWithoutRemindersInput
    upsert?: AdminUpsertWithoutRemindersInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutRemindersInput, AdminUpdateWithoutRemindersInput>, AdminUncheckedUpdateWithoutRemindersInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[]
    notIn?: $Enums.AdminRole[]
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[]
    notIn?: $Enums.AdminRole[]
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumJenisTugasFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisTugas | EnumJenisTugasFieldRefInput<$PrismaModel>
    in?: $Enums.JenisTugas[]
    notIn?: $Enums.JenisTugas[]
    not?: NestedEnumJenisTugasFilter<$PrismaModel> | $Enums.JenisTugas
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumJenisTugasWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisTugas | EnumJenisTugasFieldRefInput<$PrismaModel>
    in?: $Enums.JenisTugas[]
    notIn?: $Enums.JenisTugas[]
    not?: NestedEnumJenisTugasWithAggregatesFilter<$PrismaModel> | $Enums.JenisTugas
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJenisTugasFilter<$PrismaModel>
    _max?: NestedEnumJenisTugasFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStatusTugasFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasFilter<$PrismaModel> | $Enums.StatusTugas
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumStatusTugasWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasWithAggregatesFilter<$PrismaModel> | $Enums.StatusTugas
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusTugasFilter<$PrismaModel>
    _max?: NestedEnumStatusTugasFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumReminderSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderSource | EnumReminderSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderSource[]
    notIn?: $Enums.ReminderSource[]
    not?: NestedEnumReminderSourceFilter<$PrismaModel> | $Enums.ReminderSource
  }

  export type NestedEnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[]
    notIn?: $Enums.ReminderStatus[]
    not?: NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus
  }

  export type NestedEnumReminderChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[]
    notIn?: $Enums.ReminderChannel[]
    not?: NestedEnumReminderChannelFilter<$PrismaModel> | $Enums.ReminderChannel
  }

  export type NestedEnumReminderSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderSource | EnumReminderSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderSource[]
    notIn?: $Enums.ReminderSource[]
    not?: NestedEnumReminderSourceWithAggregatesFilter<$PrismaModel> | $Enums.ReminderSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderSourceFilter<$PrismaModel>
    _max?: NestedEnumReminderSourceFilter<$PrismaModel>
  }

  export type NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[]
    notIn?: $Enums.ReminderStatus[]
    not?: NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderStatusFilter<$PrismaModel>
    _max?: NestedEnumReminderStatusFilter<$PrismaModel>
  }

  export type NestedEnumReminderChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[]
    notIn?: $Enums.ReminderChannel[]
    not?: NestedEnumReminderChannelWithAggregatesFilter<$PrismaModel> | $Enums.ReminderChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderChannelFilter<$PrismaModel>
    _max?: NestedEnumReminderChannelFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ReminderCreateWithoutAdminInput = {
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
    item: TutonItemCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateWithoutAdminInput = {
    id?: number
    itemId: number
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type ReminderCreateOrConnectWithoutAdminInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutAdminInput, ReminderUncheckedCreateWithoutAdminInput>
  }

  export type ReminderCreateManyAdminInputEnvelope = {
    data: ReminderCreateManyAdminInput | ReminderCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type ReminderUpsertWithWhereUniqueWithoutAdminInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutAdminInput, ReminderUncheckedUpdateWithoutAdminInput>
    create: XOR<ReminderCreateWithoutAdminInput, ReminderUncheckedCreateWithoutAdminInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutAdminInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutAdminInput, ReminderUncheckedUpdateWithoutAdminInput>
  }

  export type ReminderUpdateManyWithWhereWithoutAdminInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutAdminInput>
  }

  export type ReminderScalarWhereInput = {
    AND?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    OR?: ReminderScalarWhereInput[]
    NOT?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    id?: IntFilter<"Reminder"> | number
    itemId?: IntFilter<"Reminder"> | number
    source?: EnumReminderSourceFilter<"Reminder"> | $Enums.ReminderSource
    status?: EnumReminderStatusFilter<"Reminder"> | $Enums.ReminderStatus
    channel?: EnumReminderChannelFilter<"Reminder"> | $Enums.ReminderChannel
    note?: StringNullableFilter<"Reminder"> | string | null
    createdByAdminId?: IntNullableFilter<"Reminder"> | number | null
    offsetMin?: IntFilter<"Reminder"> | number
    active?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
  }

  export type EnrollmentCreateWithoutStudentInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TutonItemCreateNestedManyWithoutEnrollmentInput
    course: CourseCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutStudentInput = {
    id?: number
    courseId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TutonItemUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentCreateOrConnectWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentCreateManyStudentInputEnvelope = {
    data: EnrollmentCreateManyStudentInput | EnrollmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutStudentInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: IntFilter<"Enrollment"> | number
    studentId?: IntFilter<"Enrollment"> | number
    courseId?: IntFilter<"Enrollment"> | number
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeFilter<"Enrollment"> | Date | string
  }

  export type EnrollmentCreateWithoutCourseInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TutonItemCreateNestedManyWithoutEnrollmentInput
    student: StudentCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutCourseInput = {
    id?: number
    studentId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TutonItemUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentCreateOrConnectWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentCreateManyCourseInputEnvelope = {
    data: EnrollmentCreateManyCourseInput | EnrollmentCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type CourseDeadlineCreateWithoutCourseInput = {
    jenis: $Enums.JenisTugas
    sesi: number
    deadlineAt?: Date | string | null
  }

  export type CourseDeadlineUncheckedCreateWithoutCourseInput = {
    id?: number
    jenis: $Enums.JenisTugas
    sesi: number
    deadlineAt?: Date | string | null
  }

  export type CourseDeadlineCreateOrConnectWithoutCourseInput = {
    where: CourseDeadlineWhereUniqueInput
    create: XOR<CourseDeadlineCreateWithoutCourseInput, CourseDeadlineUncheckedCreateWithoutCourseInput>
  }

  export type CourseDeadlineCreateManyCourseInputEnvelope = {
    data: CourseDeadlineCreateManyCourseInput | CourseDeadlineCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutCourseInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseDeadlineUpsertWithWhereUniqueWithoutCourseInput = {
    where: CourseDeadlineWhereUniqueInput
    update: XOR<CourseDeadlineUpdateWithoutCourseInput, CourseDeadlineUncheckedUpdateWithoutCourseInput>
    create: XOR<CourseDeadlineCreateWithoutCourseInput, CourseDeadlineUncheckedCreateWithoutCourseInput>
  }

  export type CourseDeadlineUpdateWithWhereUniqueWithoutCourseInput = {
    where: CourseDeadlineWhereUniqueInput
    data: XOR<CourseDeadlineUpdateWithoutCourseInput, CourseDeadlineUncheckedUpdateWithoutCourseInput>
  }

  export type CourseDeadlineUpdateManyWithWhereWithoutCourseInput = {
    where: CourseDeadlineScalarWhereInput
    data: XOR<CourseDeadlineUpdateManyMutationInput, CourseDeadlineUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseDeadlineScalarWhereInput = {
    AND?: CourseDeadlineScalarWhereInput | CourseDeadlineScalarWhereInput[]
    OR?: CourseDeadlineScalarWhereInput[]
    NOT?: CourseDeadlineScalarWhereInput | CourseDeadlineScalarWhereInput[]
    id?: IntFilter<"CourseDeadline"> | number
    courseId?: IntFilter<"CourseDeadline"> | number
    jenis?: EnumJenisTugasFilter<"CourseDeadline"> | $Enums.JenisTugas
    sesi?: IntFilter<"CourseDeadline"> | number
    deadlineAt?: DateTimeNullableFilter<"CourseDeadline"> | Date | string | null
  }

  export type CourseCreateWithoutCourseDeadlinesInput = {
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutCourseDeadlinesInput = {
    id?: number
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutCourseDeadlinesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutCourseDeadlinesInput, CourseUncheckedCreateWithoutCourseDeadlinesInput>
  }

  export type CourseUpsertWithoutCourseDeadlinesInput = {
    update: XOR<CourseUpdateWithoutCourseDeadlinesInput, CourseUncheckedUpdateWithoutCourseDeadlinesInput>
    create: XOR<CourseCreateWithoutCourseDeadlinesInput, CourseUncheckedCreateWithoutCourseDeadlinesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutCourseDeadlinesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutCourseDeadlinesInput, CourseUncheckedUpdateWithoutCourseDeadlinesInput>
  }

  export type CourseUpdateWithoutCourseDeadlinesInput = {
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutCourseDeadlinesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type TutonItemCreateWithoutEnrollmentInput = {
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reminders?: ReminderCreateNestedManyWithoutItemInput
  }

  export type TutonItemUncheckedCreateWithoutEnrollmentInput = {
    id?: number
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reminders?: ReminderUncheckedCreateNestedManyWithoutItemInput
  }

  export type TutonItemCreateOrConnectWithoutEnrollmentInput = {
    where: TutonItemWhereUniqueInput
    create: XOR<TutonItemCreateWithoutEnrollmentInput, TutonItemUncheckedCreateWithoutEnrollmentInput>
  }

  export type TutonItemCreateManyEnrollmentInputEnvelope = {
    data: TutonItemCreateManyEnrollmentInput | TutonItemCreateManyEnrollmentInput[]
    skipDuplicates?: boolean
  }

  export type StudentCreateWithoutEnrollmentsInput = {
    nim: string
    noHp: string
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUncheckedCreateWithoutEnrollmentsInput = {
    id?: number
    nim: string
    noHp: string
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentCreateOrConnectWithoutEnrollmentsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
  }

  export type CourseCreateWithoutEnrollmentsInput = {
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courseDeadlines?: CourseDeadlineCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutEnrollmentsInput = {
    id?: number
    nama: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courseDeadlines?: CourseDeadlineUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutEnrollmentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
  }

  export type TutonItemUpsertWithWhereUniqueWithoutEnrollmentInput = {
    where: TutonItemWhereUniqueInput
    update: XOR<TutonItemUpdateWithoutEnrollmentInput, TutonItemUncheckedUpdateWithoutEnrollmentInput>
    create: XOR<TutonItemCreateWithoutEnrollmentInput, TutonItemUncheckedCreateWithoutEnrollmentInput>
  }

  export type TutonItemUpdateWithWhereUniqueWithoutEnrollmentInput = {
    where: TutonItemWhereUniqueInput
    data: XOR<TutonItemUpdateWithoutEnrollmentInput, TutonItemUncheckedUpdateWithoutEnrollmentInput>
  }

  export type TutonItemUpdateManyWithWhereWithoutEnrollmentInput = {
    where: TutonItemScalarWhereInput
    data: XOR<TutonItemUpdateManyMutationInput, TutonItemUncheckedUpdateManyWithoutEnrollmentInput>
  }

  export type TutonItemScalarWhereInput = {
    AND?: TutonItemScalarWhereInput | TutonItemScalarWhereInput[]
    OR?: TutonItemScalarWhereInput[]
    NOT?: TutonItemScalarWhereInput | TutonItemScalarWhereInput[]
    id?: IntFilter<"TutonItem"> | number
    enrollmentId?: IntFilter<"TutonItem"> | number
    jenis?: EnumJenisTugasFilter<"TutonItem"> | $Enums.JenisTugas
    sesi?: IntFilter<"TutonItem"> | number
    status?: EnumStatusTugasFilter<"TutonItem"> | $Enums.StatusTugas
    nilai?: FloatNullableFilter<"TutonItem"> | number | null
    deskripsi?: StringNullableFilter<"TutonItem"> | string | null
    deadlineAt?: DateTimeNullableFilter<"TutonItem"> | Date | string | null
    selesaiAt?: DateTimeNullableFilter<"TutonItem"> | Date | string | null
    createdAt?: DateTimeFilter<"TutonItem"> | Date | string
    updatedAt?: DateTimeFilter<"TutonItem"> | Date | string
  }

  export type StudentUpsertWithoutEnrollmentsInput = {
    update: XOR<StudentUpdateWithoutEnrollmentsInput, StudentUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutEnrollmentsInput, StudentUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type StudentUpdateWithoutEnrollmentsInput = {
    nim?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateWithoutEnrollmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nim?: StringFieldUpdateOperationsInput | string
    noHp?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUpsertWithoutEnrollmentsInput = {
    update: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseUpdateWithoutEnrollmentsInput = {
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courseDeadlines?: CourseDeadlineUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutEnrollmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courseDeadlines?: CourseDeadlineUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type ReminderCreateWithoutItemInput = {
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
    admin?: AdminCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateWithoutItemInput = {
    id?: number
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    createdByAdminId?: number | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type ReminderCreateOrConnectWithoutItemInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutItemInput, ReminderUncheckedCreateWithoutItemInput>
  }

  export type ReminderCreateManyItemInputEnvelope = {
    data: ReminderCreateManyItemInput | ReminderCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutItemsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutEnrollmentsInput
    course: CourseCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutItemsInput = {
    id?: number
    studentId: number
    courseId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutItemsInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutItemsInput, EnrollmentUncheckedCreateWithoutItemsInput>
  }

  export type ReminderUpsertWithWhereUniqueWithoutItemInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutItemInput, ReminderUncheckedUpdateWithoutItemInput>
    create: XOR<ReminderCreateWithoutItemInput, ReminderUncheckedCreateWithoutItemInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutItemInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutItemInput, ReminderUncheckedUpdateWithoutItemInput>
  }

  export type ReminderUpdateManyWithWhereWithoutItemInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutItemInput>
  }

  export type EnrollmentUpsertWithoutItemsInput = {
    update: XOR<EnrollmentUpdateWithoutItemsInput, EnrollmentUncheckedUpdateWithoutItemsInput>
    create: XOR<EnrollmentCreateWithoutItemsInput, EnrollmentUncheckedCreateWithoutItemsInput>
    where?: EnrollmentWhereInput
  }

  export type EnrollmentUpdateToOneWithWhereWithoutItemsInput = {
    where?: EnrollmentWhereInput
    data: XOR<EnrollmentUpdateWithoutItemsInput, EnrollmentUncheckedUpdateWithoutItemsInput>
  }

  export type EnrollmentUpdateWithoutItemsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutonItemCreateWithoutRemindersInput = {
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    enrollment: EnrollmentCreateNestedOneWithoutItemsInput
  }

  export type TutonItemUncheckedCreateWithoutRemindersInput = {
    id?: number
    enrollmentId: number
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TutonItemCreateOrConnectWithoutRemindersInput = {
    where: TutonItemWhereUniqueInput
    create: XOR<TutonItemCreateWithoutRemindersInput, TutonItemUncheckedCreateWithoutRemindersInput>
  }

  export type AdminCreateWithoutRemindersInput = {
    username: string
    passwordHash: string
    role?: $Enums.AdminRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateWithoutRemindersInput = {
    id?: number
    username: string
    passwordHash: string
    role?: $Enums.AdminRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminCreateOrConnectWithoutRemindersInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutRemindersInput, AdminUncheckedCreateWithoutRemindersInput>
  }

  export type TutonItemUpsertWithoutRemindersInput = {
    update: XOR<TutonItemUpdateWithoutRemindersInput, TutonItemUncheckedUpdateWithoutRemindersInput>
    create: XOR<TutonItemCreateWithoutRemindersInput, TutonItemUncheckedCreateWithoutRemindersInput>
    where?: TutonItemWhereInput
  }

  export type TutonItemUpdateToOneWithWhereWithoutRemindersInput = {
    where?: TutonItemWhereInput
    data: XOR<TutonItemUpdateWithoutRemindersInput, TutonItemUncheckedUpdateWithoutRemindersInput>
  }

  export type TutonItemUpdateWithoutRemindersInput = {
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollment?: EnrollmentUpdateOneRequiredWithoutItemsNestedInput
  }

  export type TutonItemUncheckedUpdateWithoutRemindersInput = {
    id?: IntFieldUpdateOperationsInput | number
    enrollmentId?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUpsertWithoutRemindersInput = {
    update: XOR<AdminUpdateWithoutRemindersInput, AdminUncheckedUpdateWithoutRemindersInput>
    create: XOR<AdminCreateWithoutRemindersInput, AdminUncheckedCreateWithoutRemindersInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutRemindersInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutRemindersInput, AdminUncheckedUpdateWithoutRemindersInput>
  }

  export type AdminUpdateWithoutRemindersInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateWithoutRemindersInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateManyAdminInput = {
    id?: number
    itemId: number
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type ReminderUpdateWithoutAdminInput = {
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item?: TutonItemUpdateOneRequiredWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReminderUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EnrollmentCreateManyStudentInput = {
    id?: number
    courseId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentUpdateWithoutStudentInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TutonItemUpdateManyWithoutEnrollmentNestedInput
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TutonItemUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyCourseInput = {
    id?: number
    studentId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseDeadlineCreateManyCourseInput = {
    id?: number
    jenis: $Enums.JenisTugas
    sesi: number
    deadlineAt?: Date | string | null
  }

  export type EnrollmentUpdateWithoutCourseInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TutonItemUpdateManyWithoutEnrollmentNestedInput
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TutonItemUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseDeadlineUpdateWithoutCourseInput = {
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseDeadlineUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseDeadlineUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TutonItemCreateManyEnrollmentInput = {
    id?: number
    jenis: $Enums.JenisTugas
    sesi: number
    status?: $Enums.StatusTugas
    nilai?: number | null
    deskripsi?: string | null
    deadlineAt?: Date | string | null
    selesaiAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TutonItemUpdateWithoutEnrollmentInput = {
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reminders?: ReminderUpdateManyWithoutItemNestedInput
  }

  export type TutonItemUncheckedUpdateWithoutEnrollmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reminders?: ReminderUncheckedUpdateManyWithoutItemNestedInput
  }

  export type TutonItemUncheckedUpdateManyWithoutEnrollmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: EnumJenisTugasFieldUpdateOperationsInput | $Enums.JenisTugas
    sesi?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    nilai?: NullableFloatFieldUpdateOperationsInput | number | null
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    selesaiAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateManyItemInput = {
    id?: number
    source?: $Enums.ReminderSource
    status?: $Enums.ReminderStatus
    channel?: $Enums.ReminderChannel
    note?: string | null
    createdByAdminId?: number | null
    offsetMin?: number
    active?: boolean
    createdAt?: Date | string
    sentAt?: Date | string | null
  }

  export type ReminderUpdateWithoutItemInput = {
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admin?: AdminUpdateOneWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReminderUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    source?: EnumReminderSourceFieldUpdateOperationsInput | $Enums.ReminderSource
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    offsetMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}