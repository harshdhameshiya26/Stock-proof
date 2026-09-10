
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
 * Model tbl_Session
 * 
 */
export type tbl_Session = $Result.DefaultSelection<Prisma.$tbl_SessionPayload>
/**
 * Model tbl_Shop
 * 
 */
export type tbl_Shop = $Result.DefaultSelection<Prisma.$tbl_ShopPayload>
/**
 * Model tbl_User
 * 
 */
export type tbl_User = $Result.DefaultSelection<Prisma.$tbl_UserPayload>
/**
 * Model tbl_Settings
 * 
 */
export type tbl_Settings = $Result.DefaultSelection<Prisma.$tbl_SettingsPayload>
/**
 * Model tbl_AuditSession
 * 
 */
export type tbl_AuditSession = $Result.DefaultSelection<Prisma.$tbl_AuditSessionPayload>
/**
 * Model tbl_AuditLineItem
 * 
 */
export type tbl_AuditLineItem = $Result.DefaultSelection<Prisma.$tbl_AuditLineItemPayload>
/**
 * Model tbl_DiscrepancyReason
 * 
 */
export type tbl_DiscrepancyReason = $Result.DefaultSelection<Prisma.$tbl_DiscrepancyReasonPayload>
/**
 * Model tbl_AuditLog
 * 
 */
export type tbl_AuditLog = $Result.DefaultSelection<Prisma.$tbl_AuditLogPayload>
/**
 * Model tbl_Subscription
 * 
 */
export type tbl_Subscription = $Result.DefaultSelection<Prisma.$tbl_SubscriptionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tbl_Sessions
 * const tbl_Sessions = await prisma.tbl_Session.findMany()
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
   * // Fetch zero or more Tbl_Sessions
   * const tbl_Sessions = await prisma.tbl_Session.findMany()
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tbl_Session`: Exposes CRUD operations for the **tbl_Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_Sessions
    * const tbl_Sessions = await prisma.tbl_Session.findMany()
    * ```
    */
  get tbl_Session(): Prisma.tbl_SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_Shop`: Exposes CRUD operations for the **tbl_Shop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_Shops
    * const tbl_Shops = await prisma.tbl_Shop.findMany()
    * ```
    */
  get tbl_Shop(): Prisma.tbl_ShopDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_User`: Exposes CRUD operations for the **tbl_User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_Users
    * const tbl_Users = await prisma.tbl_User.findMany()
    * ```
    */
  get tbl_User(): Prisma.tbl_UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_Settings`: Exposes CRUD operations for the **tbl_Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_Settings
    * const tbl_Settings = await prisma.tbl_Settings.findMany()
    * ```
    */
  get tbl_Settings(): Prisma.tbl_SettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_AuditSession`: Exposes CRUD operations for the **tbl_AuditSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_AuditSessions
    * const tbl_AuditSessions = await prisma.tbl_AuditSession.findMany()
    * ```
    */
  get tbl_AuditSession(): Prisma.tbl_AuditSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_AuditLineItem`: Exposes CRUD operations for the **tbl_AuditLineItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_AuditLineItems
    * const tbl_AuditLineItems = await prisma.tbl_AuditLineItem.findMany()
    * ```
    */
  get tbl_AuditLineItem(): Prisma.tbl_AuditLineItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_DiscrepancyReason`: Exposes CRUD operations for the **tbl_DiscrepancyReason** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_DiscrepancyReasons
    * const tbl_DiscrepancyReasons = await prisma.tbl_DiscrepancyReason.findMany()
    * ```
    */
  get tbl_DiscrepancyReason(): Prisma.tbl_DiscrepancyReasonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_AuditLog`: Exposes CRUD operations for the **tbl_AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_AuditLogs
    * const tbl_AuditLogs = await prisma.tbl_AuditLog.findMany()
    * ```
    */
  get tbl_AuditLog(): Prisma.tbl_AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tbl_Subscription`: Exposes CRUD operations for the **tbl_Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tbl_Subscriptions
    * const tbl_Subscriptions = await prisma.tbl_Subscription.findMany()
    * ```
    */
  get tbl_Subscription(): Prisma.tbl_SubscriptionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    tbl_Session: 'tbl_Session',
    tbl_Shop: 'tbl_Shop',
    tbl_User: 'tbl_User',
    tbl_Settings: 'tbl_Settings',
    tbl_AuditSession: 'tbl_AuditSession',
    tbl_AuditLineItem: 'tbl_AuditLineItem',
    tbl_DiscrepancyReason: 'tbl_DiscrepancyReason',
    tbl_AuditLog: 'tbl_AuditLog',
    tbl_Subscription: 'tbl_Subscription'
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
      modelProps: "tbl_Session" | "tbl_Shop" | "tbl_User" | "tbl_Settings" | "tbl_AuditSession" | "tbl_AuditLineItem" | "tbl_DiscrepancyReason" | "tbl_AuditLog" | "tbl_Subscription"
      txIsolationLevel: never
    }
    model: {
      tbl_Session: {
        payload: Prisma.$tbl_SessionPayload<ExtArgs>
        fields: Prisma.tbl_SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload>
          }
          findFirst: {
            args: Prisma.tbl_SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload>
          }
          findMany: {
            args: Prisma.tbl_SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload>[]
          }
          create: {
            args: Prisma.tbl_SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload>
          }
          createMany: {
            args: Prisma.tbl_SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload>
          }
          update: {
            args: Prisma.tbl_SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload>
          }
          deleteMany: {
            args: Prisma.tbl_SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SessionPayload>
          }
          aggregate: {
            args: Prisma.Tbl_SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_Session>
          }
          groupBy: {
            args: Prisma.tbl_SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_SessionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_SessionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_SessionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_SessionCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_SessionCountAggregateOutputType> | number
          }
        }
      }
      tbl_Shop: {
        payload: Prisma.$tbl_ShopPayload<ExtArgs>
        fields: Prisma.tbl_ShopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_ShopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_ShopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload>
          }
          findFirst: {
            args: Prisma.tbl_ShopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_ShopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload>
          }
          findMany: {
            args: Prisma.tbl_ShopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload>[]
          }
          create: {
            args: Prisma.tbl_ShopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload>
          }
          createMany: {
            args: Prisma.tbl_ShopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_ShopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload>
          }
          update: {
            args: Prisma.tbl_ShopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload>
          }
          deleteMany: {
            args: Prisma.tbl_ShopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_ShopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_ShopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_ShopPayload>
          }
          aggregate: {
            args: Prisma.Tbl_ShopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_Shop>
          }
          groupBy: {
            args: Prisma.tbl_ShopGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_ShopGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_ShopFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_ShopAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_ShopCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_ShopCountAggregateOutputType> | number
          }
        }
      }
      tbl_User: {
        payload: Prisma.$tbl_UserPayload<ExtArgs>
        fields: Prisma.tbl_UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload>
          }
          findFirst: {
            args: Prisma.tbl_UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload>
          }
          findMany: {
            args: Prisma.tbl_UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload>[]
          }
          create: {
            args: Prisma.tbl_UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload>
          }
          createMany: {
            args: Prisma.tbl_UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload>
          }
          update: {
            args: Prisma.tbl_UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload>
          }
          deleteMany: {
            args: Prisma.tbl_UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_UserPayload>
          }
          aggregate: {
            args: Prisma.Tbl_UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_User>
          }
          groupBy: {
            args: Prisma.tbl_UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_UserCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_UserCountAggregateOutputType> | number
          }
        }
      }
      tbl_Settings: {
        payload: Prisma.$tbl_SettingsPayload<ExtArgs>
        fields: Prisma.tbl_SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload>
          }
          findFirst: {
            args: Prisma.tbl_SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload>
          }
          findMany: {
            args: Prisma.tbl_SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload>[]
          }
          create: {
            args: Prisma.tbl_SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload>
          }
          createMany: {
            args: Prisma.tbl_SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload>
          }
          update: {
            args: Prisma.tbl_SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload>
          }
          deleteMany: {
            args: Prisma.tbl_SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SettingsPayload>
          }
          aggregate: {
            args: Prisma.Tbl_SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_Settings>
          }
          groupBy: {
            args: Prisma.tbl_SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_SettingsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_SettingsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_SettingsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_SettingsCountAggregateOutputType> | number
          }
        }
      }
      tbl_AuditSession: {
        payload: Prisma.$tbl_AuditSessionPayload<ExtArgs>
        fields: Prisma.tbl_AuditSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_AuditSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_AuditSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload>
          }
          findFirst: {
            args: Prisma.tbl_AuditSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_AuditSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload>
          }
          findMany: {
            args: Prisma.tbl_AuditSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload>[]
          }
          create: {
            args: Prisma.tbl_AuditSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload>
          }
          createMany: {
            args: Prisma.tbl_AuditSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_AuditSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload>
          }
          update: {
            args: Prisma.tbl_AuditSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload>
          }
          deleteMany: {
            args: Prisma.tbl_AuditSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_AuditSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_AuditSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditSessionPayload>
          }
          aggregate: {
            args: Prisma.Tbl_AuditSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_AuditSession>
          }
          groupBy: {
            args: Prisma.tbl_AuditSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_AuditSessionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_AuditSessionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_AuditSessionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_AuditSessionCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_AuditSessionCountAggregateOutputType> | number
          }
        }
      }
      tbl_AuditLineItem: {
        payload: Prisma.$tbl_AuditLineItemPayload<ExtArgs>
        fields: Prisma.tbl_AuditLineItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_AuditLineItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_AuditLineItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload>
          }
          findFirst: {
            args: Prisma.tbl_AuditLineItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_AuditLineItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload>
          }
          findMany: {
            args: Prisma.tbl_AuditLineItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload>[]
          }
          create: {
            args: Prisma.tbl_AuditLineItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload>
          }
          createMany: {
            args: Prisma.tbl_AuditLineItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_AuditLineItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload>
          }
          update: {
            args: Prisma.tbl_AuditLineItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload>
          }
          deleteMany: {
            args: Prisma.tbl_AuditLineItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_AuditLineItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_AuditLineItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLineItemPayload>
          }
          aggregate: {
            args: Prisma.Tbl_AuditLineItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_AuditLineItem>
          }
          groupBy: {
            args: Prisma.tbl_AuditLineItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_AuditLineItemGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_AuditLineItemFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_AuditLineItemAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_AuditLineItemCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_AuditLineItemCountAggregateOutputType> | number
          }
        }
      }
      tbl_DiscrepancyReason: {
        payload: Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>
        fields: Prisma.tbl_DiscrepancyReasonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_DiscrepancyReasonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_DiscrepancyReasonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload>
          }
          findFirst: {
            args: Prisma.tbl_DiscrepancyReasonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_DiscrepancyReasonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload>
          }
          findMany: {
            args: Prisma.tbl_DiscrepancyReasonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload>[]
          }
          create: {
            args: Prisma.tbl_DiscrepancyReasonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload>
          }
          createMany: {
            args: Prisma.tbl_DiscrepancyReasonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_DiscrepancyReasonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload>
          }
          update: {
            args: Prisma.tbl_DiscrepancyReasonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload>
          }
          deleteMany: {
            args: Prisma.tbl_DiscrepancyReasonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_DiscrepancyReasonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_DiscrepancyReasonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_DiscrepancyReasonPayload>
          }
          aggregate: {
            args: Prisma.Tbl_DiscrepancyReasonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_DiscrepancyReason>
          }
          groupBy: {
            args: Prisma.tbl_DiscrepancyReasonGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_DiscrepancyReasonGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_DiscrepancyReasonFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_DiscrepancyReasonAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_DiscrepancyReasonCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_DiscrepancyReasonCountAggregateOutputType> | number
          }
        }
      }
      tbl_AuditLog: {
        payload: Prisma.$tbl_AuditLogPayload<ExtArgs>
        fields: Prisma.tbl_AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload>
          }
          findFirst: {
            args: Prisma.tbl_AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload>
          }
          findMany: {
            args: Prisma.tbl_AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload>[]
          }
          create: {
            args: Prisma.tbl_AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload>
          }
          createMany: {
            args: Prisma.tbl_AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload>
          }
          update: {
            args: Prisma.tbl_AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.tbl_AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_AuditLogPayload>
          }
          aggregate: {
            args: Prisma.Tbl_AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_AuditLog>
          }
          groupBy: {
            args: Prisma.tbl_AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_AuditLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_AuditLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_AuditLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_AuditLogCountAggregateOutputType> | number
          }
        }
      }
      tbl_Subscription: {
        payload: Prisma.$tbl_SubscriptionPayload<ExtArgs>
        fields: Prisma.tbl_SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tbl_SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tbl_SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.tbl_SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tbl_SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload>
          }
          findMany: {
            args: Prisma.tbl_SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload>[]
          }
          create: {
            args: Prisma.tbl_SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload>
          }
          createMany: {
            args: Prisma.tbl_SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tbl_SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload>
          }
          update: {
            args: Prisma.tbl_SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.tbl_SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tbl_SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tbl_SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tbl_SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.Tbl_SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTbl_Subscription>
          }
          groupBy: {
            args: Prisma.tbl_SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tbl_SubscriptionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.tbl_SubscriptionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.tbl_SubscriptionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.tbl_SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<Tbl_SubscriptionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
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
    }
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
    tbl_Session?: tbl_SessionOmit
    tbl_Shop?: tbl_ShopOmit
    tbl_User?: tbl_UserOmit
    tbl_Settings?: tbl_SettingsOmit
    tbl_AuditSession?: tbl_AuditSessionOmit
    tbl_AuditLineItem?: tbl_AuditLineItemOmit
    tbl_DiscrepancyReason?: tbl_DiscrepancyReasonOmit
    tbl_AuditLog?: tbl_AuditLogOmit
    tbl_Subscription?: tbl_SubscriptionOmit
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
   * Models
   */

  /**
   * Model tbl_Session
   */

  export type AggregateTbl_Session = {
    _count: Tbl_SessionCountAggregateOutputType | null
    _avg: Tbl_SessionAvgAggregateOutputType | null
    _sum: Tbl_SessionSumAggregateOutputType | null
    _min: Tbl_SessionMinAggregateOutputType | null
    _max: Tbl_SessionMaxAggregateOutputType | null
  }

  export type Tbl_SessionAvgAggregateOutputType = {
    userId: number | null
  }

  export type Tbl_SessionSumAggregateOutputType = {
    userId: bigint | null
  }

  export type Tbl_SessionMinAggregateOutputType = {
    pk: string | null
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    refreshToken: string | null
    refreshTokenExpires: Date | null
  }

  export type Tbl_SessionMaxAggregateOutputType = {
    pk: string | null
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    refreshToken: string | null
    refreshTokenExpires: Date | null
  }

  export type Tbl_SessionCountAggregateOutputType = {
    pk: number
    id: number
    shop: number
    state: number
    isOnline: number
    scope: number
    expires: number
    accessToken: number
    userId: number
    firstName: number
    lastName: number
    email: number
    accountOwner: number
    locale: number
    collaborator: number
    emailVerified: number
    refreshToken: number
    refreshTokenExpires: number
    _all: number
  }


  export type Tbl_SessionAvgAggregateInputType = {
    userId?: true
  }

  export type Tbl_SessionSumAggregateInputType = {
    userId?: true
  }

  export type Tbl_SessionMinAggregateInputType = {
    pk?: true
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    refreshToken?: true
    refreshTokenExpires?: true
  }

  export type Tbl_SessionMaxAggregateInputType = {
    pk?: true
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    refreshToken?: true
    refreshTokenExpires?: true
  }

  export type Tbl_SessionCountAggregateInputType = {
    pk?: true
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    refreshToken?: true
    refreshTokenExpires?: true
    _all?: true
  }

  export type Tbl_SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Session to aggregate.
     */
    where?: tbl_SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Sessions to fetch.
     */
    orderBy?: tbl_SessionOrderByWithRelationInput | tbl_SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_Sessions
    **/
    _count?: true | Tbl_SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tbl_SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tbl_SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_SessionMaxAggregateInputType
  }

  export type GetTbl_SessionAggregateType<T extends Tbl_SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_Session]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_Session[P]>
      : GetScalarType<T[P], AggregateTbl_Session[P]>
  }




  export type tbl_SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_SessionWhereInput
    orderBy?: tbl_SessionOrderByWithAggregationInput | tbl_SessionOrderByWithAggregationInput[]
    by: Tbl_SessionScalarFieldEnum[] | Tbl_SessionScalarFieldEnum
    having?: tbl_SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_SessionCountAggregateInputType | true
    _avg?: Tbl_SessionAvgAggregateInputType
    _sum?: Tbl_SessionSumAggregateInputType
    _min?: Tbl_SessionMinAggregateInputType
    _max?: Tbl_SessionMaxAggregateInputType
  }

  export type Tbl_SessionGroupByOutputType = {
    pk: string
    id: string
    shop: string
    state: string
    isOnline: boolean
    scope: string | null
    expires: Date | null
    accessToken: string
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    refreshToken: string | null
    refreshTokenExpires: Date | null
    _count: Tbl_SessionCountAggregateOutputType | null
    _avg: Tbl_SessionAvgAggregateOutputType | null
    _sum: Tbl_SessionSumAggregateOutputType | null
    _min: Tbl_SessionMinAggregateOutputType | null
    _max: Tbl_SessionMaxAggregateOutputType | null
  }

  type GetTbl_SessionGroupByPayload<T extends tbl_SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_SessionGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_SessionGroupByOutputType[P]>
        }
      >
    >


  export type tbl_SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pk?: boolean
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
    refreshToken?: boolean
    refreshTokenExpires?: boolean
  }, ExtArgs["result"]["tbl_Session"]>



  export type tbl_SessionSelectScalar = {
    pk?: boolean
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
    refreshToken?: boolean
    refreshTokenExpires?: boolean
  }

  export type tbl_SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"pk" | "id" | "shop" | "state" | "isOnline" | "scope" | "expires" | "accessToken" | "userId" | "firstName" | "lastName" | "email" | "accountOwner" | "locale" | "collaborator" | "emailVerified" | "refreshToken" | "refreshTokenExpires", ExtArgs["result"]["tbl_Session"]>

  export type $tbl_SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_Session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      pk: string
      id: string
      shop: string
      state: string
      isOnline: boolean
      scope: string | null
      expires: Date | null
      accessToken: string
      userId: bigint | null
      firstName: string | null
      lastName: string | null
      email: string | null
      accountOwner: boolean
      locale: string | null
      collaborator: boolean | null
      emailVerified: boolean | null
      refreshToken: string | null
      refreshTokenExpires: Date | null
    }, ExtArgs["result"]["tbl_Session"]>
    composites: {}
  }

  type tbl_SessionGetPayload<S extends boolean | null | undefined | tbl_SessionDefaultArgs> = $Result.GetResult<Prisma.$tbl_SessionPayload, S>

  type tbl_SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_SessionCountAggregateInputType | true
    }

  export interface tbl_SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_Session'], meta: { name: 'tbl_Session' } }
    /**
     * Find zero or one Tbl_Session that matches the filter.
     * @param {tbl_SessionFindUniqueArgs} args - Arguments to find a Tbl_Session
     * @example
     * // Get one Tbl_Session
     * const tbl_Session = await prisma.tbl_Session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_SessionFindUniqueArgs>(args: SelectSubset<T, tbl_SessionFindUniqueArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_SessionFindUniqueOrThrowArgs} args - Arguments to find a Tbl_Session
     * @example
     * // Get one Tbl_Session
     * const tbl_Session = await prisma.tbl_Session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SessionFindFirstArgs} args - Arguments to find a Tbl_Session
     * @example
     * // Get one Tbl_Session
     * const tbl_Session = await prisma.tbl_Session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_SessionFindFirstArgs>(args?: SelectSubset<T, tbl_SessionFindFirstArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SessionFindFirstOrThrowArgs} args - Arguments to find a Tbl_Session
     * @example
     * // Get one Tbl_Session
     * const tbl_Session = await prisma.tbl_Session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_Sessions
     * const tbl_Sessions = await prisma.tbl_Session.findMany()
     * 
     * // Get first 10 Tbl_Sessions
     * const tbl_Sessions = await prisma.tbl_Session.findMany({ take: 10 })
     * 
     * // Only select the `pk`
     * const tbl_SessionWithPkOnly = await prisma.tbl_Session.findMany({ select: { pk: true } })
     * 
     */
    findMany<T extends tbl_SessionFindManyArgs>(args?: SelectSubset<T, tbl_SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_Session.
     * @param {tbl_SessionCreateArgs} args - Arguments to create a Tbl_Session.
     * @example
     * // Create one Tbl_Session
     * const Tbl_Session = await prisma.tbl_Session.create({
     *   data: {
     *     // ... data to create a Tbl_Session
     *   }
     * })
     * 
     */
    create<T extends tbl_SessionCreateArgs>(args: SelectSubset<T, tbl_SessionCreateArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_Sessions.
     * @param {tbl_SessionCreateManyArgs} args - Arguments to create many Tbl_Sessions.
     * @example
     * // Create many Tbl_Sessions
     * const tbl_Session = await prisma.tbl_Session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_SessionCreateManyArgs>(args?: SelectSubset<T, tbl_SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_Session.
     * @param {tbl_SessionDeleteArgs} args - Arguments to delete one Tbl_Session.
     * @example
     * // Delete one Tbl_Session
     * const Tbl_Session = await prisma.tbl_Session.delete({
     *   where: {
     *     // ... filter to delete one Tbl_Session
     *   }
     * })
     * 
     */
    delete<T extends tbl_SessionDeleteArgs>(args: SelectSubset<T, tbl_SessionDeleteArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_Session.
     * @param {tbl_SessionUpdateArgs} args - Arguments to update one Tbl_Session.
     * @example
     * // Update one Tbl_Session
     * const tbl_Session = await prisma.tbl_Session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_SessionUpdateArgs>(args: SelectSubset<T, tbl_SessionUpdateArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_Sessions.
     * @param {tbl_SessionDeleteManyArgs} args - Arguments to filter Tbl_Sessions to delete.
     * @example
     * // Delete a few Tbl_Sessions
     * const { count } = await prisma.tbl_Session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_SessionDeleteManyArgs>(args?: SelectSubset<T, tbl_SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_Sessions
     * const tbl_Session = await prisma.tbl_Session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_SessionUpdateManyArgs>(args: SelectSubset<T, tbl_SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_Session.
     * @param {tbl_SessionUpsertArgs} args - Arguments to update or create a Tbl_Session.
     * @example
     * // Update or create a Tbl_Session
     * const tbl_Session = await prisma.tbl_Session.upsert({
     *   create: {
     *     // ... data to create a Tbl_Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_Session we want to update
     *   }
     * })
     */
    upsert<T extends tbl_SessionUpsertArgs>(args: SelectSubset<T, tbl_SessionUpsertArgs<ExtArgs>>): Prisma__tbl_SessionClient<$Result.GetResult<Prisma.$tbl_SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Sessions that matches the filter.
     * @param {tbl_SessionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_Session = await prisma.tbl_Session.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_SessionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_Session.
     * @param {tbl_SessionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_Session = await prisma.tbl_Session.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_SessionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SessionCountArgs} args - Arguments to filter Tbl_Sessions to count.
     * @example
     * // Count the number of Tbl_Sessions
     * const count = await prisma.tbl_Session.count({
     *   where: {
     *     // ... the filter for the Tbl_Sessions we want to count
     *   }
     * })
    **/
    count<T extends tbl_SessionCountArgs>(
      args?: Subset<T, tbl_SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_SessionAggregateArgs>(args: Subset<T, Tbl_SessionAggregateArgs>): Prisma.PrismaPromise<GetTbl_SessionAggregateType<T>>

    /**
     * Group by Tbl_Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SessionGroupByArgs} args - Group by arguments.
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
      T extends tbl_SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_SessionGroupByArgs['orderBy'] }
        : { orderBy?: tbl_SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_SessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_Session model
   */
  readonly fields: tbl_SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_Session model
   */
  interface tbl_SessionFieldRefs {
    readonly pk: FieldRef<"tbl_Session", 'String'>
    readonly id: FieldRef<"tbl_Session", 'String'>
    readonly shop: FieldRef<"tbl_Session", 'String'>
    readonly state: FieldRef<"tbl_Session", 'String'>
    readonly isOnline: FieldRef<"tbl_Session", 'Boolean'>
    readonly scope: FieldRef<"tbl_Session", 'String'>
    readonly expires: FieldRef<"tbl_Session", 'DateTime'>
    readonly accessToken: FieldRef<"tbl_Session", 'String'>
    readonly userId: FieldRef<"tbl_Session", 'BigInt'>
    readonly firstName: FieldRef<"tbl_Session", 'String'>
    readonly lastName: FieldRef<"tbl_Session", 'String'>
    readonly email: FieldRef<"tbl_Session", 'String'>
    readonly accountOwner: FieldRef<"tbl_Session", 'Boolean'>
    readonly locale: FieldRef<"tbl_Session", 'String'>
    readonly collaborator: FieldRef<"tbl_Session", 'Boolean'>
    readonly emailVerified: FieldRef<"tbl_Session", 'Boolean'>
    readonly refreshToken: FieldRef<"tbl_Session", 'String'>
    readonly refreshTokenExpires: FieldRef<"tbl_Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_Session findUnique
   */
  export type tbl_SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Session to fetch.
     */
    where: tbl_SessionWhereUniqueInput
  }

  /**
   * tbl_Session findUniqueOrThrow
   */
  export type tbl_SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Session to fetch.
     */
    where: tbl_SessionWhereUniqueInput
  }

  /**
   * tbl_Session findFirst
   */
  export type tbl_SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Session to fetch.
     */
    where?: tbl_SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Sessions to fetch.
     */
    orderBy?: tbl_SessionOrderByWithRelationInput | tbl_SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Sessions.
     */
    cursor?: tbl_SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Sessions.
     */
    distinct?: Tbl_SessionScalarFieldEnum | Tbl_SessionScalarFieldEnum[]
  }

  /**
   * tbl_Session findFirstOrThrow
   */
  export type tbl_SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Session to fetch.
     */
    where?: tbl_SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Sessions to fetch.
     */
    orderBy?: tbl_SessionOrderByWithRelationInput | tbl_SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Sessions.
     */
    cursor?: tbl_SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Sessions.
     */
    distinct?: Tbl_SessionScalarFieldEnum | Tbl_SessionScalarFieldEnum[]
  }

  /**
   * tbl_Session findMany
   */
  export type tbl_SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Sessions to fetch.
     */
    where?: tbl_SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Sessions to fetch.
     */
    orderBy?: tbl_SessionOrderByWithRelationInput | tbl_SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_Sessions.
     */
    cursor?: tbl_SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Sessions.
     */
    skip?: number
    distinct?: Tbl_SessionScalarFieldEnum | Tbl_SessionScalarFieldEnum[]
  }

  /**
   * tbl_Session create
   */
  export type tbl_SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_Session.
     */
    data: XOR<tbl_SessionCreateInput, tbl_SessionUncheckedCreateInput>
  }

  /**
   * tbl_Session createMany
   */
  export type tbl_SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_Sessions.
     */
    data: tbl_SessionCreateManyInput | tbl_SessionCreateManyInput[]
  }

  /**
   * tbl_Session update
   */
  export type tbl_SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_Session.
     */
    data: XOR<tbl_SessionUpdateInput, tbl_SessionUncheckedUpdateInput>
    /**
     * Choose, which tbl_Session to update.
     */
    where: tbl_SessionWhereUniqueInput
  }

  /**
   * tbl_Session updateMany
   */
  export type tbl_SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_Sessions.
     */
    data: XOR<tbl_SessionUpdateManyMutationInput, tbl_SessionUncheckedUpdateManyInput>
    /**
     * Filter which tbl_Sessions to update
     */
    where?: tbl_SessionWhereInput
    /**
     * Limit how many tbl_Sessions to update.
     */
    limit?: number
  }

  /**
   * tbl_Session upsert
   */
  export type tbl_SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_Session to update in case it exists.
     */
    where: tbl_SessionWhereUniqueInput
    /**
     * In case the tbl_Session found by the `where` argument doesn't exist, create a new tbl_Session with this data.
     */
    create: XOR<tbl_SessionCreateInput, tbl_SessionUncheckedCreateInput>
    /**
     * In case the tbl_Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_SessionUpdateInput, tbl_SessionUncheckedUpdateInput>
  }

  /**
   * tbl_Session delete
   */
  export type tbl_SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
    /**
     * Filter which tbl_Session to delete.
     */
    where: tbl_SessionWhereUniqueInput
  }

  /**
   * tbl_Session deleteMany
   */
  export type tbl_SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Sessions to delete
     */
    where?: tbl_SessionWhereInput
    /**
     * Limit how many tbl_Sessions to delete.
     */
    limit?: number
  }

  /**
   * tbl_Session findRaw
   */
  export type tbl_SessionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Session aggregateRaw
   */
  export type tbl_SessionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Session without action
   */
  export type tbl_SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Session
     */
    select?: tbl_SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Session
     */
    omit?: tbl_SessionOmit<ExtArgs> | null
  }


  /**
   * Model tbl_Shop
   */

  export type AggregateTbl_Shop = {
    _count: Tbl_ShopCountAggregateOutputType | null
    _min: Tbl_ShopMinAggregateOutputType | null
    _max: Tbl_ShopMaxAggregateOutputType | null
  }

  export type Tbl_ShopMinAggregateOutputType = {
    id: string | null
    shopifyDomain: string | null
    accessToken: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_ShopMaxAggregateOutputType = {
    id: string | null
    shopifyDomain: string | null
    accessToken: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_ShopCountAggregateOutputType = {
    id: number
    shopifyDomain: number
    accessToken: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Tbl_ShopMinAggregateInputType = {
    id?: true
    shopifyDomain?: true
    accessToken?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_ShopMaxAggregateInputType = {
    id?: true
    shopifyDomain?: true
    accessToken?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_ShopCountAggregateInputType = {
    id?: true
    shopifyDomain?: true
    accessToken?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Tbl_ShopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Shop to aggregate.
     */
    where?: tbl_ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Shops to fetch.
     */
    orderBy?: tbl_ShopOrderByWithRelationInput | tbl_ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_Shops
    **/
    _count?: true | Tbl_ShopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_ShopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_ShopMaxAggregateInputType
  }

  export type GetTbl_ShopAggregateType<T extends Tbl_ShopAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_Shop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_Shop[P]>
      : GetScalarType<T[P], AggregateTbl_Shop[P]>
  }




  export type tbl_ShopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_ShopWhereInput
    orderBy?: tbl_ShopOrderByWithAggregationInput | tbl_ShopOrderByWithAggregationInput[]
    by: Tbl_ShopScalarFieldEnum[] | Tbl_ShopScalarFieldEnum
    having?: tbl_ShopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_ShopCountAggregateInputType | true
    _min?: Tbl_ShopMinAggregateInputType
    _max?: Tbl_ShopMaxAggregateInputType
  }

  export type Tbl_ShopGroupByOutputType = {
    id: string
    shopifyDomain: string
    accessToken: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: Tbl_ShopCountAggregateOutputType | null
    _min: Tbl_ShopMinAggregateOutputType | null
    _max: Tbl_ShopMaxAggregateOutputType | null
  }

  type GetTbl_ShopGroupByPayload<T extends tbl_ShopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_ShopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_ShopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_ShopGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_ShopGroupByOutputType[P]>
        }
      >
    >


  export type tbl_ShopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopifyDomain?: boolean
    accessToken?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tbl_Shop"]>



  export type tbl_ShopSelectScalar = {
    id?: boolean
    shopifyDomain?: boolean
    accessToken?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type tbl_ShopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopifyDomain" | "accessToken" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["tbl_Shop"]>

  export type $tbl_ShopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_Shop"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopifyDomain: string
      accessToken: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tbl_Shop"]>
    composites: {}
  }

  type tbl_ShopGetPayload<S extends boolean | null | undefined | tbl_ShopDefaultArgs> = $Result.GetResult<Prisma.$tbl_ShopPayload, S>

  type tbl_ShopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_ShopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_ShopCountAggregateInputType | true
    }

  export interface tbl_ShopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_Shop'], meta: { name: 'tbl_Shop' } }
    /**
     * Find zero or one Tbl_Shop that matches the filter.
     * @param {tbl_ShopFindUniqueArgs} args - Arguments to find a Tbl_Shop
     * @example
     * // Get one Tbl_Shop
     * const tbl_Shop = await prisma.tbl_Shop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_ShopFindUniqueArgs>(args: SelectSubset<T, tbl_ShopFindUniqueArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_Shop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_ShopFindUniqueOrThrowArgs} args - Arguments to find a Tbl_Shop
     * @example
     * // Get one Tbl_Shop
     * const tbl_Shop = await prisma.tbl_Shop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_ShopFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_ShopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Shop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_ShopFindFirstArgs} args - Arguments to find a Tbl_Shop
     * @example
     * // Get one Tbl_Shop
     * const tbl_Shop = await prisma.tbl_Shop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_ShopFindFirstArgs>(args?: SelectSubset<T, tbl_ShopFindFirstArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Shop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_ShopFindFirstOrThrowArgs} args - Arguments to find a Tbl_Shop
     * @example
     * // Get one Tbl_Shop
     * const tbl_Shop = await prisma.tbl_Shop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_ShopFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_ShopFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Shops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_ShopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_Shops
     * const tbl_Shops = await prisma.tbl_Shop.findMany()
     * 
     * // Get first 10 Tbl_Shops
     * const tbl_Shops = await prisma.tbl_Shop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_ShopWithIdOnly = await prisma.tbl_Shop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_ShopFindManyArgs>(args?: SelectSubset<T, tbl_ShopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_Shop.
     * @param {tbl_ShopCreateArgs} args - Arguments to create a Tbl_Shop.
     * @example
     * // Create one Tbl_Shop
     * const Tbl_Shop = await prisma.tbl_Shop.create({
     *   data: {
     *     // ... data to create a Tbl_Shop
     *   }
     * })
     * 
     */
    create<T extends tbl_ShopCreateArgs>(args: SelectSubset<T, tbl_ShopCreateArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_Shops.
     * @param {tbl_ShopCreateManyArgs} args - Arguments to create many Tbl_Shops.
     * @example
     * // Create many Tbl_Shops
     * const tbl_Shop = await prisma.tbl_Shop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_ShopCreateManyArgs>(args?: SelectSubset<T, tbl_ShopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_Shop.
     * @param {tbl_ShopDeleteArgs} args - Arguments to delete one Tbl_Shop.
     * @example
     * // Delete one Tbl_Shop
     * const Tbl_Shop = await prisma.tbl_Shop.delete({
     *   where: {
     *     // ... filter to delete one Tbl_Shop
     *   }
     * })
     * 
     */
    delete<T extends tbl_ShopDeleteArgs>(args: SelectSubset<T, tbl_ShopDeleteArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_Shop.
     * @param {tbl_ShopUpdateArgs} args - Arguments to update one Tbl_Shop.
     * @example
     * // Update one Tbl_Shop
     * const tbl_Shop = await prisma.tbl_Shop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_ShopUpdateArgs>(args: SelectSubset<T, tbl_ShopUpdateArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_Shops.
     * @param {tbl_ShopDeleteManyArgs} args - Arguments to filter Tbl_Shops to delete.
     * @example
     * // Delete a few Tbl_Shops
     * const { count } = await prisma.tbl_Shop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_ShopDeleteManyArgs>(args?: SelectSubset<T, tbl_ShopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_ShopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_Shops
     * const tbl_Shop = await prisma.tbl_Shop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_ShopUpdateManyArgs>(args: SelectSubset<T, tbl_ShopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_Shop.
     * @param {tbl_ShopUpsertArgs} args - Arguments to update or create a Tbl_Shop.
     * @example
     * // Update or create a Tbl_Shop
     * const tbl_Shop = await prisma.tbl_Shop.upsert({
     *   create: {
     *     // ... data to create a Tbl_Shop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_Shop we want to update
     *   }
     * })
     */
    upsert<T extends tbl_ShopUpsertArgs>(args: SelectSubset<T, tbl_ShopUpsertArgs<ExtArgs>>): Prisma__tbl_ShopClient<$Result.GetResult<Prisma.$tbl_ShopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Shops that matches the filter.
     * @param {tbl_ShopFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_Shop = await prisma.tbl_Shop.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_ShopFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_Shop.
     * @param {tbl_ShopAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_Shop = await prisma.tbl_Shop.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_ShopAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_ShopCountArgs} args - Arguments to filter Tbl_Shops to count.
     * @example
     * // Count the number of Tbl_Shops
     * const count = await prisma.tbl_Shop.count({
     *   where: {
     *     // ... the filter for the Tbl_Shops we want to count
     *   }
     * })
    **/
    count<T extends tbl_ShopCountArgs>(
      args?: Subset<T, tbl_ShopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_ShopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_ShopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_ShopAggregateArgs>(args: Subset<T, Tbl_ShopAggregateArgs>): Prisma.PrismaPromise<GetTbl_ShopAggregateType<T>>

    /**
     * Group by Tbl_Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_ShopGroupByArgs} args - Group by arguments.
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
      T extends tbl_ShopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_ShopGroupByArgs['orderBy'] }
        : { orderBy?: tbl_ShopGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_ShopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_ShopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_Shop model
   */
  readonly fields: tbl_ShopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_Shop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_ShopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_Shop model
   */
  interface tbl_ShopFieldRefs {
    readonly id: FieldRef<"tbl_Shop", 'String'>
    readonly shopifyDomain: FieldRef<"tbl_Shop", 'String'>
    readonly accessToken: FieldRef<"tbl_Shop", 'String'>
    readonly isActive: FieldRef<"tbl_Shop", 'Boolean'>
    readonly createdAt: FieldRef<"tbl_Shop", 'DateTime'>
    readonly updatedAt: FieldRef<"tbl_Shop", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_Shop findUnique
   */
  export type tbl_ShopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Shop to fetch.
     */
    where: tbl_ShopWhereUniqueInput
  }

  /**
   * tbl_Shop findUniqueOrThrow
   */
  export type tbl_ShopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Shop to fetch.
     */
    where: tbl_ShopWhereUniqueInput
  }

  /**
   * tbl_Shop findFirst
   */
  export type tbl_ShopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Shop to fetch.
     */
    where?: tbl_ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Shops to fetch.
     */
    orderBy?: tbl_ShopOrderByWithRelationInput | tbl_ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Shops.
     */
    cursor?: tbl_ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Shops.
     */
    distinct?: Tbl_ShopScalarFieldEnum | Tbl_ShopScalarFieldEnum[]
  }

  /**
   * tbl_Shop findFirstOrThrow
   */
  export type tbl_ShopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Shop to fetch.
     */
    where?: tbl_ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Shops to fetch.
     */
    orderBy?: tbl_ShopOrderByWithRelationInput | tbl_ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Shops.
     */
    cursor?: tbl_ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Shops.
     */
    distinct?: Tbl_ShopScalarFieldEnum | Tbl_ShopScalarFieldEnum[]
  }

  /**
   * tbl_Shop findMany
   */
  export type tbl_ShopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Shops to fetch.
     */
    where?: tbl_ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Shops to fetch.
     */
    orderBy?: tbl_ShopOrderByWithRelationInput | tbl_ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_Shops.
     */
    cursor?: tbl_ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Shops.
     */
    skip?: number
    distinct?: Tbl_ShopScalarFieldEnum | Tbl_ShopScalarFieldEnum[]
  }

  /**
   * tbl_Shop create
   */
  export type tbl_ShopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_Shop.
     */
    data: XOR<tbl_ShopCreateInput, tbl_ShopUncheckedCreateInput>
  }

  /**
   * tbl_Shop createMany
   */
  export type tbl_ShopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_Shops.
     */
    data: tbl_ShopCreateManyInput | tbl_ShopCreateManyInput[]
  }

  /**
   * tbl_Shop update
   */
  export type tbl_ShopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_Shop.
     */
    data: XOR<tbl_ShopUpdateInput, tbl_ShopUncheckedUpdateInput>
    /**
     * Choose, which tbl_Shop to update.
     */
    where: tbl_ShopWhereUniqueInput
  }

  /**
   * tbl_Shop updateMany
   */
  export type tbl_ShopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_Shops.
     */
    data: XOR<tbl_ShopUpdateManyMutationInput, tbl_ShopUncheckedUpdateManyInput>
    /**
     * Filter which tbl_Shops to update
     */
    where?: tbl_ShopWhereInput
    /**
     * Limit how many tbl_Shops to update.
     */
    limit?: number
  }

  /**
   * tbl_Shop upsert
   */
  export type tbl_ShopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_Shop to update in case it exists.
     */
    where: tbl_ShopWhereUniqueInput
    /**
     * In case the tbl_Shop found by the `where` argument doesn't exist, create a new tbl_Shop with this data.
     */
    create: XOR<tbl_ShopCreateInput, tbl_ShopUncheckedCreateInput>
    /**
     * In case the tbl_Shop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_ShopUpdateInput, tbl_ShopUncheckedUpdateInput>
  }

  /**
   * tbl_Shop delete
   */
  export type tbl_ShopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
    /**
     * Filter which tbl_Shop to delete.
     */
    where: tbl_ShopWhereUniqueInput
  }

  /**
   * tbl_Shop deleteMany
   */
  export type tbl_ShopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Shops to delete
     */
    where?: tbl_ShopWhereInput
    /**
     * Limit how many tbl_Shops to delete.
     */
    limit?: number
  }

  /**
   * tbl_Shop findRaw
   */
  export type tbl_ShopFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Shop aggregateRaw
   */
  export type tbl_ShopAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Shop without action
   */
  export type tbl_ShopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Shop
     */
    select?: tbl_ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Shop
     */
    omit?: tbl_ShopOmit<ExtArgs> | null
  }


  /**
   * Model tbl_User
   */

  export type AggregateTbl_User = {
    _count: Tbl_UserCountAggregateOutputType | null
    _min: Tbl_UserMinAggregateOutputType | null
    _max: Tbl_UserMaxAggregateOutputType | null
  }

  export type Tbl_UserMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    email: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_UserMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    email: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_UserCountAggregateOutputType = {
    id: number
    shopId: number
    email: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Tbl_UserMinAggregateInputType = {
    id?: true
    shopId?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_UserMaxAggregateInputType = {
    id?: true
    shopId?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_UserCountAggregateInputType = {
    id?: true
    shopId?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Tbl_UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_User to aggregate.
     */
    where?: tbl_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Users to fetch.
     */
    orderBy?: tbl_UserOrderByWithRelationInput | tbl_UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_Users
    **/
    _count?: true | Tbl_UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_UserMaxAggregateInputType
  }

  export type GetTbl_UserAggregateType<T extends Tbl_UserAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_User]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_User[P]>
      : GetScalarType<T[P], AggregateTbl_User[P]>
  }




  export type tbl_UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_UserWhereInput
    orderBy?: tbl_UserOrderByWithAggregationInput | tbl_UserOrderByWithAggregationInput[]
    by: Tbl_UserScalarFieldEnum[] | Tbl_UserScalarFieldEnum
    having?: tbl_UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_UserCountAggregateInputType | true
    _min?: Tbl_UserMinAggregateInputType
    _max?: Tbl_UserMaxAggregateInputType
  }

  export type Tbl_UserGroupByOutputType = {
    id: string
    shopId: string
    email: string
    name: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: Tbl_UserCountAggregateOutputType | null
    _min: Tbl_UserMinAggregateOutputType | null
    _max: Tbl_UserMaxAggregateOutputType | null
  }

  type GetTbl_UserGroupByPayload<T extends tbl_UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_UserGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_UserGroupByOutputType[P]>
        }
      >
    >


  export type tbl_UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tbl_User"]>



  export type tbl_UserSelectScalar = {
    id?: boolean
    shopId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type tbl_UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "email" | "name" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["tbl_User"]>

  export type $tbl_UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      email: string
      name: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tbl_User"]>
    composites: {}
  }

  type tbl_UserGetPayload<S extends boolean | null | undefined | tbl_UserDefaultArgs> = $Result.GetResult<Prisma.$tbl_UserPayload, S>

  type tbl_UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_UserCountAggregateInputType | true
    }

  export interface tbl_UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_User'], meta: { name: 'tbl_User' } }
    /**
     * Find zero or one Tbl_User that matches the filter.
     * @param {tbl_UserFindUniqueArgs} args - Arguments to find a Tbl_User
     * @example
     * // Get one Tbl_User
     * const tbl_User = await prisma.tbl_User.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_UserFindUniqueArgs>(args: SelectSubset<T, tbl_UserFindUniqueArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_UserFindUniqueOrThrowArgs} args - Arguments to find a Tbl_User
     * @example
     * // Get one Tbl_User
     * const tbl_User = await prisma.tbl_User.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_UserFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_UserFindFirstArgs} args - Arguments to find a Tbl_User
     * @example
     * // Get one Tbl_User
     * const tbl_User = await prisma.tbl_User.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_UserFindFirstArgs>(args?: SelectSubset<T, tbl_UserFindFirstArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_UserFindFirstOrThrowArgs} args - Arguments to find a Tbl_User
     * @example
     * // Get one Tbl_User
     * const tbl_User = await prisma.tbl_User.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_UserFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_Users
     * const tbl_Users = await prisma.tbl_User.findMany()
     * 
     * // Get first 10 Tbl_Users
     * const tbl_Users = await prisma.tbl_User.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_UserWithIdOnly = await prisma.tbl_User.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_UserFindManyArgs>(args?: SelectSubset<T, tbl_UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_User.
     * @param {tbl_UserCreateArgs} args - Arguments to create a Tbl_User.
     * @example
     * // Create one Tbl_User
     * const Tbl_User = await prisma.tbl_User.create({
     *   data: {
     *     // ... data to create a Tbl_User
     *   }
     * })
     * 
     */
    create<T extends tbl_UserCreateArgs>(args: SelectSubset<T, tbl_UserCreateArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_Users.
     * @param {tbl_UserCreateManyArgs} args - Arguments to create many Tbl_Users.
     * @example
     * // Create many Tbl_Users
     * const tbl_User = await prisma.tbl_User.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_UserCreateManyArgs>(args?: SelectSubset<T, tbl_UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_User.
     * @param {tbl_UserDeleteArgs} args - Arguments to delete one Tbl_User.
     * @example
     * // Delete one Tbl_User
     * const Tbl_User = await prisma.tbl_User.delete({
     *   where: {
     *     // ... filter to delete one Tbl_User
     *   }
     * })
     * 
     */
    delete<T extends tbl_UserDeleteArgs>(args: SelectSubset<T, tbl_UserDeleteArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_User.
     * @param {tbl_UserUpdateArgs} args - Arguments to update one Tbl_User.
     * @example
     * // Update one Tbl_User
     * const tbl_User = await prisma.tbl_User.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_UserUpdateArgs>(args: SelectSubset<T, tbl_UserUpdateArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_Users.
     * @param {tbl_UserDeleteManyArgs} args - Arguments to filter Tbl_Users to delete.
     * @example
     * // Delete a few Tbl_Users
     * const { count } = await prisma.tbl_User.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_UserDeleteManyArgs>(args?: SelectSubset<T, tbl_UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_Users
     * const tbl_User = await prisma.tbl_User.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_UserUpdateManyArgs>(args: SelectSubset<T, tbl_UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_User.
     * @param {tbl_UserUpsertArgs} args - Arguments to update or create a Tbl_User.
     * @example
     * // Update or create a Tbl_User
     * const tbl_User = await prisma.tbl_User.upsert({
     *   create: {
     *     // ... data to create a Tbl_User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_User we want to update
     *   }
     * })
     */
    upsert<T extends tbl_UserUpsertArgs>(args: SelectSubset<T, tbl_UserUpsertArgs<ExtArgs>>): Prisma__tbl_UserClient<$Result.GetResult<Prisma.$tbl_UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Users that matches the filter.
     * @param {tbl_UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_User = await prisma.tbl_User.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_User.
     * @param {tbl_UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_User = await prisma.tbl_User.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_UserCountArgs} args - Arguments to filter Tbl_Users to count.
     * @example
     * // Count the number of Tbl_Users
     * const count = await prisma.tbl_User.count({
     *   where: {
     *     // ... the filter for the Tbl_Users we want to count
     *   }
     * })
    **/
    count<T extends tbl_UserCountArgs>(
      args?: Subset<T, tbl_UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_UserAggregateArgs>(args: Subset<T, Tbl_UserAggregateArgs>): Prisma.PrismaPromise<GetTbl_UserAggregateType<T>>

    /**
     * Group by Tbl_User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_UserGroupByArgs} args - Group by arguments.
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
      T extends tbl_UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_UserGroupByArgs['orderBy'] }
        : { orderBy?: tbl_UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_UserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_User model
   */
  readonly fields: tbl_UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_User model
   */
  interface tbl_UserFieldRefs {
    readonly id: FieldRef<"tbl_User", 'String'>
    readonly shopId: FieldRef<"tbl_User", 'String'>
    readonly email: FieldRef<"tbl_User", 'String'>
    readonly name: FieldRef<"tbl_User", 'String'>
    readonly role: FieldRef<"tbl_User", 'String'>
    readonly createdAt: FieldRef<"tbl_User", 'DateTime'>
    readonly updatedAt: FieldRef<"tbl_User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_User findUnique
   */
  export type tbl_UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * Filter, which tbl_User to fetch.
     */
    where: tbl_UserWhereUniqueInput
  }

  /**
   * tbl_User findUniqueOrThrow
   */
  export type tbl_UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * Filter, which tbl_User to fetch.
     */
    where: tbl_UserWhereUniqueInput
  }

  /**
   * tbl_User findFirst
   */
  export type tbl_UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * Filter, which tbl_User to fetch.
     */
    where?: tbl_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Users to fetch.
     */
    orderBy?: tbl_UserOrderByWithRelationInput | tbl_UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Users.
     */
    cursor?: tbl_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Users.
     */
    distinct?: Tbl_UserScalarFieldEnum | Tbl_UserScalarFieldEnum[]
  }

  /**
   * tbl_User findFirstOrThrow
   */
  export type tbl_UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * Filter, which tbl_User to fetch.
     */
    where?: tbl_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Users to fetch.
     */
    orderBy?: tbl_UserOrderByWithRelationInput | tbl_UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Users.
     */
    cursor?: tbl_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Users.
     */
    distinct?: Tbl_UserScalarFieldEnum | Tbl_UserScalarFieldEnum[]
  }

  /**
   * tbl_User findMany
   */
  export type tbl_UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Users to fetch.
     */
    where?: tbl_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Users to fetch.
     */
    orderBy?: tbl_UserOrderByWithRelationInput | tbl_UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_Users.
     */
    cursor?: tbl_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Users.
     */
    skip?: number
    distinct?: Tbl_UserScalarFieldEnum | Tbl_UserScalarFieldEnum[]
  }

  /**
   * tbl_User create
   */
  export type tbl_UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_User.
     */
    data: XOR<tbl_UserCreateInput, tbl_UserUncheckedCreateInput>
  }

  /**
   * tbl_User createMany
   */
  export type tbl_UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_Users.
     */
    data: tbl_UserCreateManyInput | tbl_UserCreateManyInput[]
  }

  /**
   * tbl_User update
   */
  export type tbl_UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_User.
     */
    data: XOR<tbl_UserUpdateInput, tbl_UserUncheckedUpdateInput>
    /**
     * Choose, which tbl_User to update.
     */
    where: tbl_UserWhereUniqueInput
  }

  /**
   * tbl_User updateMany
   */
  export type tbl_UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_Users.
     */
    data: XOR<tbl_UserUpdateManyMutationInput, tbl_UserUncheckedUpdateManyInput>
    /**
     * Filter which tbl_Users to update
     */
    where?: tbl_UserWhereInput
    /**
     * Limit how many tbl_Users to update.
     */
    limit?: number
  }

  /**
   * tbl_User upsert
   */
  export type tbl_UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_User to update in case it exists.
     */
    where: tbl_UserWhereUniqueInput
    /**
     * In case the tbl_User found by the `where` argument doesn't exist, create a new tbl_User with this data.
     */
    create: XOR<tbl_UserCreateInput, tbl_UserUncheckedCreateInput>
    /**
     * In case the tbl_User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_UserUpdateInput, tbl_UserUncheckedUpdateInput>
  }

  /**
   * tbl_User delete
   */
  export type tbl_UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
    /**
     * Filter which tbl_User to delete.
     */
    where: tbl_UserWhereUniqueInput
  }

  /**
   * tbl_User deleteMany
   */
  export type tbl_UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Users to delete
     */
    where?: tbl_UserWhereInput
    /**
     * Limit how many tbl_Users to delete.
     */
    limit?: number
  }

  /**
   * tbl_User findRaw
   */
  export type tbl_UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_User aggregateRaw
   */
  export type tbl_UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_User without action
   */
  export type tbl_UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_User
     */
    select?: tbl_UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_User
     */
    omit?: tbl_UserOmit<ExtArgs> | null
  }


  /**
   * Model tbl_Settings
   */

  export type AggregateTbl_Settings = {
    _count: Tbl_SettingsCountAggregateOutputType | null
    _avg: Tbl_SettingsAvgAggregateOutputType | null
    _sum: Tbl_SettingsSumAggregateOutputType | null
    _min: Tbl_SettingsMinAggregateOutputType | null
    _max: Tbl_SettingsMaxAggregateOutputType | null
  }

  export type Tbl_SettingsAvgAggregateOutputType = {
    dollarLimit: number | null
    itemLimit: number | null
  }

  export type Tbl_SettingsSumAggregateOutputType = {
    dollarLimit: number | null
    itemLimit: number | null
  }

  export type Tbl_SettingsMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    dollarLimit: number | null
    itemLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_SettingsMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    dollarLimit: number | null
    itemLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_SettingsCountAggregateOutputType = {
    id: number
    shopId: number
    dollarLimit: number
    itemLimit: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Tbl_SettingsAvgAggregateInputType = {
    dollarLimit?: true
    itemLimit?: true
  }

  export type Tbl_SettingsSumAggregateInputType = {
    dollarLimit?: true
    itemLimit?: true
  }

  export type Tbl_SettingsMinAggregateInputType = {
    id?: true
    shopId?: true
    dollarLimit?: true
    itemLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_SettingsMaxAggregateInputType = {
    id?: true
    shopId?: true
    dollarLimit?: true
    itemLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_SettingsCountAggregateInputType = {
    id?: true
    shopId?: true
    dollarLimit?: true
    itemLimit?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Tbl_SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Settings to aggregate.
     */
    where?: tbl_SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Settings to fetch.
     */
    orderBy?: tbl_SettingsOrderByWithRelationInput | tbl_SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_Settings
    **/
    _count?: true | Tbl_SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tbl_SettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tbl_SettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_SettingsMaxAggregateInputType
  }

  export type GetTbl_SettingsAggregateType<T extends Tbl_SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_Settings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_Settings[P]>
      : GetScalarType<T[P], AggregateTbl_Settings[P]>
  }




  export type tbl_SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_SettingsWhereInput
    orderBy?: tbl_SettingsOrderByWithAggregationInput | tbl_SettingsOrderByWithAggregationInput[]
    by: Tbl_SettingsScalarFieldEnum[] | Tbl_SettingsScalarFieldEnum
    having?: tbl_SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_SettingsCountAggregateInputType | true
    _avg?: Tbl_SettingsAvgAggregateInputType
    _sum?: Tbl_SettingsSumAggregateInputType
    _min?: Tbl_SettingsMinAggregateInputType
    _max?: Tbl_SettingsMaxAggregateInputType
  }

  export type Tbl_SettingsGroupByOutputType = {
    id: string
    shopId: string
    dollarLimit: number
    itemLimit: number
    createdAt: Date
    updatedAt: Date
    _count: Tbl_SettingsCountAggregateOutputType | null
    _avg: Tbl_SettingsAvgAggregateOutputType | null
    _sum: Tbl_SettingsSumAggregateOutputType | null
    _min: Tbl_SettingsMinAggregateOutputType | null
    _max: Tbl_SettingsMaxAggregateOutputType | null
  }

  type GetTbl_SettingsGroupByPayload<T extends tbl_SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_SettingsGroupByOutputType[P]>
        }
      >
    >


  export type tbl_SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    dollarLimit?: boolean
    itemLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tbl_Settings"]>



  export type tbl_SettingsSelectScalar = {
    id?: boolean
    shopId?: boolean
    dollarLimit?: boolean
    itemLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type tbl_SettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "dollarLimit" | "itemLimit" | "createdAt" | "updatedAt", ExtArgs["result"]["tbl_Settings"]>

  export type $tbl_SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_Settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      dollarLimit: number
      itemLimit: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tbl_Settings"]>
    composites: {}
  }

  type tbl_SettingsGetPayload<S extends boolean | null | undefined | tbl_SettingsDefaultArgs> = $Result.GetResult<Prisma.$tbl_SettingsPayload, S>

  type tbl_SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_SettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_SettingsCountAggregateInputType | true
    }

  export interface tbl_SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_Settings'], meta: { name: 'tbl_Settings' } }
    /**
     * Find zero or one Tbl_Settings that matches the filter.
     * @param {tbl_SettingsFindUniqueArgs} args - Arguments to find a Tbl_Settings
     * @example
     * // Get one Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_SettingsFindUniqueArgs>(args: SelectSubset<T, tbl_SettingsFindUniqueArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_Settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_SettingsFindUniqueOrThrowArgs} args - Arguments to find a Tbl_Settings
     * @example
     * // Get one Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SettingsFindFirstArgs} args - Arguments to find a Tbl_Settings
     * @example
     * // Get one Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_SettingsFindFirstArgs>(args?: SelectSubset<T, tbl_SettingsFindFirstArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SettingsFindFirstOrThrowArgs} args - Arguments to find a Tbl_Settings
     * @example
     * // Get one Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.findMany()
     * 
     * // Get first 10 Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_SettingsWithIdOnly = await prisma.tbl_Settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_SettingsFindManyArgs>(args?: SelectSubset<T, tbl_SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_Settings.
     * @param {tbl_SettingsCreateArgs} args - Arguments to create a Tbl_Settings.
     * @example
     * // Create one Tbl_Settings
     * const Tbl_Settings = await prisma.tbl_Settings.create({
     *   data: {
     *     // ... data to create a Tbl_Settings
     *   }
     * })
     * 
     */
    create<T extends tbl_SettingsCreateArgs>(args: SelectSubset<T, tbl_SettingsCreateArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_Settings.
     * @param {tbl_SettingsCreateManyArgs} args - Arguments to create many Tbl_Settings.
     * @example
     * // Create many Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_SettingsCreateManyArgs>(args?: SelectSubset<T, tbl_SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_Settings.
     * @param {tbl_SettingsDeleteArgs} args - Arguments to delete one Tbl_Settings.
     * @example
     * // Delete one Tbl_Settings
     * const Tbl_Settings = await prisma.tbl_Settings.delete({
     *   where: {
     *     // ... filter to delete one Tbl_Settings
     *   }
     * })
     * 
     */
    delete<T extends tbl_SettingsDeleteArgs>(args: SelectSubset<T, tbl_SettingsDeleteArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_Settings.
     * @param {tbl_SettingsUpdateArgs} args - Arguments to update one Tbl_Settings.
     * @example
     * // Update one Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_SettingsUpdateArgs>(args: SelectSubset<T, tbl_SettingsUpdateArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_Settings.
     * @param {tbl_SettingsDeleteManyArgs} args - Arguments to filter Tbl_Settings to delete.
     * @example
     * // Delete a few Tbl_Settings
     * const { count } = await prisma.tbl_Settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_SettingsDeleteManyArgs>(args?: SelectSubset<T, tbl_SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_SettingsUpdateManyArgs>(args: SelectSubset<T, tbl_SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_Settings.
     * @param {tbl_SettingsUpsertArgs} args - Arguments to update or create a Tbl_Settings.
     * @example
     * // Update or create a Tbl_Settings
     * const tbl_Settings = await prisma.tbl_Settings.upsert({
     *   create: {
     *     // ... data to create a Tbl_Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_Settings we want to update
     *   }
     * })
     */
    upsert<T extends tbl_SettingsUpsertArgs>(args: SelectSubset<T, tbl_SettingsUpsertArgs<ExtArgs>>): Prisma__tbl_SettingsClient<$Result.GetResult<Prisma.$tbl_SettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Settings that matches the filter.
     * @param {tbl_SettingsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_Settings = await prisma.tbl_Settings.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_SettingsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_Settings.
     * @param {tbl_SettingsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_Settings = await prisma.tbl_Settings.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_SettingsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SettingsCountArgs} args - Arguments to filter Tbl_Settings to count.
     * @example
     * // Count the number of Tbl_Settings
     * const count = await prisma.tbl_Settings.count({
     *   where: {
     *     // ... the filter for the Tbl_Settings we want to count
     *   }
     * })
    **/
    count<T extends tbl_SettingsCountArgs>(
      args?: Subset<T, tbl_SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_SettingsAggregateArgs>(args: Subset<T, Tbl_SettingsAggregateArgs>): Prisma.PrismaPromise<GetTbl_SettingsAggregateType<T>>

    /**
     * Group by Tbl_Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SettingsGroupByArgs} args - Group by arguments.
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
      T extends tbl_SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_SettingsGroupByArgs['orderBy'] }
        : { orderBy?: tbl_SettingsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_SettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_Settings model
   */
  readonly fields: tbl_SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_Settings model
   */
  interface tbl_SettingsFieldRefs {
    readonly id: FieldRef<"tbl_Settings", 'String'>
    readonly shopId: FieldRef<"tbl_Settings", 'String'>
    readonly dollarLimit: FieldRef<"tbl_Settings", 'Float'>
    readonly itemLimit: FieldRef<"tbl_Settings", 'Int'>
    readonly createdAt: FieldRef<"tbl_Settings", 'DateTime'>
    readonly updatedAt: FieldRef<"tbl_Settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_Settings findUnique
   */
  export type tbl_SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Settings to fetch.
     */
    where: tbl_SettingsWhereUniqueInput
  }

  /**
   * tbl_Settings findUniqueOrThrow
   */
  export type tbl_SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Settings to fetch.
     */
    where: tbl_SettingsWhereUniqueInput
  }

  /**
   * tbl_Settings findFirst
   */
  export type tbl_SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Settings to fetch.
     */
    where?: tbl_SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Settings to fetch.
     */
    orderBy?: tbl_SettingsOrderByWithRelationInput | tbl_SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Settings.
     */
    cursor?: tbl_SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Settings.
     */
    distinct?: Tbl_SettingsScalarFieldEnum | Tbl_SettingsScalarFieldEnum[]
  }

  /**
   * tbl_Settings findFirstOrThrow
   */
  export type tbl_SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Settings to fetch.
     */
    where?: tbl_SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Settings to fetch.
     */
    orderBy?: tbl_SettingsOrderByWithRelationInput | tbl_SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Settings.
     */
    cursor?: tbl_SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Settings.
     */
    distinct?: Tbl_SettingsScalarFieldEnum | Tbl_SettingsScalarFieldEnum[]
  }

  /**
   * tbl_Settings findMany
   */
  export type tbl_SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Settings to fetch.
     */
    where?: tbl_SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Settings to fetch.
     */
    orderBy?: tbl_SettingsOrderByWithRelationInput | tbl_SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_Settings.
     */
    cursor?: tbl_SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Settings.
     */
    skip?: number
    distinct?: Tbl_SettingsScalarFieldEnum | Tbl_SettingsScalarFieldEnum[]
  }

  /**
   * tbl_Settings create
   */
  export type tbl_SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_Settings.
     */
    data: XOR<tbl_SettingsCreateInput, tbl_SettingsUncheckedCreateInput>
  }

  /**
   * tbl_Settings createMany
   */
  export type tbl_SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_Settings.
     */
    data: tbl_SettingsCreateManyInput | tbl_SettingsCreateManyInput[]
  }

  /**
   * tbl_Settings update
   */
  export type tbl_SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_Settings.
     */
    data: XOR<tbl_SettingsUpdateInput, tbl_SettingsUncheckedUpdateInput>
    /**
     * Choose, which tbl_Settings to update.
     */
    where: tbl_SettingsWhereUniqueInput
  }

  /**
   * tbl_Settings updateMany
   */
  export type tbl_SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_Settings.
     */
    data: XOR<tbl_SettingsUpdateManyMutationInput, tbl_SettingsUncheckedUpdateManyInput>
    /**
     * Filter which tbl_Settings to update
     */
    where?: tbl_SettingsWhereInput
    /**
     * Limit how many tbl_Settings to update.
     */
    limit?: number
  }

  /**
   * tbl_Settings upsert
   */
  export type tbl_SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_Settings to update in case it exists.
     */
    where: tbl_SettingsWhereUniqueInput
    /**
     * In case the tbl_Settings found by the `where` argument doesn't exist, create a new tbl_Settings with this data.
     */
    create: XOR<tbl_SettingsCreateInput, tbl_SettingsUncheckedCreateInput>
    /**
     * In case the tbl_Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_SettingsUpdateInput, tbl_SettingsUncheckedUpdateInput>
  }

  /**
   * tbl_Settings delete
   */
  export type tbl_SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
    /**
     * Filter which tbl_Settings to delete.
     */
    where: tbl_SettingsWhereUniqueInput
  }

  /**
   * tbl_Settings deleteMany
   */
  export type tbl_SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Settings to delete
     */
    where?: tbl_SettingsWhereInput
    /**
     * Limit how many tbl_Settings to delete.
     */
    limit?: number
  }

  /**
   * tbl_Settings findRaw
   */
  export type tbl_SettingsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Settings aggregateRaw
   */
  export type tbl_SettingsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Settings without action
   */
  export type tbl_SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Settings
     */
    select?: tbl_SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Settings
     */
    omit?: tbl_SettingsOmit<ExtArgs> | null
  }


  /**
   * Model tbl_AuditSession
   */

  export type AggregateTbl_AuditSession = {
    _count: Tbl_AuditSessionCountAggregateOutputType | null
    _min: Tbl_AuditSessionMinAggregateOutputType | null
    _max: Tbl_AuditSessionMaxAggregateOutputType | null
  }

  export type Tbl_AuditSessionMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    locationId: string | null
    staffId: string | null
    approvedById: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_AuditSessionMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    locationId: string | null
    staffId: string | null
    approvedById: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_AuditSessionCountAggregateOutputType = {
    id: number
    shopId: number
    locationId: number
    staffId: number
    approvedById: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Tbl_AuditSessionMinAggregateInputType = {
    id?: true
    shopId?: true
    locationId?: true
    staffId?: true
    approvedById?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_AuditSessionMaxAggregateInputType = {
    id?: true
    shopId?: true
    locationId?: true
    staffId?: true
    approvedById?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_AuditSessionCountAggregateInputType = {
    id?: true
    shopId?: true
    locationId?: true
    staffId?: true
    approvedById?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Tbl_AuditSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_AuditSession to aggregate.
     */
    where?: tbl_AuditSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditSessions to fetch.
     */
    orderBy?: tbl_AuditSessionOrderByWithRelationInput | tbl_AuditSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_AuditSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_AuditSessions
    **/
    _count?: true | Tbl_AuditSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_AuditSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_AuditSessionMaxAggregateInputType
  }

  export type GetTbl_AuditSessionAggregateType<T extends Tbl_AuditSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_AuditSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_AuditSession[P]>
      : GetScalarType<T[P], AggregateTbl_AuditSession[P]>
  }




  export type tbl_AuditSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_AuditSessionWhereInput
    orderBy?: tbl_AuditSessionOrderByWithAggregationInput | tbl_AuditSessionOrderByWithAggregationInput[]
    by: Tbl_AuditSessionScalarFieldEnum[] | Tbl_AuditSessionScalarFieldEnum
    having?: tbl_AuditSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_AuditSessionCountAggregateInputType | true
    _min?: Tbl_AuditSessionMinAggregateInputType
    _max?: Tbl_AuditSessionMaxAggregateInputType
  }

  export type Tbl_AuditSessionGroupByOutputType = {
    id: string
    shopId: string
    locationId: string
    staffId: string
    approvedById: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: Tbl_AuditSessionCountAggregateOutputType | null
    _min: Tbl_AuditSessionMinAggregateOutputType | null
    _max: Tbl_AuditSessionMaxAggregateOutputType | null
  }

  type GetTbl_AuditSessionGroupByPayload<T extends tbl_AuditSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_AuditSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_AuditSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_AuditSessionGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_AuditSessionGroupByOutputType[P]>
        }
      >
    >


  export type tbl_AuditSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    locationId?: boolean
    staffId?: boolean
    approvedById?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tbl_AuditSession"]>



  export type tbl_AuditSessionSelectScalar = {
    id?: boolean
    shopId?: boolean
    locationId?: boolean
    staffId?: boolean
    approvedById?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type tbl_AuditSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "locationId" | "staffId" | "approvedById" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["tbl_AuditSession"]>

  export type $tbl_AuditSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_AuditSession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      locationId: string
      staffId: string
      approvedById: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tbl_AuditSession"]>
    composites: {}
  }

  type tbl_AuditSessionGetPayload<S extends boolean | null | undefined | tbl_AuditSessionDefaultArgs> = $Result.GetResult<Prisma.$tbl_AuditSessionPayload, S>

  type tbl_AuditSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_AuditSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_AuditSessionCountAggregateInputType | true
    }

  export interface tbl_AuditSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_AuditSession'], meta: { name: 'tbl_AuditSession' } }
    /**
     * Find zero or one Tbl_AuditSession that matches the filter.
     * @param {tbl_AuditSessionFindUniqueArgs} args - Arguments to find a Tbl_AuditSession
     * @example
     * // Get one Tbl_AuditSession
     * const tbl_AuditSession = await prisma.tbl_AuditSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_AuditSessionFindUniqueArgs>(args: SelectSubset<T, tbl_AuditSessionFindUniqueArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_AuditSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_AuditSessionFindUniqueOrThrowArgs} args - Arguments to find a Tbl_AuditSession
     * @example
     * // Get one Tbl_AuditSession
     * const tbl_AuditSession = await prisma.tbl_AuditSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_AuditSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_AuditSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_AuditSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditSessionFindFirstArgs} args - Arguments to find a Tbl_AuditSession
     * @example
     * // Get one Tbl_AuditSession
     * const tbl_AuditSession = await prisma.tbl_AuditSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_AuditSessionFindFirstArgs>(args?: SelectSubset<T, tbl_AuditSessionFindFirstArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_AuditSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditSessionFindFirstOrThrowArgs} args - Arguments to find a Tbl_AuditSession
     * @example
     * // Get one Tbl_AuditSession
     * const tbl_AuditSession = await prisma.tbl_AuditSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_AuditSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_AuditSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_AuditSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_AuditSessions
     * const tbl_AuditSessions = await prisma.tbl_AuditSession.findMany()
     * 
     * // Get first 10 Tbl_AuditSessions
     * const tbl_AuditSessions = await prisma.tbl_AuditSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_AuditSessionWithIdOnly = await prisma.tbl_AuditSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_AuditSessionFindManyArgs>(args?: SelectSubset<T, tbl_AuditSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_AuditSession.
     * @param {tbl_AuditSessionCreateArgs} args - Arguments to create a Tbl_AuditSession.
     * @example
     * // Create one Tbl_AuditSession
     * const Tbl_AuditSession = await prisma.tbl_AuditSession.create({
     *   data: {
     *     // ... data to create a Tbl_AuditSession
     *   }
     * })
     * 
     */
    create<T extends tbl_AuditSessionCreateArgs>(args: SelectSubset<T, tbl_AuditSessionCreateArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_AuditSessions.
     * @param {tbl_AuditSessionCreateManyArgs} args - Arguments to create many Tbl_AuditSessions.
     * @example
     * // Create many Tbl_AuditSessions
     * const tbl_AuditSession = await prisma.tbl_AuditSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_AuditSessionCreateManyArgs>(args?: SelectSubset<T, tbl_AuditSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_AuditSession.
     * @param {tbl_AuditSessionDeleteArgs} args - Arguments to delete one Tbl_AuditSession.
     * @example
     * // Delete one Tbl_AuditSession
     * const Tbl_AuditSession = await prisma.tbl_AuditSession.delete({
     *   where: {
     *     // ... filter to delete one Tbl_AuditSession
     *   }
     * })
     * 
     */
    delete<T extends tbl_AuditSessionDeleteArgs>(args: SelectSubset<T, tbl_AuditSessionDeleteArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_AuditSession.
     * @param {tbl_AuditSessionUpdateArgs} args - Arguments to update one Tbl_AuditSession.
     * @example
     * // Update one Tbl_AuditSession
     * const tbl_AuditSession = await prisma.tbl_AuditSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_AuditSessionUpdateArgs>(args: SelectSubset<T, tbl_AuditSessionUpdateArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_AuditSessions.
     * @param {tbl_AuditSessionDeleteManyArgs} args - Arguments to filter Tbl_AuditSessions to delete.
     * @example
     * // Delete a few Tbl_AuditSessions
     * const { count } = await prisma.tbl_AuditSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_AuditSessionDeleteManyArgs>(args?: SelectSubset<T, tbl_AuditSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_AuditSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_AuditSessions
     * const tbl_AuditSession = await prisma.tbl_AuditSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_AuditSessionUpdateManyArgs>(args: SelectSubset<T, tbl_AuditSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_AuditSession.
     * @param {tbl_AuditSessionUpsertArgs} args - Arguments to update or create a Tbl_AuditSession.
     * @example
     * // Update or create a Tbl_AuditSession
     * const tbl_AuditSession = await prisma.tbl_AuditSession.upsert({
     *   create: {
     *     // ... data to create a Tbl_AuditSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_AuditSession we want to update
     *   }
     * })
     */
    upsert<T extends tbl_AuditSessionUpsertArgs>(args: SelectSubset<T, tbl_AuditSessionUpsertArgs<ExtArgs>>): Prisma__tbl_AuditSessionClient<$Result.GetResult<Prisma.$tbl_AuditSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_AuditSessions that matches the filter.
     * @param {tbl_AuditSessionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_AuditSession = await prisma.tbl_AuditSession.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_AuditSessionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_AuditSession.
     * @param {tbl_AuditSessionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_AuditSession = await prisma.tbl_AuditSession.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_AuditSessionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_AuditSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditSessionCountArgs} args - Arguments to filter Tbl_AuditSessions to count.
     * @example
     * // Count the number of Tbl_AuditSessions
     * const count = await prisma.tbl_AuditSession.count({
     *   where: {
     *     // ... the filter for the Tbl_AuditSessions we want to count
     *   }
     * })
    **/
    count<T extends tbl_AuditSessionCountArgs>(
      args?: Subset<T, tbl_AuditSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_AuditSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_AuditSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_AuditSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_AuditSessionAggregateArgs>(args: Subset<T, Tbl_AuditSessionAggregateArgs>): Prisma.PrismaPromise<GetTbl_AuditSessionAggregateType<T>>

    /**
     * Group by Tbl_AuditSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditSessionGroupByArgs} args - Group by arguments.
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
      T extends tbl_AuditSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_AuditSessionGroupByArgs['orderBy'] }
        : { orderBy?: tbl_AuditSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_AuditSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_AuditSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_AuditSession model
   */
  readonly fields: tbl_AuditSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_AuditSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_AuditSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_AuditSession model
   */
  interface tbl_AuditSessionFieldRefs {
    readonly id: FieldRef<"tbl_AuditSession", 'String'>
    readonly shopId: FieldRef<"tbl_AuditSession", 'String'>
    readonly locationId: FieldRef<"tbl_AuditSession", 'String'>
    readonly staffId: FieldRef<"tbl_AuditSession", 'String'>
    readonly approvedById: FieldRef<"tbl_AuditSession", 'String'>
    readonly status: FieldRef<"tbl_AuditSession", 'String'>
    readonly createdAt: FieldRef<"tbl_AuditSession", 'DateTime'>
    readonly updatedAt: FieldRef<"tbl_AuditSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_AuditSession findUnique
   */
  export type tbl_AuditSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditSession to fetch.
     */
    where: tbl_AuditSessionWhereUniqueInput
  }

  /**
   * tbl_AuditSession findUniqueOrThrow
   */
  export type tbl_AuditSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditSession to fetch.
     */
    where: tbl_AuditSessionWhereUniqueInput
  }

  /**
   * tbl_AuditSession findFirst
   */
  export type tbl_AuditSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditSession to fetch.
     */
    where?: tbl_AuditSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditSessions to fetch.
     */
    orderBy?: tbl_AuditSessionOrderByWithRelationInput | tbl_AuditSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_AuditSessions.
     */
    cursor?: tbl_AuditSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_AuditSessions.
     */
    distinct?: Tbl_AuditSessionScalarFieldEnum | Tbl_AuditSessionScalarFieldEnum[]
  }

  /**
   * tbl_AuditSession findFirstOrThrow
   */
  export type tbl_AuditSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditSession to fetch.
     */
    where?: tbl_AuditSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditSessions to fetch.
     */
    orderBy?: tbl_AuditSessionOrderByWithRelationInput | tbl_AuditSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_AuditSessions.
     */
    cursor?: tbl_AuditSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_AuditSessions.
     */
    distinct?: Tbl_AuditSessionScalarFieldEnum | Tbl_AuditSessionScalarFieldEnum[]
  }

  /**
   * tbl_AuditSession findMany
   */
  export type tbl_AuditSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditSessions to fetch.
     */
    where?: tbl_AuditSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditSessions to fetch.
     */
    orderBy?: tbl_AuditSessionOrderByWithRelationInput | tbl_AuditSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_AuditSessions.
     */
    cursor?: tbl_AuditSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditSessions.
     */
    skip?: number
    distinct?: Tbl_AuditSessionScalarFieldEnum | Tbl_AuditSessionScalarFieldEnum[]
  }

  /**
   * tbl_AuditSession create
   */
  export type tbl_AuditSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_AuditSession.
     */
    data: XOR<tbl_AuditSessionCreateInput, tbl_AuditSessionUncheckedCreateInput>
  }

  /**
   * tbl_AuditSession createMany
   */
  export type tbl_AuditSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_AuditSessions.
     */
    data: tbl_AuditSessionCreateManyInput | tbl_AuditSessionCreateManyInput[]
  }

  /**
   * tbl_AuditSession update
   */
  export type tbl_AuditSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_AuditSession.
     */
    data: XOR<tbl_AuditSessionUpdateInput, tbl_AuditSessionUncheckedUpdateInput>
    /**
     * Choose, which tbl_AuditSession to update.
     */
    where: tbl_AuditSessionWhereUniqueInput
  }

  /**
   * tbl_AuditSession updateMany
   */
  export type tbl_AuditSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_AuditSessions.
     */
    data: XOR<tbl_AuditSessionUpdateManyMutationInput, tbl_AuditSessionUncheckedUpdateManyInput>
    /**
     * Filter which tbl_AuditSessions to update
     */
    where?: tbl_AuditSessionWhereInput
    /**
     * Limit how many tbl_AuditSessions to update.
     */
    limit?: number
  }

  /**
   * tbl_AuditSession upsert
   */
  export type tbl_AuditSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_AuditSession to update in case it exists.
     */
    where: tbl_AuditSessionWhereUniqueInput
    /**
     * In case the tbl_AuditSession found by the `where` argument doesn't exist, create a new tbl_AuditSession with this data.
     */
    create: XOR<tbl_AuditSessionCreateInput, tbl_AuditSessionUncheckedCreateInput>
    /**
     * In case the tbl_AuditSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_AuditSessionUpdateInput, tbl_AuditSessionUncheckedUpdateInput>
  }

  /**
   * tbl_AuditSession delete
   */
  export type tbl_AuditSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
    /**
     * Filter which tbl_AuditSession to delete.
     */
    where: tbl_AuditSessionWhereUniqueInput
  }

  /**
   * tbl_AuditSession deleteMany
   */
  export type tbl_AuditSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_AuditSessions to delete
     */
    where?: tbl_AuditSessionWhereInput
    /**
     * Limit how many tbl_AuditSessions to delete.
     */
    limit?: number
  }

  /**
   * tbl_AuditSession findRaw
   */
  export type tbl_AuditSessionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_AuditSession aggregateRaw
   */
  export type tbl_AuditSessionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_AuditSession without action
   */
  export type tbl_AuditSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditSession
     */
    select?: tbl_AuditSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditSession
     */
    omit?: tbl_AuditSessionOmit<ExtArgs> | null
  }


  /**
   * Model tbl_AuditLineItem
   */

  export type AggregateTbl_AuditLineItem = {
    _count: Tbl_AuditLineItemCountAggregateOutputType | null
    _avg: Tbl_AuditLineItemAvgAggregateOutputType | null
    _sum: Tbl_AuditLineItemSumAggregateOutputType | null
    _min: Tbl_AuditLineItemMinAggregateOutputType | null
    _max: Tbl_AuditLineItemMaxAggregateOutputType | null
  }

  export type Tbl_AuditLineItemAvgAggregateOutputType = {
    unitCost: number | null
    expectedCount: number | null
    actualCount: number | null
    variance: number | null
  }

  export type Tbl_AuditLineItemSumAggregateOutputType = {
    unitCost: number | null
    expectedCount: number | null
    actualCount: number | null
    variance: number | null
  }

  export type Tbl_AuditLineItemMinAggregateOutputType = {
    id: string | null
    auditSessionId: string | null
    productId: string | null
    variantId: string | null
    barcode: string | null
    title: string | null
    unitCost: number | null
    expectedCount: number | null
    actualCount: number | null
    variance: number | null
    reasonTag: string | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_AuditLineItemMaxAggregateOutputType = {
    id: string | null
    auditSessionId: string | null
    productId: string | null
    variantId: string | null
    barcode: string | null
    title: string | null
    unitCost: number | null
    expectedCount: number | null
    actualCount: number | null
    variance: number | null
    reasonTag: string | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_AuditLineItemCountAggregateOutputType = {
    id: number
    auditSessionId: number
    productId: number
    variantId: number
    barcode: number
    title: number
    unitCost: number
    expectedCount: number
    actualCount: number
    variance: number
    reasonTag: number
    note: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Tbl_AuditLineItemAvgAggregateInputType = {
    unitCost?: true
    expectedCount?: true
    actualCount?: true
    variance?: true
  }

  export type Tbl_AuditLineItemSumAggregateInputType = {
    unitCost?: true
    expectedCount?: true
    actualCount?: true
    variance?: true
  }

  export type Tbl_AuditLineItemMinAggregateInputType = {
    id?: true
    auditSessionId?: true
    productId?: true
    variantId?: true
    barcode?: true
    title?: true
    unitCost?: true
    expectedCount?: true
    actualCount?: true
    variance?: true
    reasonTag?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_AuditLineItemMaxAggregateInputType = {
    id?: true
    auditSessionId?: true
    productId?: true
    variantId?: true
    barcode?: true
    title?: true
    unitCost?: true
    expectedCount?: true
    actualCount?: true
    variance?: true
    reasonTag?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_AuditLineItemCountAggregateInputType = {
    id?: true
    auditSessionId?: true
    productId?: true
    variantId?: true
    barcode?: true
    title?: true
    unitCost?: true
    expectedCount?: true
    actualCount?: true
    variance?: true
    reasonTag?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Tbl_AuditLineItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_AuditLineItem to aggregate.
     */
    where?: tbl_AuditLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLineItems to fetch.
     */
    orderBy?: tbl_AuditLineItemOrderByWithRelationInput | tbl_AuditLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_AuditLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_AuditLineItems
    **/
    _count?: true | Tbl_AuditLineItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tbl_AuditLineItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tbl_AuditLineItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_AuditLineItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_AuditLineItemMaxAggregateInputType
  }

  export type GetTbl_AuditLineItemAggregateType<T extends Tbl_AuditLineItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_AuditLineItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_AuditLineItem[P]>
      : GetScalarType<T[P], AggregateTbl_AuditLineItem[P]>
  }




  export type tbl_AuditLineItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_AuditLineItemWhereInput
    orderBy?: tbl_AuditLineItemOrderByWithAggregationInput | tbl_AuditLineItemOrderByWithAggregationInput[]
    by: Tbl_AuditLineItemScalarFieldEnum[] | Tbl_AuditLineItemScalarFieldEnum
    having?: tbl_AuditLineItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_AuditLineItemCountAggregateInputType | true
    _avg?: Tbl_AuditLineItemAvgAggregateInputType
    _sum?: Tbl_AuditLineItemSumAggregateInputType
    _min?: Tbl_AuditLineItemMinAggregateInputType
    _max?: Tbl_AuditLineItemMaxAggregateInputType
  }

  export type Tbl_AuditLineItemGroupByOutputType = {
    id: string
    auditSessionId: string
    productId: string
    variantId: string
    barcode: string
    title: string
    unitCost: number
    expectedCount: number
    actualCount: number
    variance: number
    reasonTag: string | null
    note: string | null
    createdAt: Date
    updatedAt: Date
    _count: Tbl_AuditLineItemCountAggregateOutputType | null
    _avg: Tbl_AuditLineItemAvgAggregateOutputType | null
    _sum: Tbl_AuditLineItemSumAggregateOutputType | null
    _min: Tbl_AuditLineItemMinAggregateOutputType | null
    _max: Tbl_AuditLineItemMaxAggregateOutputType | null
  }

  type GetTbl_AuditLineItemGroupByPayload<T extends tbl_AuditLineItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_AuditLineItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_AuditLineItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_AuditLineItemGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_AuditLineItemGroupByOutputType[P]>
        }
      >
    >


  export type tbl_AuditLineItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auditSessionId?: boolean
    productId?: boolean
    variantId?: boolean
    barcode?: boolean
    title?: boolean
    unitCost?: boolean
    expectedCount?: boolean
    actualCount?: boolean
    variance?: boolean
    reasonTag?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tbl_AuditLineItem"]>



  export type tbl_AuditLineItemSelectScalar = {
    id?: boolean
    auditSessionId?: boolean
    productId?: boolean
    variantId?: boolean
    barcode?: boolean
    title?: boolean
    unitCost?: boolean
    expectedCount?: boolean
    actualCount?: boolean
    variance?: boolean
    reasonTag?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type tbl_AuditLineItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "auditSessionId" | "productId" | "variantId" | "barcode" | "title" | "unitCost" | "expectedCount" | "actualCount" | "variance" | "reasonTag" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["tbl_AuditLineItem"]>

  export type $tbl_AuditLineItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_AuditLineItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      auditSessionId: string
      productId: string
      variantId: string
      barcode: string
      title: string
      unitCost: number
      expectedCount: number
      actualCount: number
      variance: number
      reasonTag: string | null
      note: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tbl_AuditLineItem"]>
    composites: {}
  }

  type tbl_AuditLineItemGetPayload<S extends boolean | null | undefined | tbl_AuditLineItemDefaultArgs> = $Result.GetResult<Prisma.$tbl_AuditLineItemPayload, S>

  type tbl_AuditLineItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_AuditLineItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_AuditLineItemCountAggregateInputType | true
    }

  export interface tbl_AuditLineItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_AuditLineItem'], meta: { name: 'tbl_AuditLineItem' } }
    /**
     * Find zero or one Tbl_AuditLineItem that matches the filter.
     * @param {tbl_AuditLineItemFindUniqueArgs} args - Arguments to find a Tbl_AuditLineItem
     * @example
     * // Get one Tbl_AuditLineItem
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_AuditLineItemFindUniqueArgs>(args: SelectSubset<T, tbl_AuditLineItemFindUniqueArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_AuditLineItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_AuditLineItemFindUniqueOrThrowArgs} args - Arguments to find a Tbl_AuditLineItem
     * @example
     * // Get one Tbl_AuditLineItem
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_AuditLineItemFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_AuditLineItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_AuditLineItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLineItemFindFirstArgs} args - Arguments to find a Tbl_AuditLineItem
     * @example
     * // Get one Tbl_AuditLineItem
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_AuditLineItemFindFirstArgs>(args?: SelectSubset<T, tbl_AuditLineItemFindFirstArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_AuditLineItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLineItemFindFirstOrThrowArgs} args - Arguments to find a Tbl_AuditLineItem
     * @example
     * // Get one Tbl_AuditLineItem
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_AuditLineItemFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_AuditLineItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_AuditLineItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLineItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_AuditLineItems
     * const tbl_AuditLineItems = await prisma.tbl_AuditLineItem.findMany()
     * 
     * // Get first 10 Tbl_AuditLineItems
     * const tbl_AuditLineItems = await prisma.tbl_AuditLineItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_AuditLineItemWithIdOnly = await prisma.tbl_AuditLineItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_AuditLineItemFindManyArgs>(args?: SelectSubset<T, tbl_AuditLineItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_AuditLineItem.
     * @param {tbl_AuditLineItemCreateArgs} args - Arguments to create a Tbl_AuditLineItem.
     * @example
     * // Create one Tbl_AuditLineItem
     * const Tbl_AuditLineItem = await prisma.tbl_AuditLineItem.create({
     *   data: {
     *     // ... data to create a Tbl_AuditLineItem
     *   }
     * })
     * 
     */
    create<T extends tbl_AuditLineItemCreateArgs>(args: SelectSubset<T, tbl_AuditLineItemCreateArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_AuditLineItems.
     * @param {tbl_AuditLineItemCreateManyArgs} args - Arguments to create many Tbl_AuditLineItems.
     * @example
     * // Create many Tbl_AuditLineItems
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_AuditLineItemCreateManyArgs>(args?: SelectSubset<T, tbl_AuditLineItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_AuditLineItem.
     * @param {tbl_AuditLineItemDeleteArgs} args - Arguments to delete one Tbl_AuditLineItem.
     * @example
     * // Delete one Tbl_AuditLineItem
     * const Tbl_AuditLineItem = await prisma.tbl_AuditLineItem.delete({
     *   where: {
     *     // ... filter to delete one Tbl_AuditLineItem
     *   }
     * })
     * 
     */
    delete<T extends tbl_AuditLineItemDeleteArgs>(args: SelectSubset<T, tbl_AuditLineItemDeleteArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_AuditLineItem.
     * @param {tbl_AuditLineItemUpdateArgs} args - Arguments to update one Tbl_AuditLineItem.
     * @example
     * // Update one Tbl_AuditLineItem
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_AuditLineItemUpdateArgs>(args: SelectSubset<T, tbl_AuditLineItemUpdateArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_AuditLineItems.
     * @param {tbl_AuditLineItemDeleteManyArgs} args - Arguments to filter Tbl_AuditLineItems to delete.
     * @example
     * // Delete a few Tbl_AuditLineItems
     * const { count } = await prisma.tbl_AuditLineItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_AuditLineItemDeleteManyArgs>(args?: SelectSubset<T, tbl_AuditLineItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_AuditLineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLineItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_AuditLineItems
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_AuditLineItemUpdateManyArgs>(args: SelectSubset<T, tbl_AuditLineItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_AuditLineItem.
     * @param {tbl_AuditLineItemUpsertArgs} args - Arguments to update or create a Tbl_AuditLineItem.
     * @example
     * // Update or create a Tbl_AuditLineItem
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.upsert({
     *   create: {
     *     // ... data to create a Tbl_AuditLineItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_AuditLineItem we want to update
     *   }
     * })
     */
    upsert<T extends tbl_AuditLineItemUpsertArgs>(args: SelectSubset<T, tbl_AuditLineItemUpsertArgs<ExtArgs>>): Prisma__tbl_AuditLineItemClient<$Result.GetResult<Prisma.$tbl_AuditLineItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_AuditLineItems that matches the filter.
     * @param {tbl_AuditLineItemFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_AuditLineItemFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_AuditLineItem.
     * @param {tbl_AuditLineItemAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_AuditLineItem = await prisma.tbl_AuditLineItem.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_AuditLineItemAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_AuditLineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLineItemCountArgs} args - Arguments to filter Tbl_AuditLineItems to count.
     * @example
     * // Count the number of Tbl_AuditLineItems
     * const count = await prisma.tbl_AuditLineItem.count({
     *   where: {
     *     // ... the filter for the Tbl_AuditLineItems we want to count
     *   }
     * })
    **/
    count<T extends tbl_AuditLineItemCountArgs>(
      args?: Subset<T, tbl_AuditLineItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_AuditLineItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_AuditLineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_AuditLineItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_AuditLineItemAggregateArgs>(args: Subset<T, Tbl_AuditLineItemAggregateArgs>): Prisma.PrismaPromise<GetTbl_AuditLineItemAggregateType<T>>

    /**
     * Group by Tbl_AuditLineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLineItemGroupByArgs} args - Group by arguments.
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
      T extends tbl_AuditLineItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_AuditLineItemGroupByArgs['orderBy'] }
        : { orderBy?: tbl_AuditLineItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_AuditLineItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_AuditLineItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_AuditLineItem model
   */
  readonly fields: tbl_AuditLineItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_AuditLineItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_AuditLineItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_AuditLineItem model
   */
  interface tbl_AuditLineItemFieldRefs {
    readonly id: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly auditSessionId: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly productId: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly variantId: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly barcode: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly title: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly unitCost: FieldRef<"tbl_AuditLineItem", 'Float'>
    readonly expectedCount: FieldRef<"tbl_AuditLineItem", 'Int'>
    readonly actualCount: FieldRef<"tbl_AuditLineItem", 'Int'>
    readonly variance: FieldRef<"tbl_AuditLineItem", 'Int'>
    readonly reasonTag: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly note: FieldRef<"tbl_AuditLineItem", 'String'>
    readonly createdAt: FieldRef<"tbl_AuditLineItem", 'DateTime'>
    readonly updatedAt: FieldRef<"tbl_AuditLineItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_AuditLineItem findUnique
   */
  export type tbl_AuditLineItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLineItem to fetch.
     */
    where: tbl_AuditLineItemWhereUniqueInput
  }

  /**
   * tbl_AuditLineItem findUniqueOrThrow
   */
  export type tbl_AuditLineItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLineItem to fetch.
     */
    where: tbl_AuditLineItemWhereUniqueInput
  }

  /**
   * tbl_AuditLineItem findFirst
   */
  export type tbl_AuditLineItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLineItem to fetch.
     */
    where?: tbl_AuditLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLineItems to fetch.
     */
    orderBy?: tbl_AuditLineItemOrderByWithRelationInput | tbl_AuditLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_AuditLineItems.
     */
    cursor?: tbl_AuditLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_AuditLineItems.
     */
    distinct?: Tbl_AuditLineItemScalarFieldEnum | Tbl_AuditLineItemScalarFieldEnum[]
  }

  /**
   * tbl_AuditLineItem findFirstOrThrow
   */
  export type tbl_AuditLineItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLineItem to fetch.
     */
    where?: tbl_AuditLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLineItems to fetch.
     */
    orderBy?: tbl_AuditLineItemOrderByWithRelationInput | tbl_AuditLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_AuditLineItems.
     */
    cursor?: tbl_AuditLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_AuditLineItems.
     */
    distinct?: Tbl_AuditLineItemScalarFieldEnum | Tbl_AuditLineItemScalarFieldEnum[]
  }

  /**
   * tbl_AuditLineItem findMany
   */
  export type tbl_AuditLineItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLineItems to fetch.
     */
    where?: tbl_AuditLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLineItems to fetch.
     */
    orderBy?: tbl_AuditLineItemOrderByWithRelationInput | tbl_AuditLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_AuditLineItems.
     */
    cursor?: tbl_AuditLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLineItems.
     */
    skip?: number
    distinct?: Tbl_AuditLineItemScalarFieldEnum | Tbl_AuditLineItemScalarFieldEnum[]
  }

  /**
   * tbl_AuditLineItem create
   */
  export type tbl_AuditLineItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_AuditLineItem.
     */
    data: XOR<tbl_AuditLineItemCreateInput, tbl_AuditLineItemUncheckedCreateInput>
  }

  /**
   * tbl_AuditLineItem createMany
   */
  export type tbl_AuditLineItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_AuditLineItems.
     */
    data: tbl_AuditLineItemCreateManyInput | tbl_AuditLineItemCreateManyInput[]
  }

  /**
   * tbl_AuditLineItem update
   */
  export type tbl_AuditLineItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_AuditLineItem.
     */
    data: XOR<tbl_AuditLineItemUpdateInput, tbl_AuditLineItemUncheckedUpdateInput>
    /**
     * Choose, which tbl_AuditLineItem to update.
     */
    where: tbl_AuditLineItemWhereUniqueInput
  }

  /**
   * tbl_AuditLineItem updateMany
   */
  export type tbl_AuditLineItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_AuditLineItems.
     */
    data: XOR<tbl_AuditLineItemUpdateManyMutationInput, tbl_AuditLineItemUncheckedUpdateManyInput>
    /**
     * Filter which tbl_AuditLineItems to update
     */
    where?: tbl_AuditLineItemWhereInput
    /**
     * Limit how many tbl_AuditLineItems to update.
     */
    limit?: number
  }

  /**
   * tbl_AuditLineItem upsert
   */
  export type tbl_AuditLineItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_AuditLineItem to update in case it exists.
     */
    where: tbl_AuditLineItemWhereUniqueInput
    /**
     * In case the tbl_AuditLineItem found by the `where` argument doesn't exist, create a new tbl_AuditLineItem with this data.
     */
    create: XOR<tbl_AuditLineItemCreateInput, tbl_AuditLineItemUncheckedCreateInput>
    /**
     * In case the tbl_AuditLineItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_AuditLineItemUpdateInput, tbl_AuditLineItemUncheckedUpdateInput>
  }

  /**
   * tbl_AuditLineItem delete
   */
  export type tbl_AuditLineItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
    /**
     * Filter which tbl_AuditLineItem to delete.
     */
    where: tbl_AuditLineItemWhereUniqueInput
  }

  /**
   * tbl_AuditLineItem deleteMany
   */
  export type tbl_AuditLineItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_AuditLineItems to delete
     */
    where?: tbl_AuditLineItemWhereInput
    /**
     * Limit how many tbl_AuditLineItems to delete.
     */
    limit?: number
  }

  /**
   * tbl_AuditLineItem findRaw
   */
  export type tbl_AuditLineItemFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_AuditLineItem aggregateRaw
   */
  export type tbl_AuditLineItemAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_AuditLineItem without action
   */
  export type tbl_AuditLineItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLineItem
     */
    select?: tbl_AuditLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLineItem
     */
    omit?: tbl_AuditLineItemOmit<ExtArgs> | null
  }


  /**
   * Model tbl_DiscrepancyReason
   */

  export type AggregateTbl_DiscrepancyReason = {
    _count: Tbl_DiscrepancyReasonCountAggregateOutputType | null
    _min: Tbl_DiscrepancyReasonMinAggregateOutputType | null
    _max: Tbl_DiscrepancyReasonMaxAggregateOutputType | null
  }

  export type Tbl_DiscrepancyReasonMinAggregateOutputType = {
    id: string | null
    code: string | null
    label: string | null
    description: string | null
  }

  export type Tbl_DiscrepancyReasonMaxAggregateOutputType = {
    id: string | null
    code: string | null
    label: string | null
    description: string | null
  }

  export type Tbl_DiscrepancyReasonCountAggregateOutputType = {
    id: number
    code: number
    label: number
    description: number
    _all: number
  }


  export type Tbl_DiscrepancyReasonMinAggregateInputType = {
    id?: true
    code?: true
    label?: true
    description?: true
  }

  export type Tbl_DiscrepancyReasonMaxAggregateInputType = {
    id?: true
    code?: true
    label?: true
    description?: true
  }

  export type Tbl_DiscrepancyReasonCountAggregateInputType = {
    id?: true
    code?: true
    label?: true
    description?: true
    _all?: true
  }

  export type Tbl_DiscrepancyReasonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_DiscrepancyReason to aggregate.
     */
    where?: tbl_DiscrepancyReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_DiscrepancyReasons to fetch.
     */
    orderBy?: tbl_DiscrepancyReasonOrderByWithRelationInput | tbl_DiscrepancyReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_DiscrepancyReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_DiscrepancyReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_DiscrepancyReasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_DiscrepancyReasons
    **/
    _count?: true | Tbl_DiscrepancyReasonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_DiscrepancyReasonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_DiscrepancyReasonMaxAggregateInputType
  }

  export type GetTbl_DiscrepancyReasonAggregateType<T extends Tbl_DiscrepancyReasonAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_DiscrepancyReason]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_DiscrepancyReason[P]>
      : GetScalarType<T[P], AggregateTbl_DiscrepancyReason[P]>
  }




  export type tbl_DiscrepancyReasonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_DiscrepancyReasonWhereInput
    orderBy?: tbl_DiscrepancyReasonOrderByWithAggregationInput | tbl_DiscrepancyReasonOrderByWithAggregationInput[]
    by: Tbl_DiscrepancyReasonScalarFieldEnum[] | Tbl_DiscrepancyReasonScalarFieldEnum
    having?: tbl_DiscrepancyReasonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_DiscrepancyReasonCountAggregateInputType | true
    _min?: Tbl_DiscrepancyReasonMinAggregateInputType
    _max?: Tbl_DiscrepancyReasonMaxAggregateInputType
  }

  export type Tbl_DiscrepancyReasonGroupByOutputType = {
    id: string
    code: string
    label: string
    description: string | null
    _count: Tbl_DiscrepancyReasonCountAggregateOutputType | null
    _min: Tbl_DiscrepancyReasonMinAggregateOutputType | null
    _max: Tbl_DiscrepancyReasonMaxAggregateOutputType | null
  }

  type GetTbl_DiscrepancyReasonGroupByPayload<T extends tbl_DiscrepancyReasonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_DiscrepancyReasonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_DiscrepancyReasonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_DiscrepancyReasonGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_DiscrepancyReasonGroupByOutputType[P]>
        }
      >
    >


  export type tbl_DiscrepancyReasonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    label?: boolean
    description?: boolean
  }, ExtArgs["result"]["tbl_DiscrepancyReason"]>



  export type tbl_DiscrepancyReasonSelectScalar = {
    id?: boolean
    code?: boolean
    label?: boolean
    description?: boolean
  }

  export type tbl_DiscrepancyReasonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "label" | "description", ExtArgs["result"]["tbl_DiscrepancyReason"]>

  export type $tbl_DiscrepancyReasonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_DiscrepancyReason"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      label: string
      description: string | null
    }, ExtArgs["result"]["tbl_DiscrepancyReason"]>
    composites: {}
  }

  type tbl_DiscrepancyReasonGetPayload<S extends boolean | null | undefined | tbl_DiscrepancyReasonDefaultArgs> = $Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload, S>

  type tbl_DiscrepancyReasonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_DiscrepancyReasonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_DiscrepancyReasonCountAggregateInputType | true
    }

  export interface tbl_DiscrepancyReasonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_DiscrepancyReason'], meta: { name: 'tbl_DiscrepancyReason' } }
    /**
     * Find zero or one Tbl_DiscrepancyReason that matches the filter.
     * @param {tbl_DiscrepancyReasonFindUniqueArgs} args - Arguments to find a Tbl_DiscrepancyReason
     * @example
     * // Get one Tbl_DiscrepancyReason
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_DiscrepancyReasonFindUniqueArgs>(args: SelectSubset<T, tbl_DiscrepancyReasonFindUniqueArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_DiscrepancyReason that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_DiscrepancyReasonFindUniqueOrThrowArgs} args - Arguments to find a Tbl_DiscrepancyReason
     * @example
     * // Get one Tbl_DiscrepancyReason
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_DiscrepancyReasonFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_DiscrepancyReasonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_DiscrepancyReason that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_DiscrepancyReasonFindFirstArgs} args - Arguments to find a Tbl_DiscrepancyReason
     * @example
     * // Get one Tbl_DiscrepancyReason
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_DiscrepancyReasonFindFirstArgs>(args?: SelectSubset<T, tbl_DiscrepancyReasonFindFirstArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_DiscrepancyReason that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_DiscrepancyReasonFindFirstOrThrowArgs} args - Arguments to find a Tbl_DiscrepancyReason
     * @example
     * // Get one Tbl_DiscrepancyReason
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_DiscrepancyReasonFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_DiscrepancyReasonFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_DiscrepancyReasons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_DiscrepancyReasonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_DiscrepancyReasons
     * const tbl_DiscrepancyReasons = await prisma.tbl_DiscrepancyReason.findMany()
     * 
     * // Get first 10 Tbl_DiscrepancyReasons
     * const tbl_DiscrepancyReasons = await prisma.tbl_DiscrepancyReason.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_DiscrepancyReasonWithIdOnly = await prisma.tbl_DiscrepancyReason.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_DiscrepancyReasonFindManyArgs>(args?: SelectSubset<T, tbl_DiscrepancyReasonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_DiscrepancyReason.
     * @param {tbl_DiscrepancyReasonCreateArgs} args - Arguments to create a Tbl_DiscrepancyReason.
     * @example
     * // Create one Tbl_DiscrepancyReason
     * const Tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.create({
     *   data: {
     *     // ... data to create a Tbl_DiscrepancyReason
     *   }
     * })
     * 
     */
    create<T extends tbl_DiscrepancyReasonCreateArgs>(args: SelectSubset<T, tbl_DiscrepancyReasonCreateArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_DiscrepancyReasons.
     * @param {tbl_DiscrepancyReasonCreateManyArgs} args - Arguments to create many Tbl_DiscrepancyReasons.
     * @example
     * // Create many Tbl_DiscrepancyReasons
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_DiscrepancyReasonCreateManyArgs>(args?: SelectSubset<T, tbl_DiscrepancyReasonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_DiscrepancyReason.
     * @param {tbl_DiscrepancyReasonDeleteArgs} args - Arguments to delete one Tbl_DiscrepancyReason.
     * @example
     * // Delete one Tbl_DiscrepancyReason
     * const Tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.delete({
     *   where: {
     *     // ... filter to delete one Tbl_DiscrepancyReason
     *   }
     * })
     * 
     */
    delete<T extends tbl_DiscrepancyReasonDeleteArgs>(args: SelectSubset<T, tbl_DiscrepancyReasonDeleteArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_DiscrepancyReason.
     * @param {tbl_DiscrepancyReasonUpdateArgs} args - Arguments to update one Tbl_DiscrepancyReason.
     * @example
     * // Update one Tbl_DiscrepancyReason
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_DiscrepancyReasonUpdateArgs>(args: SelectSubset<T, tbl_DiscrepancyReasonUpdateArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_DiscrepancyReasons.
     * @param {tbl_DiscrepancyReasonDeleteManyArgs} args - Arguments to filter Tbl_DiscrepancyReasons to delete.
     * @example
     * // Delete a few Tbl_DiscrepancyReasons
     * const { count } = await prisma.tbl_DiscrepancyReason.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_DiscrepancyReasonDeleteManyArgs>(args?: SelectSubset<T, tbl_DiscrepancyReasonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_DiscrepancyReasons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_DiscrepancyReasonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_DiscrepancyReasons
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_DiscrepancyReasonUpdateManyArgs>(args: SelectSubset<T, tbl_DiscrepancyReasonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_DiscrepancyReason.
     * @param {tbl_DiscrepancyReasonUpsertArgs} args - Arguments to update or create a Tbl_DiscrepancyReason.
     * @example
     * // Update or create a Tbl_DiscrepancyReason
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.upsert({
     *   create: {
     *     // ... data to create a Tbl_DiscrepancyReason
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_DiscrepancyReason we want to update
     *   }
     * })
     */
    upsert<T extends tbl_DiscrepancyReasonUpsertArgs>(args: SelectSubset<T, tbl_DiscrepancyReasonUpsertArgs<ExtArgs>>): Prisma__tbl_DiscrepancyReasonClient<$Result.GetResult<Prisma.$tbl_DiscrepancyReasonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_DiscrepancyReasons that matches the filter.
     * @param {tbl_DiscrepancyReasonFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_DiscrepancyReasonFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_DiscrepancyReason.
     * @param {tbl_DiscrepancyReasonAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_DiscrepancyReason = await prisma.tbl_DiscrepancyReason.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_DiscrepancyReasonAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_DiscrepancyReasons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_DiscrepancyReasonCountArgs} args - Arguments to filter Tbl_DiscrepancyReasons to count.
     * @example
     * // Count the number of Tbl_DiscrepancyReasons
     * const count = await prisma.tbl_DiscrepancyReason.count({
     *   where: {
     *     // ... the filter for the Tbl_DiscrepancyReasons we want to count
     *   }
     * })
    **/
    count<T extends tbl_DiscrepancyReasonCountArgs>(
      args?: Subset<T, tbl_DiscrepancyReasonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_DiscrepancyReasonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_DiscrepancyReason.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_DiscrepancyReasonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_DiscrepancyReasonAggregateArgs>(args: Subset<T, Tbl_DiscrepancyReasonAggregateArgs>): Prisma.PrismaPromise<GetTbl_DiscrepancyReasonAggregateType<T>>

    /**
     * Group by Tbl_DiscrepancyReason.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_DiscrepancyReasonGroupByArgs} args - Group by arguments.
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
      T extends tbl_DiscrepancyReasonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_DiscrepancyReasonGroupByArgs['orderBy'] }
        : { orderBy?: tbl_DiscrepancyReasonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_DiscrepancyReasonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_DiscrepancyReasonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_DiscrepancyReason model
   */
  readonly fields: tbl_DiscrepancyReasonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_DiscrepancyReason.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_DiscrepancyReasonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_DiscrepancyReason model
   */
  interface tbl_DiscrepancyReasonFieldRefs {
    readonly id: FieldRef<"tbl_DiscrepancyReason", 'String'>
    readonly code: FieldRef<"tbl_DiscrepancyReason", 'String'>
    readonly label: FieldRef<"tbl_DiscrepancyReason", 'String'>
    readonly description: FieldRef<"tbl_DiscrepancyReason", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tbl_DiscrepancyReason findUnique
   */
  export type tbl_DiscrepancyReasonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * Filter, which tbl_DiscrepancyReason to fetch.
     */
    where: tbl_DiscrepancyReasonWhereUniqueInput
  }

  /**
   * tbl_DiscrepancyReason findUniqueOrThrow
   */
  export type tbl_DiscrepancyReasonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * Filter, which tbl_DiscrepancyReason to fetch.
     */
    where: tbl_DiscrepancyReasonWhereUniqueInput
  }

  /**
   * tbl_DiscrepancyReason findFirst
   */
  export type tbl_DiscrepancyReasonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * Filter, which tbl_DiscrepancyReason to fetch.
     */
    where?: tbl_DiscrepancyReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_DiscrepancyReasons to fetch.
     */
    orderBy?: tbl_DiscrepancyReasonOrderByWithRelationInput | tbl_DiscrepancyReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_DiscrepancyReasons.
     */
    cursor?: tbl_DiscrepancyReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_DiscrepancyReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_DiscrepancyReasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_DiscrepancyReasons.
     */
    distinct?: Tbl_DiscrepancyReasonScalarFieldEnum | Tbl_DiscrepancyReasonScalarFieldEnum[]
  }

  /**
   * tbl_DiscrepancyReason findFirstOrThrow
   */
  export type tbl_DiscrepancyReasonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * Filter, which tbl_DiscrepancyReason to fetch.
     */
    where?: tbl_DiscrepancyReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_DiscrepancyReasons to fetch.
     */
    orderBy?: tbl_DiscrepancyReasonOrderByWithRelationInput | tbl_DiscrepancyReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_DiscrepancyReasons.
     */
    cursor?: tbl_DiscrepancyReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_DiscrepancyReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_DiscrepancyReasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_DiscrepancyReasons.
     */
    distinct?: Tbl_DiscrepancyReasonScalarFieldEnum | Tbl_DiscrepancyReasonScalarFieldEnum[]
  }

  /**
   * tbl_DiscrepancyReason findMany
   */
  export type tbl_DiscrepancyReasonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * Filter, which tbl_DiscrepancyReasons to fetch.
     */
    where?: tbl_DiscrepancyReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_DiscrepancyReasons to fetch.
     */
    orderBy?: tbl_DiscrepancyReasonOrderByWithRelationInput | tbl_DiscrepancyReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_DiscrepancyReasons.
     */
    cursor?: tbl_DiscrepancyReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_DiscrepancyReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_DiscrepancyReasons.
     */
    skip?: number
    distinct?: Tbl_DiscrepancyReasonScalarFieldEnum | Tbl_DiscrepancyReasonScalarFieldEnum[]
  }

  /**
   * tbl_DiscrepancyReason create
   */
  export type tbl_DiscrepancyReasonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_DiscrepancyReason.
     */
    data: XOR<tbl_DiscrepancyReasonCreateInput, tbl_DiscrepancyReasonUncheckedCreateInput>
  }

  /**
   * tbl_DiscrepancyReason createMany
   */
  export type tbl_DiscrepancyReasonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_DiscrepancyReasons.
     */
    data: tbl_DiscrepancyReasonCreateManyInput | tbl_DiscrepancyReasonCreateManyInput[]
  }

  /**
   * tbl_DiscrepancyReason update
   */
  export type tbl_DiscrepancyReasonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_DiscrepancyReason.
     */
    data: XOR<tbl_DiscrepancyReasonUpdateInput, tbl_DiscrepancyReasonUncheckedUpdateInput>
    /**
     * Choose, which tbl_DiscrepancyReason to update.
     */
    where: tbl_DiscrepancyReasonWhereUniqueInput
  }

  /**
   * tbl_DiscrepancyReason updateMany
   */
  export type tbl_DiscrepancyReasonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_DiscrepancyReasons.
     */
    data: XOR<tbl_DiscrepancyReasonUpdateManyMutationInput, tbl_DiscrepancyReasonUncheckedUpdateManyInput>
    /**
     * Filter which tbl_DiscrepancyReasons to update
     */
    where?: tbl_DiscrepancyReasonWhereInput
    /**
     * Limit how many tbl_DiscrepancyReasons to update.
     */
    limit?: number
  }

  /**
   * tbl_DiscrepancyReason upsert
   */
  export type tbl_DiscrepancyReasonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_DiscrepancyReason to update in case it exists.
     */
    where: tbl_DiscrepancyReasonWhereUniqueInput
    /**
     * In case the tbl_DiscrepancyReason found by the `where` argument doesn't exist, create a new tbl_DiscrepancyReason with this data.
     */
    create: XOR<tbl_DiscrepancyReasonCreateInput, tbl_DiscrepancyReasonUncheckedCreateInput>
    /**
     * In case the tbl_DiscrepancyReason was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_DiscrepancyReasonUpdateInput, tbl_DiscrepancyReasonUncheckedUpdateInput>
  }

  /**
   * tbl_DiscrepancyReason delete
   */
  export type tbl_DiscrepancyReasonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
    /**
     * Filter which tbl_DiscrepancyReason to delete.
     */
    where: tbl_DiscrepancyReasonWhereUniqueInput
  }

  /**
   * tbl_DiscrepancyReason deleteMany
   */
  export type tbl_DiscrepancyReasonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_DiscrepancyReasons to delete
     */
    where?: tbl_DiscrepancyReasonWhereInput
    /**
     * Limit how many tbl_DiscrepancyReasons to delete.
     */
    limit?: number
  }

  /**
   * tbl_DiscrepancyReason findRaw
   */
  export type tbl_DiscrepancyReasonFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_DiscrepancyReason aggregateRaw
   */
  export type tbl_DiscrepancyReasonAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_DiscrepancyReason without action
   */
  export type tbl_DiscrepancyReasonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_DiscrepancyReason
     */
    select?: tbl_DiscrepancyReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_DiscrepancyReason
     */
    omit?: tbl_DiscrepancyReasonOmit<ExtArgs> | null
  }


  /**
   * Model tbl_AuditLog
   */

  export type AggregateTbl_AuditLog = {
    _count: Tbl_AuditLogCountAggregateOutputType | null
    _avg: Tbl_AuditLogAvgAggregateOutputType | null
    _sum: Tbl_AuditLogSumAggregateOutputType | null
    _min: Tbl_AuditLogMinAggregateOutputType | null
    _max: Tbl_AuditLogMaxAggregateOutputType | null
  }

  export type Tbl_AuditLogAvgAggregateOutputType = {
    totalItemsScanned: number | null
    totalNetVariance: number | null
    totalDollarVariance: number | null
  }

  export type Tbl_AuditLogSumAggregateOutputType = {
    totalItemsScanned: number | null
    totalNetVariance: number | null
    totalDollarVariance: number | null
  }

  export type Tbl_AuditLogMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    auditSessionId: string | null
    totalItemsScanned: number | null
    totalNetVariance: number | null
    totalDollarVariance: number | null
    syncedToShopify: boolean | null
    completedAt: Date | null
  }

  export type Tbl_AuditLogMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    auditSessionId: string | null
    totalItemsScanned: number | null
    totalNetVariance: number | null
    totalDollarVariance: number | null
    syncedToShopify: boolean | null
    completedAt: Date | null
  }

  export type Tbl_AuditLogCountAggregateOutputType = {
    id: number
    shopId: number
    auditSessionId: number
    totalItemsScanned: number
    totalNetVariance: number
    totalDollarVariance: number
    syncedToShopify: number
    completedAt: number
    _all: number
  }


  export type Tbl_AuditLogAvgAggregateInputType = {
    totalItemsScanned?: true
    totalNetVariance?: true
    totalDollarVariance?: true
  }

  export type Tbl_AuditLogSumAggregateInputType = {
    totalItemsScanned?: true
    totalNetVariance?: true
    totalDollarVariance?: true
  }

  export type Tbl_AuditLogMinAggregateInputType = {
    id?: true
    shopId?: true
    auditSessionId?: true
    totalItemsScanned?: true
    totalNetVariance?: true
    totalDollarVariance?: true
    syncedToShopify?: true
    completedAt?: true
  }

  export type Tbl_AuditLogMaxAggregateInputType = {
    id?: true
    shopId?: true
    auditSessionId?: true
    totalItemsScanned?: true
    totalNetVariance?: true
    totalDollarVariance?: true
    syncedToShopify?: true
    completedAt?: true
  }

  export type Tbl_AuditLogCountAggregateInputType = {
    id?: true
    shopId?: true
    auditSessionId?: true
    totalItemsScanned?: true
    totalNetVariance?: true
    totalDollarVariance?: true
    syncedToShopify?: true
    completedAt?: true
    _all?: true
  }

  export type Tbl_AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_AuditLog to aggregate.
     */
    where?: tbl_AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLogs to fetch.
     */
    orderBy?: tbl_AuditLogOrderByWithRelationInput | tbl_AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_AuditLogs
    **/
    _count?: true | Tbl_AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tbl_AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tbl_AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_AuditLogMaxAggregateInputType
  }

  export type GetTbl_AuditLogAggregateType<T extends Tbl_AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_AuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_AuditLog[P]>
      : GetScalarType<T[P], AggregateTbl_AuditLog[P]>
  }




  export type tbl_AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_AuditLogWhereInput
    orderBy?: tbl_AuditLogOrderByWithAggregationInput | tbl_AuditLogOrderByWithAggregationInput[]
    by: Tbl_AuditLogScalarFieldEnum[] | Tbl_AuditLogScalarFieldEnum
    having?: tbl_AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_AuditLogCountAggregateInputType | true
    _avg?: Tbl_AuditLogAvgAggregateInputType
    _sum?: Tbl_AuditLogSumAggregateInputType
    _min?: Tbl_AuditLogMinAggregateInputType
    _max?: Tbl_AuditLogMaxAggregateInputType
  }

  export type Tbl_AuditLogGroupByOutputType = {
    id: string
    shopId: string
    auditSessionId: string
    totalItemsScanned: number
    totalNetVariance: number
    totalDollarVariance: number
    syncedToShopify: boolean
    completedAt: Date
    _count: Tbl_AuditLogCountAggregateOutputType | null
    _avg: Tbl_AuditLogAvgAggregateOutputType | null
    _sum: Tbl_AuditLogSumAggregateOutputType | null
    _min: Tbl_AuditLogMinAggregateOutputType | null
    _max: Tbl_AuditLogMaxAggregateOutputType | null
  }

  type GetTbl_AuditLogGroupByPayload<T extends tbl_AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type tbl_AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    auditSessionId?: boolean
    totalItemsScanned?: boolean
    totalNetVariance?: boolean
    totalDollarVariance?: boolean
    syncedToShopify?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["tbl_AuditLog"]>



  export type tbl_AuditLogSelectScalar = {
    id?: boolean
    shopId?: boolean
    auditSessionId?: boolean
    totalItemsScanned?: boolean
    totalNetVariance?: boolean
    totalDollarVariance?: boolean
    syncedToShopify?: boolean
    completedAt?: boolean
  }

  export type tbl_AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "auditSessionId" | "totalItemsScanned" | "totalNetVariance" | "totalDollarVariance" | "syncedToShopify" | "completedAt", ExtArgs["result"]["tbl_AuditLog"]>

  export type $tbl_AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      auditSessionId: string
      totalItemsScanned: number
      totalNetVariance: number
      totalDollarVariance: number
      syncedToShopify: boolean
      completedAt: Date
    }, ExtArgs["result"]["tbl_AuditLog"]>
    composites: {}
  }

  type tbl_AuditLogGetPayload<S extends boolean | null | undefined | tbl_AuditLogDefaultArgs> = $Result.GetResult<Prisma.$tbl_AuditLogPayload, S>

  type tbl_AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_AuditLogCountAggregateInputType | true
    }

  export interface tbl_AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_AuditLog'], meta: { name: 'tbl_AuditLog' } }
    /**
     * Find zero or one Tbl_AuditLog that matches the filter.
     * @param {tbl_AuditLogFindUniqueArgs} args - Arguments to find a Tbl_AuditLog
     * @example
     * // Get one Tbl_AuditLog
     * const tbl_AuditLog = await prisma.tbl_AuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_AuditLogFindUniqueArgs>(args: SelectSubset<T, tbl_AuditLogFindUniqueArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_AuditLogFindUniqueOrThrowArgs} args - Arguments to find a Tbl_AuditLog
     * @example
     * // Get one Tbl_AuditLog
     * const tbl_AuditLog = await prisma.tbl_AuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLogFindFirstArgs} args - Arguments to find a Tbl_AuditLog
     * @example
     * // Get one Tbl_AuditLog
     * const tbl_AuditLog = await prisma.tbl_AuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_AuditLogFindFirstArgs>(args?: SelectSubset<T, tbl_AuditLogFindFirstArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLogFindFirstOrThrowArgs} args - Arguments to find a Tbl_AuditLog
     * @example
     * // Get one Tbl_AuditLog
     * const tbl_AuditLog = await prisma.tbl_AuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_AuditLogs
     * const tbl_AuditLogs = await prisma.tbl_AuditLog.findMany()
     * 
     * // Get first 10 Tbl_AuditLogs
     * const tbl_AuditLogs = await prisma.tbl_AuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_AuditLogWithIdOnly = await prisma.tbl_AuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_AuditLogFindManyArgs>(args?: SelectSubset<T, tbl_AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_AuditLog.
     * @param {tbl_AuditLogCreateArgs} args - Arguments to create a Tbl_AuditLog.
     * @example
     * // Create one Tbl_AuditLog
     * const Tbl_AuditLog = await prisma.tbl_AuditLog.create({
     *   data: {
     *     // ... data to create a Tbl_AuditLog
     *   }
     * })
     * 
     */
    create<T extends tbl_AuditLogCreateArgs>(args: SelectSubset<T, tbl_AuditLogCreateArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_AuditLogs.
     * @param {tbl_AuditLogCreateManyArgs} args - Arguments to create many Tbl_AuditLogs.
     * @example
     * // Create many Tbl_AuditLogs
     * const tbl_AuditLog = await prisma.tbl_AuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_AuditLogCreateManyArgs>(args?: SelectSubset<T, tbl_AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_AuditLog.
     * @param {tbl_AuditLogDeleteArgs} args - Arguments to delete one Tbl_AuditLog.
     * @example
     * // Delete one Tbl_AuditLog
     * const Tbl_AuditLog = await prisma.tbl_AuditLog.delete({
     *   where: {
     *     // ... filter to delete one Tbl_AuditLog
     *   }
     * })
     * 
     */
    delete<T extends tbl_AuditLogDeleteArgs>(args: SelectSubset<T, tbl_AuditLogDeleteArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_AuditLog.
     * @param {tbl_AuditLogUpdateArgs} args - Arguments to update one Tbl_AuditLog.
     * @example
     * // Update one Tbl_AuditLog
     * const tbl_AuditLog = await prisma.tbl_AuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_AuditLogUpdateArgs>(args: SelectSubset<T, tbl_AuditLogUpdateArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_AuditLogs.
     * @param {tbl_AuditLogDeleteManyArgs} args - Arguments to filter Tbl_AuditLogs to delete.
     * @example
     * // Delete a few Tbl_AuditLogs
     * const { count } = await prisma.tbl_AuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_AuditLogDeleteManyArgs>(args?: SelectSubset<T, tbl_AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_AuditLogs
     * const tbl_AuditLog = await prisma.tbl_AuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_AuditLogUpdateManyArgs>(args: SelectSubset<T, tbl_AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_AuditLog.
     * @param {tbl_AuditLogUpsertArgs} args - Arguments to update or create a Tbl_AuditLog.
     * @example
     * // Update or create a Tbl_AuditLog
     * const tbl_AuditLog = await prisma.tbl_AuditLog.upsert({
     *   create: {
     *     // ... data to create a Tbl_AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends tbl_AuditLogUpsertArgs>(args: SelectSubset<T, tbl_AuditLogUpsertArgs<ExtArgs>>): Prisma__tbl_AuditLogClient<$Result.GetResult<Prisma.$tbl_AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_AuditLogs that matches the filter.
     * @param {tbl_AuditLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_AuditLog = await prisma.tbl_AuditLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_AuditLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_AuditLog.
     * @param {tbl_AuditLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_AuditLog = await prisma.tbl_AuditLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_AuditLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLogCountArgs} args - Arguments to filter Tbl_AuditLogs to count.
     * @example
     * // Count the number of Tbl_AuditLogs
     * const count = await prisma.tbl_AuditLog.count({
     *   where: {
     *     // ... the filter for the Tbl_AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends tbl_AuditLogCountArgs>(
      args?: Subset<T, tbl_AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_AuditLogAggregateArgs>(args: Subset<T, Tbl_AuditLogAggregateArgs>): Prisma.PrismaPromise<GetTbl_AuditLogAggregateType<T>>

    /**
     * Group by Tbl_AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_AuditLogGroupByArgs} args - Group by arguments.
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
      T extends tbl_AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: tbl_AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_AuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_AuditLog model
   */
  readonly fields: tbl_AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_AuditLog model
   */
  interface tbl_AuditLogFieldRefs {
    readonly id: FieldRef<"tbl_AuditLog", 'String'>
    readonly shopId: FieldRef<"tbl_AuditLog", 'String'>
    readonly auditSessionId: FieldRef<"tbl_AuditLog", 'String'>
    readonly totalItemsScanned: FieldRef<"tbl_AuditLog", 'Int'>
    readonly totalNetVariance: FieldRef<"tbl_AuditLog", 'Int'>
    readonly totalDollarVariance: FieldRef<"tbl_AuditLog", 'Float'>
    readonly syncedToShopify: FieldRef<"tbl_AuditLog", 'Boolean'>
    readonly completedAt: FieldRef<"tbl_AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_AuditLog findUnique
   */
  export type tbl_AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLog to fetch.
     */
    where: tbl_AuditLogWhereUniqueInput
  }

  /**
   * tbl_AuditLog findUniqueOrThrow
   */
  export type tbl_AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLog to fetch.
     */
    where: tbl_AuditLogWhereUniqueInput
  }

  /**
   * tbl_AuditLog findFirst
   */
  export type tbl_AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLog to fetch.
     */
    where?: tbl_AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLogs to fetch.
     */
    orderBy?: tbl_AuditLogOrderByWithRelationInput | tbl_AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_AuditLogs.
     */
    cursor?: tbl_AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_AuditLogs.
     */
    distinct?: Tbl_AuditLogScalarFieldEnum | Tbl_AuditLogScalarFieldEnum[]
  }

  /**
   * tbl_AuditLog findFirstOrThrow
   */
  export type tbl_AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLog to fetch.
     */
    where?: tbl_AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLogs to fetch.
     */
    orderBy?: tbl_AuditLogOrderByWithRelationInput | tbl_AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_AuditLogs.
     */
    cursor?: tbl_AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_AuditLogs.
     */
    distinct?: Tbl_AuditLogScalarFieldEnum | Tbl_AuditLogScalarFieldEnum[]
  }

  /**
   * tbl_AuditLog findMany
   */
  export type tbl_AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which tbl_AuditLogs to fetch.
     */
    where?: tbl_AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_AuditLogs to fetch.
     */
    orderBy?: tbl_AuditLogOrderByWithRelationInput | tbl_AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_AuditLogs.
     */
    cursor?: tbl_AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_AuditLogs.
     */
    skip?: number
    distinct?: Tbl_AuditLogScalarFieldEnum | Tbl_AuditLogScalarFieldEnum[]
  }

  /**
   * tbl_AuditLog create
   */
  export type tbl_AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_AuditLog.
     */
    data: XOR<tbl_AuditLogCreateInput, tbl_AuditLogUncheckedCreateInput>
  }

  /**
   * tbl_AuditLog createMany
   */
  export type tbl_AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_AuditLogs.
     */
    data: tbl_AuditLogCreateManyInput | tbl_AuditLogCreateManyInput[]
  }

  /**
   * tbl_AuditLog update
   */
  export type tbl_AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_AuditLog.
     */
    data: XOR<tbl_AuditLogUpdateInput, tbl_AuditLogUncheckedUpdateInput>
    /**
     * Choose, which tbl_AuditLog to update.
     */
    where: tbl_AuditLogWhereUniqueInput
  }

  /**
   * tbl_AuditLog updateMany
   */
  export type tbl_AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_AuditLogs.
     */
    data: XOR<tbl_AuditLogUpdateManyMutationInput, tbl_AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which tbl_AuditLogs to update
     */
    where?: tbl_AuditLogWhereInput
    /**
     * Limit how many tbl_AuditLogs to update.
     */
    limit?: number
  }

  /**
   * tbl_AuditLog upsert
   */
  export type tbl_AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_AuditLog to update in case it exists.
     */
    where: tbl_AuditLogWhereUniqueInput
    /**
     * In case the tbl_AuditLog found by the `where` argument doesn't exist, create a new tbl_AuditLog with this data.
     */
    create: XOR<tbl_AuditLogCreateInput, tbl_AuditLogUncheckedCreateInput>
    /**
     * In case the tbl_AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_AuditLogUpdateInput, tbl_AuditLogUncheckedUpdateInput>
  }

  /**
   * tbl_AuditLog delete
   */
  export type tbl_AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
    /**
     * Filter which tbl_AuditLog to delete.
     */
    where: tbl_AuditLogWhereUniqueInput
  }

  /**
   * tbl_AuditLog deleteMany
   */
  export type tbl_AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_AuditLogs to delete
     */
    where?: tbl_AuditLogWhereInput
    /**
     * Limit how many tbl_AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * tbl_AuditLog findRaw
   */
  export type tbl_AuditLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_AuditLog aggregateRaw
   */
  export type tbl_AuditLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_AuditLog without action
   */
  export type tbl_AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_AuditLog
     */
    select?: tbl_AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_AuditLog
     */
    omit?: tbl_AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model tbl_Subscription
   */

  export type AggregateTbl_Subscription = {
    _count: Tbl_SubscriptionCountAggregateOutputType | null
    _avg: Tbl_SubscriptionAvgAggregateOutputType | null
    _sum: Tbl_SubscriptionSumAggregateOutputType | null
    _min: Tbl_SubscriptionMinAggregateOutputType | null
    _max: Tbl_SubscriptionMaxAggregateOutputType | null
  }

  export type Tbl_SubscriptionAvgAggregateOutputType = {
    price: number | null
  }

  export type Tbl_SubscriptionSumAggregateOutputType = {
    price: number | null
  }

  export type Tbl_SubscriptionMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    plan: string | null
    status: string | null
    shopifySubscriptionId: string | null
    price: number | null
    currency: string | null
    billingInterval: string | null
    trialEndsAt: Date | null
    billingCycleEndDate: Date | null
    cancelledAt: Date | null
    cancellationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_SubscriptionMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    plan: string | null
    status: string | null
    shopifySubscriptionId: string | null
    price: number | null
    currency: string | null
    billingInterval: string | null
    trialEndsAt: Date | null
    billingCycleEndDate: Date | null
    cancelledAt: Date | null
    cancellationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Tbl_SubscriptionCountAggregateOutputType = {
    id: number
    shopId: number
    plan: number
    status: number
    shopifySubscriptionId: number
    price: number
    currency: number
    billingInterval: number
    trialEndsAt: number
    billingCycleEndDate: number
    cancelledAt: number
    cancellationReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Tbl_SubscriptionAvgAggregateInputType = {
    price?: true
  }

  export type Tbl_SubscriptionSumAggregateInputType = {
    price?: true
  }

  export type Tbl_SubscriptionMinAggregateInputType = {
    id?: true
    shopId?: true
    plan?: true
    status?: true
    shopifySubscriptionId?: true
    price?: true
    currency?: true
    billingInterval?: true
    trialEndsAt?: true
    billingCycleEndDate?: true
    cancelledAt?: true
    cancellationReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_SubscriptionMaxAggregateInputType = {
    id?: true
    shopId?: true
    plan?: true
    status?: true
    shopifySubscriptionId?: true
    price?: true
    currency?: true
    billingInterval?: true
    trialEndsAt?: true
    billingCycleEndDate?: true
    cancelledAt?: true
    cancellationReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Tbl_SubscriptionCountAggregateInputType = {
    id?: true
    shopId?: true
    plan?: true
    status?: true
    shopifySubscriptionId?: true
    price?: true
    currency?: true
    billingInterval?: true
    trialEndsAt?: true
    billingCycleEndDate?: true
    cancelledAt?: true
    cancellationReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Tbl_SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Subscription to aggregate.
     */
    where?: tbl_SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Subscriptions to fetch.
     */
    orderBy?: tbl_SubscriptionOrderByWithRelationInput | tbl_SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tbl_SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tbl_Subscriptions
    **/
    _count?: true | Tbl_SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tbl_SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tbl_SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tbl_SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tbl_SubscriptionMaxAggregateInputType
  }

  export type GetTbl_SubscriptionAggregateType<T extends Tbl_SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateTbl_Subscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTbl_Subscription[P]>
      : GetScalarType<T[P], AggregateTbl_Subscription[P]>
  }




  export type tbl_SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tbl_SubscriptionWhereInput
    orderBy?: tbl_SubscriptionOrderByWithAggregationInput | tbl_SubscriptionOrderByWithAggregationInput[]
    by: Tbl_SubscriptionScalarFieldEnum[] | Tbl_SubscriptionScalarFieldEnum
    having?: tbl_SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tbl_SubscriptionCountAggregateInputType | true
    _avg?: Tbl_SubscriptionAvgAggregateInputType
    _sum?: Tbl_SubscriptionSumAggregateInputType
    _min?: Tbl_SubscriptionMinAggregateInputType
    _max?: Tbl_SubscriptionMaxAggregateInputType
  }

  export type Tbl_SubscriptionGroupByOutputType = {
    id: string
    shopId: string
    plan: string
    status: string
    shopifySubscriptionId: string | null
    price: number
    currency: string
    billingInterval: string
    trialEndsAt: Date | null
    billingCycleEndDate: Date | null
    cancelledAt: Date | null
    cancellationReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: Tbl_SubscriptionCountAggregateOutputType | null
    _avg: Tbl_SubscriptionAvgAggregateOutputType | null
    _sum: Tbl_SubscriptionSumAggregateOutputType | null
    _min: Tbl_SubscriptionMinAggregateOutputType | null
    _max: Tbl_SubscriptionMaxAggregateOutputType | null
  }

  type GetTbl_SubscriptionGroupByPayload<T extends tbl_SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tbl_SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tbl_SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tbl_SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], Tbl_SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type tbl_SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    plan?: boolean
    status?: boolean
    shopifySubscriptionId?: boolean
    price?: boolean
    currency?: boolean
    billingInterval?: boolean
    trialEndsAt?: boolean
    billingCycleEndDate?: boolean
    cancelledAt?: boolean
    cancellationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tbl_Subscription"]>



  export type tbl_SubscriptionSelectScalar = {
    id?: boolean
    shopId?: boolean
    plan?: boolean
    status?: boolean
    shopifySubscriptionId?: boolean
    price?: boolean
    currency?: boolean
    billingInterval?: boolean
    trialEndsAt?: boolean
    billingCycleEndDate?: boolean
    cancelledAt?: boolean
    cancellationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type tbl_SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "plan" | "status" | "shopifySubscriptionId" | "price" | "currency" | "billingInterval" | "trialEndsAt" | "billingCycleEndDate" | "cancelledAt" | "cancellationReason" | "createdAt" | "updatedAt", ExtArgs["result"]["tbl_Subscription"]>

  export type $tbl_SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tbl_Subscription"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      plan: string
      status: string
      shopifySubscriptionId: string | null
      price: number
      currency: string
      billingInterval: string
      trialEndsAt: Date | null
      billingCycleEndDate: Date | null
      cancelledAt: Date | null
      cancellationReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tbl_Subscription"]>
    composites: {}
  }

  type tbl_SubscriptionGetPayload<S extends boolean | null | undefined | tbl_SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$tbl_SubscriptionPayload, S>

  type tbl_SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tbl_SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tbl_SubscriptionCountAggregateInputType | true
    }

  export interface tbl_SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tbl_Subscription'], meta: { name: 'tbl_Subscription' } }
    /**
     * Find zero or one Tbl_Subscription that matches the filter.
     * @param {tbl_SubscriptionFindUniqueArgs} args - Arguments to find a Tbl_Subscription
     * @example
     * // Get one Tbl_Subscription
     * const tbl_Subscription = await prisma.tbl_Subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tbl_SubscriptionFindUniqueArgs>(args: SelectSubset<T, tbl_SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tbl_Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tbl_SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Tbl_Subscription
     * @example
     * // Get one Tbl_Subscription
     * const tbl_Subscription = await prisma.tbl_Subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tbl_SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, tbl_SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SubscriptionFindFirstArgs} args - Arguments to find a Tbl_Subscription
     * @example
     * // Get one Tbl_Subscription
     * const tbl_Subscription = await prisma.tbl_Subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tbl_SubscriptionFindFirstArgs>(args?: SelectSubset<T, tbl_SubscriptionFindFirstArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tbl_Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Tbl_Subscription
     * @example
     * // Get one Tbl_Subscription
     * const tbl_Subscription = await prisma.tbl_Subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tbl_SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, tbl_SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tbl_Subscriptions
     * const tbl_Subscriptions = await prisma.tbl_Subscription.findMany()
     * 
     * // Get first 10 Tbl_Subscriptions
     * const tbl_Subscriptions = await prisma.tbl_Subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tbl_SubscriptionWithIdOnly = await prisma.tbl_Subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tbl_SubscriptionFindManyArgs>(args?: SelectSubset<T, tbl_SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tbl_Subscription.
     * @param {tbl_SubscriptionCreateArgs} args - Arguments to create a Tbl_Subscription.
     * @example
     * // Create one Tbl_Subscription
     * const Tbl_Subscription = await prisma.tbl_Subscription.create({
     *   data: {
     *     // ... data to create a Tbl_Subscription
     *   }
     * })
     * 
     */
    create<T extends tbl_SubscriptionCreateArgs>(args: SelectSubset<T, tbl_SubscriptionCreateArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tbl_Subscriptions.
     * @param {tbl_SubscriptionCreateManyArgs} args - Arguments to create many Tbl_Subscriptions.
     * @example
     * // Create many Tbl_Subscriptions
     * const tbl_Subscription = await prisma.tbl_Subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tbl_SubscriptionCreateManyArgs>(args?: SelectSubset<T, tbl_SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tbl_Subscription.
     * @param {tbl_SubscriptionDeleteArgs} args - Arguments to delete one Tbl_Subscription.
     * @example
     * // Delete one Tbl_Subscription
     * const Tbl_Subscription = await prisma.tbl_Subscription.delete({
     *   where: {
     *     // ... filter to delete one Tbl_Subscription
     *   }
     * })
     * 
     */
    delete<T extends tbl_SubscriptionDeleteArgs>(args: SelectSubset<T, tbl_SubscriptionDeleteArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tbl_Subscription.
     * @param {tbl_SubscriptionUpdateArgs} args - Arguments to update one Tbl_Subscription.
     * @example
     * // Update one Tbl_Subscription
     * const tbl_Subscription = await prisma.tbl_Subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tbl_SubscriptionUpdateArgs>(args: SelectSubset<T, tbl_SubscriptionUpdateArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tbl_Subscriptions.
     * @param {tbl_SubscriptionDeleteManyArgs} args - Arguments to filter Tbl_Subscriptions to delete.
     * @example
     * // Delete a few Tbl_Subscriptions
     * const { count } = await prisma.tbl_Subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tbl_SubscriptionDeleteManyArgs>(args?: SelectSubset<T, tbl_SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tbl_Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tbl_Subscriptions
     * const tbl_Subscription = await prisma.tbl_Subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tbl_SubscriptionUpdateManyArgs>(args: SelectSubset<T, tbl_SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tbl_Subscription.
     * @param {tbl_SubscriptionUpsertArgs} args - Arguments to update or create a Tbl_Subscription.
     * @example
     * // Update or create a Tbl_Subscription
     * const tbl_Subscription = await prisma.tbl_Subscription.upsert({
     *   create: {
     *     // ... data to create a Tbl_Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tbl_Subscription we want to update
     *   }
     * })
     */
    upsert<T extends tbl_SubscriptionUpsertArgs>(args: SelectSubset<T, tbl_SubscriptionUpsertArgs<ExtArgs>>): Prisma__tbl_SubscriptionClient<$Result.GetResult<Prisma.$tbl_SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tbl_Subscriptions that matches the filter.
     * @param {tbl_SubscriptionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tbl_Subscription = await prisma.tbl_Subscription.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: tbl_SubscriptionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Tbl_Subscription.
     * @param {tbl_SubscriptionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tbl_Subscription = await prisma.tbl_Subscription.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: tbl_SubscriptionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tbl_Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SubscriptionCountArgs} args - Arguments to filter Tbl_Subscriptions to count.
     * @example
     * // Count the number of Tbl_Subscriptions
     * const count = await prisma.tbl_Subscription.count({
     *   where: {
     *     // ... the filter for the Tbl_Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends tbl_SubscriptionCountArgs>(
      args?: Subset<T, tbl_SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tbl_SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tbl_Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tbl_SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tbl_SubscriptionAggregateArgs>(args: Subset<T, Tbl_SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetTbl_SubscriptionAggregateType<T>>

    /**
     * Group by Tbl_Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tbl_SubscriptionGroupByArgs} args - Group by arguments.
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
      T extends tbl_SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tbl_SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: tbl_SubscriptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tbl_SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTbl_SubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tbl_Subscription model
   */
  readonly fields: tbl_SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tbl_Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tbl_SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the tbl_Subscription model
   */
  interface tbl_SubscriptionFieldRefs {
    readonly id: FieldRef<"tbl_Subscription", 'String'>
    readonly shopId: FieldRef<"tbl_Subscription", 'String'>
    readonly plan: FieldRef<"tbl_Subscription", 'String'>
    readonly status: FieldRef<"tbl_Subscription", 'String'>
    readonly shopifySubscriptionId: FieldRef<"tbl_Subscription", 'String'>
    readonly price: FieldRef<"tbl_Subscription", 'Float'>
    readonly currency: FieldRef<"tbl_Subscription", 'String'>
    readonly billingInterval: FieldRef<"tbl_Subscription", 'String'>
    readonly trialEndsAt: FieldRef<"tbl_Subscription", 'DateTime'>
    readonly billingCycleEndDate: FieldRef<"tbl_Subscription", 'DateTime'>
    readonly cancelledAt: FieldRef<"tbl_Subscription", 'DateTime'>
    readonly cancellationReason: FieldRef<"tbl_Subscription", 'String'>
    readonly createdAt: FieldRef<"tbl_Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"tbl_Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tbl_Subscription findUnique
   */
  export type tbl_SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Subscription to fetch.
     */
    where: tbl_SubscriptionWhereUniqueInput
  }

  /**
   * tbl_Subscription findUniqueOrThrow
   */
  export type tbl_SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Subscription to fetch.
     */
    where: tbl_SubscriptionWhereUniqueInput
  }

  /**
   * tbl_Subscription findFirst
   */
  export type tbl_SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Subscription to fetch.
     */
    where?: tbl_SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Subscriptions to fetch.
     */
    orderBy?: tbl_SubscriptionOrderByWithRelationInput | tbl_SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Subscriptions.
     */
    cursor?: tbl_SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Subscriptions.
     */
    distinct?: Tbl_SubscriptionScalarFieldEnum | Tbl_SubscriptionScalarFieldEnum[]
  }

  /**
   * tbl_Subscription findFirstOrThrow
   */
  export type tbl_SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Subscription to fetch.
     */
    where?: tbl_SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Subscriptions to fetch.
     */
    orderBy?: tbl_SubscriptionOrderByWithRelationInput | tbl_SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tbl_Subscriptions.
     */
    cursor?: tbl_SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tbl_Subscriptions.
     */
    distinct?: Tbl_SubscriptionScalarFieldEnum | Tbl_SubscriptionScalarFieldEnum[]
  }

  /**
   * tbl_Subscription findMany
   */
  export type tbl_SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which tbl_Subscriptions to fetch.
     */
    where?: tbl_SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tbl_Subscriptions to fetch.
     */
    orderBy?: tbl_SubscriptionOrderByWithRelationInput | tbl_SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tbl_Subscriptions.
     */
    cursor?: tbl_SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tbl_Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tbl_Subscriptions.
     */
    skip?: number
    distinct?: Tbl_SubscriptionScalarFieldEnum | Tbl_SubscriptionScalarFieldEnum[]
  }

  /**
   * tbl_Subscription create
   */
  export type tbl_SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to create a tbl_Subscription.
     */
    data: XOR<tbl_SubscriptionCreateInput, tbl_SubscriptionUncheckedCreateInput>
  }

  /**
   * tbl_Subscription createMany
   */
  export type tbl_SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tbl_Subscriptions.
     */
    data: tbl_SubscriptionCreateManyInput | tbl_SubscriptionCreateManyInput[]
  }

  /**
   * tbl_Subscription update
   */
  export type tbl_SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to update a tbl_Subscription.
     */
    data: XOR<tbl_SubscriptionUpdateInput, tbl_SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which tbl_Subscription to update.
     */
    where: tbl_SubscriptionWhereUniqueInput
  }

  /**
   * tbl_Subscription updateMany
   */
  export type tbl_SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tbl_Subscriptions.
     */
    data: XOR<tbl_SubscriptionUpdateManyMutationInput, tbl_SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which tbl_Subscriptions to update
     */
    where?: tbl_SubscriptionWhereInput
    /**
     * Limit how many tbl_Subscriptions to update.
     */
    limit?: number
  }

  /**
   * tbl_Subscription upsert
   */
  export type tbl_SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * The filter to search for the tbl_Subscription to update in case it exists.
     */
    where: tbl_SubscriptionWhereUniqueInput
    /**
     * In case the tbl_Subscription found by the `where` argument doesn't exist, create a new tbl_Subscription with this data.
     */
    create: XOR<tbl_SubscriptionCreateInput, tbl_SubscriptionUncheckedCreateInput>
    /**
     * In case the tbl_Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tbl_SubscriptionUpdateInput, tbl_SubscriptionUncheckedUpdateInput>
  }

  /**
   * tbl_Subscription delete
   */
  export type tbl_SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
    /**
     * Filter which tbl_Subscription to delete.
     */
    where: tbl_SubscriptionWhereUniqueInput
  }

  /**
   * tbl_Subscription deleteMany
   */
  export type tbl_SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tbl_Subscriptions to delete
     */
    where?: tbl_SubscriptionWhereInput
    /**
     * Limit how many tbl_Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * tbl_Subscription findRaw
   */
  export type tbl_SubscriptionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Subscription aggregateRaw
   */
  export type tbl_SubscriptionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * tbl_Subscription without action
   */
  export type tbl_SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tbl_Subscription
     */
    select?: tbl_SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tbl_Subscription
     */
    omit?: tbl_SubscriptionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const Tbl_SessionScalarFieldEnum: {
    pk: 'pk',
    id: 'id',
    shop: 'shop',
    state: 'state',
    isOnline: 'isOnline',
    scope: 'scope',
    expires: 'expires',
    accessToken: 'accessToken',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    accountOwner: 'accountOwner',
    locale: 'locale',
    collaborator: 'collaborator',
    emailVerified: 'emailVerified',
    refreshToken: 'refreshToken',
    refreshTokenExpires: 'refreshTokenExpires'
  };

  export type Tbl_SessionScalarFieldEnum = (typeof Tbl_SessionScalarFieldEnum)[keyof typeof Tbl_SessionScalarFieldEnum]


  export const Tbl_ShopScalarFieldEnum: {
    id: 'id',
    shopifyDomain: 'shopifyDomain',
    accessToken: 'accessToken',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Tbl_ShopScalarFieldEnum = (typeof Tbl_ShopScalarFieldEnum)[keyof typeof Tbl_ShopScalarFieldEnum]


  export const Tbl_UserScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    email: 'email',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Tbl_UserScalarFieldEnum = (typeof Tbl_UserScalarFieldEnum)[keyof typeof Tbl_UserScalarFieldEnum]


  export const Tbl_SettingsScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    dollarLimit: 'dollarLimit',
    itemLimit: 'itemLimit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Tbl_SettingsScalarFieldEnum = (typeof Tbl_SettingsScalarFieldEnum)[keyof typeof Tbl_SettingsScalarFieldEnum]


  export const Tbl_AuditSessionScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    locationId: 'locationId',
    staffId: 'staffId',
    approvedById: 'approvedById',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Tbl_AuditSessionScalarFieldEnum = (typeof Tbl_AuditSessionScalarFieldEnum)[keyof typeof Tbl_AuditSessionScalarFieldEnum]


  export const Tbl_AuditLineItemScalarFieldEnum: {
    id: 'id',
    auditSessionId: 'auditSessionId',
    productId: 'productId',
    variantId: 'variantId',
    barcode: 'barcode',
    title: 'title',
    unitCost: 'unitCost',
    expectedCount: 'expectedCount',
    actualCount: 'actualCount',
    variance: 'variance',
    reasonTag: 'reasonTag',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Tbl_AuditLineItemScalarFieldEnum = (typeof Tbl_AuditLineItemScalarFieldEnum)[keyof typeof Tbl_AuditLineItemScalarFieldEnum]


  export const Tbl_DiscrepancyReasonScalarFieldEnum: {
    id: 'id',
    code: 'code',
    label: 'label',
    description: 'description'
  };

  export type Tbl_DiscrepancyReasonScalarFieldEnum = (typeof Tbl_DiscrepancyReasonScalarFieldEnum)[keyof typeof Tbl_DiscrepancyReasonScalarFieldEnum]


  export const Tbl_AuditLogScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    auditSessionId: 'auditSessionId',
    totalItemsScanned: 'totalItemsScanned',
    totalNetVariance: 'totalNetVariance',
    totalDollarVariance: 'totalDollarVariance',
    syncedToShopify: 'syncedToShopify',
    completedAt: 'completedAt'
  };

  export type Tbl_AuditLogScalarFieldEnum = (typeof Tbl_AuditLogScalarFieldEnum)[keyof typeof Tbl_AuditLogScalarFieldEnum]


  export const Tbl_SubscriptionScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    plan: 'plan',
    status: 'status',
    shopifySubscriptionId: 'shopifySubscriptionId',
    price: 'price',
    currency: 'currency',
    billingInterval: 'billingInterval',
    trialEndsAt: 'trialEndsAt',
    billingCycleEndDate: 'billingCycleEndDate',
    cancelledAt: 'cancelledAt',
    cancellationReason: 'cancellationReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Tbl_SubscriptionScalarFieldEnum = (typeof Tbl_SubscriptionScalarFieldEnum)[keyof typeof Tbl_SubscriptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type tbl_SessionWhereInput = {
    AND?: tbl_SessionWhereInput | tbl_SessionWhereInput[]
    OR?: tbl_SessionWhereInput[]
    NOT?: tbl_SessionWhereInput | tbl_SessionWhereInput[]
    pk?: StringFilter<"tbl_Session"> | string
    id?: StringFilter<"tbl_Session"> | string
    shop?: StringFilter<"tbl_Session"> | string
    state?: StringFilter<"tbl_Session"> | string
    isOnline?: BoolFilter<"tbl_Session"> | boolean
    scope?: StringNullableFilter<"tbl_Session"> | string | null
    expires?: DateTimeNullableFilter<"tbl_Session"> | Date | string | null
    accessToken?: StringFilter<"tbl_Session"> | string
    userId?: BigIntNullableFilter<"tbl_Session"> | bigint | number | null
    firstName?: StringNullableFilter<"tbl_Session"> | string | null
    lastName?: StringNullableFilter<"tbl_Session"> | string | null
    email?: StringNullableFilter<"tbl_Session"> | string | null
    accountOwner?: BoolFilter<"tbl_Session"> | boolean
    locale?: StringNullableFilter<"tbl_Session"> | string | null
    collaborator?: BoolNullableFilter<"tbl_Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"tbl_Session"> | boolean | null
    refreshToken?: StringNullableFilter<"tbl_Session"> | string | null
    refreshTokenExpires?: DateTimeNullableFilter<"tbl_Session"> | Date | string | null
  }

  export type tbl_SessionOrderByWithRelationInput = {
    pk?: SortOrder
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
  }

  export type tbl_SessionWhereUniqueInput = Prisma.AtLeast<{
    pk?: string
    id?: string
    AND?: tbl_SessionWhereInput | tbl_SessionWhereInput[]
    OR?: tbl_SessionWhereInput[]
    NOT?: tbl_SessionWhereInput | tbl_SessionWhereInput[]
    shop?: StringFilter<"tbl_Session"> | string
    state?: StringFilter<"tbl_Session"> | string
    isOnline?: BoolFilter<"tbl_Session"> | boolean
    scope?: StringNullableFilter<"tbl_Session"> | string | null
    expires?: DateTimeNullableFilter<"tbl_Session"> | Date | string | null
    accessToken?: StringFilter<"tbl_Session"> | string
    userId?: BigIntNullableFilter<"tbl_Session"> | bigint | number | null
    firstName?: StringNullableFilter<"tbl_Session"> | string | null
    lastName?: StringNullableFilter<"tbl_Session"> | string | null
    email?: StringNullableFilter<"tbl_Session"> | string | null
    accountOwner?: BoolFilter<"tbl_Session"> | boolean
    locale?: StringNullableFilter<"tbl_Session"> | string | null
    collaborator?: BoolNullableFilter<"tbl_Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"tbl_Session"> | boolean | null
    refreshToken?: StringNullableFilter<"tbl_Session"> | string | null
    refreshTokenExpires?: DateTimeNullableFilter<"tbl_Session"> | Date | string | null
  }, "pk" | "id">

  export type tbl_SessionOrderByWithAggregationInput = {
    pk?: SortOrder
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
    _count?: tbl_SessionCountOrderByAggregateInput
    _avg?: tbl_SessionAvgOrderByAggregateInput
    _max?: tbl_SessionMaxOrderByAggregateInput
    _min?: tbl_SessionMinOrderByAggregateInput
    _sum?: tbl_SessionSumOrderByAggregateInput
  }

  export type tbl_SessionScalarWhereWithAggregatesInput = {
    AND?: tbl_SessionScalarWhereWithAggregatesInput | tbl_SessionScalarWhereWithAggregatesInput[]
    OR?: tbl_SessionScalarWhereWithAggregatesInput[]
    NOT?: tbl_SessionScalarWhereWithAggregatesInput | tbl_SessionScalarWhereWithAggregatesInput[]
    pk?: StringWithAggregatesFilter<"tbl_Session"> | string
    id?: StringWithAggregatesFilter<"tbl_Session"> | string
    shop?: StringWithAggregatesFilter<"tbl_Session"> | string
    state?: StringWithAggregatesFilter<"tbl_Session"> | string
    isOnline?: BoolWithAggregatesFilter<"tbl_Session"> | boolean
    scope?: StringNullableWithAggregatesFilter<"tbl_Session"> | string | null
    expires?: DateTimeNullableWithAggregatesFilter<"tbl_Session"> | Date | string | null
    accessToken?: StringWithAggregatesFilter<"tbl_Session"> | string
    userId?: BigIntNullableWithAggregatesFilter<"tbl_Session"> | bigint | number | null
    firstName?: StringNullableWithAggregatesFilter<"tbl_Session"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"tbl_Session"> | string | null
    email?: StringNullableWithAggregatesFilter<"tbl_Session"> | string | null
    accountOwner?: BoolWithAggregatesFilter<"tbl_Session"> | boolean
    locale?: StringNullableWithAggregatesFilter<"tbl_Session"> | string | null
    collaborator?: BoolNullableWithAggregatesFilter<"tbl_Session"> | boolean | null
    emailVerified?: BoolNullableWithAggregatesFilter<"tbl_Session"> | boolean | null
    refreshToken?: StringNullableWithAggregatesFilter<"tbl_Session"> | string | null
    refreshTokenExpires?: DateTimeNullableWithAggregatesFilter<"tbl_Session"> | Date | string | null
  }

  export type tbl_ShopWhereInput = {
    AND?: tbl_ShopWhereInput | tbl_ShopWhereInput[]
    OR?: tbl_ShopWhereInput[]
    NOT?: tbl_ShopWhereInput | tbl_ShopWhereInput[]
    id?: StringFilter<"tbl_Shop"> | string
    shopifyDomain?: StringFilter<"tbl_Shop"> | string
    accessToken?: StringFilter<"tbl_Shop"> | string
    isActive?: BoolFilter<"tbl_Shop"> | boolean
    createdAt?: DateTimeFilter<"tbl_Shop"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_Shop"> | Date | string
  }

  export type tbl_ShopOrderByWithRelationInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_ShopWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopifyDomain?: string
    AND?: tbl_ShopWhereInput | tbl_ShopWhereInput[]
    OR?: tbl_ShopWhereInput[]
    NOT?: tbl_ShopWhereInput | tbl_ShopWhereInput[]
    accessToken?: StringFilter<"tbl_Shop"> | string
    isActive?: BoolFilter<"tbl_Shop"> | boolean
    createdAt?: DateTimeFilter<"tbl_Shop"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_Shop"> | Date | string
  }, "id" | "shopifyDomain">

  export type tbl_ShopOrderByWithAggregationInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: tbl_ShopCountOrderByAggregateInput
    _max?: tbl_ShopMaxOrderByAggregateInput
    _min?: tbl_ShopMinOrderByAggregateInput
  }

  export type tbl_ShopScalarWhereWithAggregatesInput = {
    AND?: tbl_ShopScalarWhereWithAggregatesInput | tbl_ShopScalarWhereWithAggregatesInput[]
    OR?: tbl_ShopScalarWhereWithAggregatesInput[]
    NOT?: tbl_ShopScalarWhereWithAggregatesInput | tbl_ShopScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_Shop"> | string
    shopifyDomain?: StringWithAggregatesFilter<"tbl_Shop"> | string
    accessToken?: StringWithAggregatesFilter<"tbl_Shop"> | string
    isActive?: BoolWithAggregatesFilter<"tbl_Shop"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"tbl_Shop"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"tbl_Shop"> | Date | string
  }

  export type tbl_UserWhereInput = {
    AND?: tbl_UserWhereInput | tbl_UserWhereInput[]
    OR?: tbl_UserWhereInput[]
    NOT?: tbl_UserWhereInput | tbl_UserWhereInput[]
    id?: StringFilter<"tbl_User"> | string
    shopId?: StringFilter<"tbl_User"> | string
    email?: StringFilter<"tbl_User"> | string
    name?: StringFilter<"tbl_User"> | string
    role?: StringFilter<"tbl_User"> | string
    createdAt?: DateTimeFilter<"tbl_User"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_User"> | Date | string
  }

  export type tbl_UserOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: tbl_UserWhereInput | tbl_UserWhereInput[]
    OR?: tbl_UserWhereInput[]
    NOT?: tbl_UserWhereInput | tbl_UserWhereInput[]
    shopId?: StringFilter<"tbl_User"> | string
    name?: StringFilter<"tbl_User"> | string
    role?: StringFilter<"tbl_User"> | string
    createdAt?: DateTimeFilter<"tbl_User"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_User"> | Date | string
  }, "id" | "email">

  export type tbl_UserOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: tbl_UserCountOrderByAggregateInput
    _max?: tbl_UserMaxOrderByAggregateInput
    _min?: tbl_UserMinOrderByAggregateInput
  }

  export type tbl_UserScalarWhereWithAggregatesInput = {
    AND?: tbl_UserScalarWhereWithAggregatesInput | tbl_UserScalarWhereWithAggregatesInput[]
    OR?: tbl_UserScalarWhereWithAggregatesInput[]
    NOT?: tbl_UserScalarWhereWithAggregatesInput | tbl_UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_User"> | string
    shopId?: StringWithAggregatesFilter<"tbl_User"> | string
    email?: StringWithAggregatesFilter<"tbl_User"> | string
    name?: StringWithAggregatesFilter<"tbl_User"> | string
    role?: StringWithAggregatesFilter<"tbl_User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"tbl_User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"tbl_User"> | Date | string
  }

  export type tbl_SettingsWhereInput = {
    AND?: tbl_SettingsWhereInput | tbl_SettingsWhereInput[]
    OR?: tbl_SettingsWhereInput[]
    NOT?: tbl_SettingsWhereInput | tbl_SettingsWhereInput[]
    id?: StringFilter<"tbl_Settings"> | string
    shopId?: StringFilter<"tbl_Settings"> | string
    dollarLimit?: FloatFilter<"tbl_Settings"> | number
    itemLimit?: IntFilter<"tbl_Settings"> | number
    createdAt?: DateTimeFilter<"tbl_Settings"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_Settings"> | Date | string
  }

  export type tbl_SettingsOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    dollarLimit?: SortOrder
    itemLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopId?: string
    AND?: tbl_SettingsWhereInput | tbl_SettingsWhereInput[]
    OR?: tbl_SettingsWhereInput[]
    NOT?: tbl_SettingsWhereInput | tbl_SettingsWhereInput[]
    dollarLimit?: FloatFilter<"tbl_Settings"> | number
    itemLimit?: IntFilter<"tbl_Settings"> | number
    createdAt?: DateTimeFilter<"tbl_Settings"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_Settings"> | Date | string
  }, "id" | "shopId">

  export type tbl_SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    dollarLimit?: SortOrder
    itemLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: tbl_SettingsCountOrderByAggregateInput
    _avg?: tbl_SettingsAvgOrderByAggregateInput
    _max?: tbl_SettingsMaxOrderByAggregateInput
    _min?: tbl_SettingsMinOrderByAggregateInput
    _sum?: tbl_SettingsSumOrderByAggregateInput
  }

  export type tbl_SettingsScalarWhereWithAggregatesInput = {
    AND?: tbl_SettingsScalarWhereWithAggregatesInput | tbl_SettingsScalarWhereWithAggregatesInput[]
    OR?: tbl_SettingsScalarWhereWithAggregatesInput[]
    NOT?: tbl_SettingsScalarWhereWithAggregatesInput | tbl_SettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_Settings"> | string
    shopId?: StringWithAggregatesFilter<"tbl_Settings"> | string
    dollarLimit?: FloatWithAggregatesFilter<"tbl_Settings"> | number
    itemLimit?: IntWithAggregatesFilter<"tbl_Settings"> | number
    createdAt?: DateTimeWithAggregatesFilter<"tbl_Settings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"tbl_Settings"> | Date | string
  }

  export type tbl_AuditSessionWhereInput = {
    AND?: tbl_AuditSessionWhereInput | tbl_AuditSessionWhereInput[]
    OR?: tbl_AuditSessionWhereInput[]
    NOT?: tbl_AuditSessionWhereInput | tbl_AuditSessionWhereInput[]
    id?: StringFilter<"tbl_AuditSession"> | string
    shopId?: StringFilter<"tbl_AuditSession"> | string
    locationId?: StringFilter<"tbl_AuditSession"> | string
    staffId?: StringFilter<"tbl_AuditSession"> | string
    approvedById?: StringNullableFilter<"tbl_AuditSession"> | string | null
    status?: StringFilter<"tbl_AuditSession"> | string
    createdAt?: DateTimeFilter<"tbl_AuditSession"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_AuditSession"> | Date | string
  }

  export type tbl_AuditSessionOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    locationId?: SortOrder
    staffId?: SortOrder
    approvedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: tbl_AuditSessionWhereInput | tbl_AuditSessionWhereInput[]
    OR?: tbl_AuditSessionWhereInput[]
    NOT?: tbl_AuditSessionWhereInput | tbl_AuditSessionWhereInput[]
    shopId?: StringFilter<"tbl_AuditSession"> | string
    locationId?: StringFilter<"tbl_AuditSession"> | string
    staffId?: StringFilter<"tbl_AuditSession"> | string
    approvedById?: StringNullableFilter<"tbl_AuditSession"> | string | null
    status?: StringFilter<"tbl_AuditSession"> | string
    createdAt?: DateTimeFilter<"tbl_AuditSession"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_AuditSession"> | Date | string
  }, "id">

  export type tbl_AuditSessionOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    locationId?: SortOrder
    staffId?: SortOrder
    approvedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: tbl_AuditSessionCountOrderByAggregateInput
    _max?: tbl_AuditSessionMaxOrderByAggregateInput
    _min?: tbl_AuditSessionMinOrderByAggregateInput
  }

  export type tbl_AuditSessionScalarWhereWithAggregatesInput = {
    AND?: tbl_AuditSessionScalarWhereWithAggregatesInput | tbl_AuditSessionScalarWhereWithAggregatesInput[]
    OR?: tbl_AuditSessionScalarWhereWithAggregatesInput[]
    NOT?: tbl_AuditSessionScalarWhereWithAggregatesInput | tbl_AuditSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_AuditSession"> | string
    shopId?: StringWithAggregatesFilter<"tbl_AuditSession"> | string
    locationId?: StringWithAggregatesFilter<"tbl_AuditSession"> | string
    staffId?: StringWithAggregatesFilter<"tbl_AuditSession"> | string
    approvedById?: StringNullableWithAggregatesFilter<"tbl_AuditSession"> | string | null
    status?: StringWithAggregatesFilter<"tbl_AuditSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"tbl_AuditSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"tbl_AuditSession"> | Date | string
  }

  export type tbl_AuditLineItemWhereInput = {
    AND?: tbl_AuditLineItemWhereInput | tbl_AuditLineItemWhereInput[]
    OR?: tbl_AuditLineItemWhereInput[]
    NOT?: tbl_AuditLineItemWhereInput | tbl_AuditLineItemWhereInput[]
    id?: StringFilter<"tbl_AuditLineItem"> | string
    auditSessionId?: StringFilter<"tbl_AuditLineItem"> | string
    productId?: StringFilter<"tbl_AuditLineItem"> | string
    variantId?: StringFilter<"tbl_AuditLineItem"> | string
    barcode?: StringFilter<"tbl_AuditLineItem"> | string
    title?: StringFilter<"tbl_AuditLineItem"> | string
    unitCost?: FloatFilter<"tbl_AuditLineItem"> | number
    expectedCount?: IntFilter<"tbl_AuditLineItem"> | number
    actualCount?: IntFilter<"tbl_AuditLineItem"> | number
    variance?: IntFilter<"tbl_AuditLineItem"> | number
    reasonTag?: StringNullableFilter<"tbl_AuditLineItem"> | string | null
    note?: StringNullableFilter<"tbl_AuditLineItem"> | string | null
    createdAt?: DateTimeFilter<"tbl_AuditLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_AuditLineItem"> | Date | string
  }

  export type tbl_AuditLineItemOrderByWithRelationInput = {
    id?: SortOrder
    auditSessionId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    barcode?: SortOrder
    title?: SortOrder
    unitCost?: SortOrder
    expectedCount?: SortOrder
    actualCount?: SortOrder
    variance?: SortOrder
    reasonTag?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditLineItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: tbl_AuditLineItemWhereInput | tbl_AuditLineItemWhereInput[]
    OR?: tbl_AuditLineItemWhereInput[]
    NOT?: tbl_AuditLineItemWhereInput | tbl_AuditLineItemWhereInput[]
    auditSessionId?: StringFilter<"tbl_AuditLineItem"> | string
    productId?: StringFilter<"tbl_AuditLineItem"> | string
    variantId?: StringFilter<"tbl_AuditLineItem"> | string
    barcode?: StringFilter<"tbl_AuditLineItem"> | string
    title?: StringFilter<"tbl_AuditLineItem"> | string
    unitCost?: FloatFilter<"tbl_AuditLineItem"> | number
    expectedCount?: IntFilter<"tbl_AuditLineItem"> | number
    actualCount?: IntFilter<"tbl_AuditLineItem"> | number
    variance?: IntFilter<"tbl_AuditLineItem"> | number
    reasonTag?: StringNullableFilter<"tbl_AuditLineItem"> | string | null
    note?: StringNullableFilter<"tbl_AuditLineItem"> | string | null
    createdAt?: DateTimeFilter<"tbl_AuditLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_AuditLineItem"> | Date | string
  }, "id">

  export type tbl_AuditLineItemOrderByWithAggregationInput = {
    id?: SortOrder
    auditSessionId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    barcode?: SortOrder
    title?: SortOrder
    unitCost?: SortOrder
    expectedCount?: SortOrder
    actualCount?: SortOrder
    variance?: SortOrder
    reasonTag?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: tbl_AuditLineItemCountOrderByAggregateInput
    _avg?: tbl_AuditLineItemAvgOrderByAggregateInput
    _max?: tbl_AuditLineItemMaxOrderByAggregateInput
    _min?: tbl_AuditLineItemMinOrderByAggregateInput
    _sum?: tbl_AuditLineItemSumOrderByAggregateInput
  }

  export type tbl_AuditLineItemScalarWhereWithAggregatesInput = {
    AND?: tbl_AuditLineItemScalarWhereWithAggregatesInput | tbl_AuditLineItemScalarWhereWithAggregatesInput[]
    OR?: tbl_AuditLineItemScalarWhereWithAggregatesInput[]
    NOT?: tbl_AuditLineItemScalarWhereWithAggregatesInput | tbl_AuditLineItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_AuditLineItem"> | string
    auditSessionId?: StringWithAggregatesFilter<"tbl_AuditLineItem"> | string
    productId?: StringWithAggregatesFilter<"tbl_AuditLineItem"> | string
    variantId?: StringWithAggregatesFilter<"tbl_AuditLineItem"> | string
    barcode?: StringWithAggregatesFilter<"tbl_AuditLineItem"> | string
    title?: StringWithAggregatesFilter<"tbl_AuditLineItem"> | string
    unitCost?: FloatWithAggregatesFilter<"tbl_AuditLineItem"> | number
    expectedCount?: IntWithAggregatesFilter<"tbl_AuditLineItem"> | number
    actualCount?: IntWithAggregatesFilter<"tbl_AuditLineItem"> | number
    variance?: IntWithAggregatesFilter<"tbl_AuditLineItem"> | number
    reasonTag?: StringNullableWithAggregatesFilter<"tbl_AuditLineItem"> | string | null
    note?: StringNullableWithAggregatesFilter<"tbl_AuditLineItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"tbl_AuditLineItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"tbl_AuditLineItem"> | Date | string
  }

  export type tbl_DiscrepancyReasonWhereInput = {
    AND?: tbl_DiscrepancyReasonWhereInput | tbl_DiscrepancyReasonWhereInput[]
    OR?: tbl_DiscrepancyReasonWhereInput[]
    NOT?: tbl_DiscrepancyReasonWhereInput | tbl_DiscrepancyReasonWhereInput[]
    id?: StringFilter<"tbl_DiscrepancyReason"> | string
    code?: StringFilter<"tbl_DiscrepancyReason"> | string
    label?: StringFilter<"tbl_DiscrepancyReason"> | string
    description?: StringNullableFilter<"tbl_DiscrepancyReason"> | string | null
  }

  export type tbl_DiscrepancyReasonOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    label?: SortOrder
    description?: SortOrder
  }

  export type tbl_DiscrepancyReasonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: tbl_DiscrepancyReasonWhereInput | tbl_DiscrepancyReasonWhereInput[]
    OR?: tbl_DiscrepancyReasonWhereInput[]
    NOT?: tbl_DiscrepancyReasonWhereInput | tbl_DiscrepancyReasonWhereInput[]
    label?: StringFilter<"tbl_DiscrepancyReason"> | string
    description?: StringNullableFilter<"tbl_DiscrepancyReason"> | string | null
  }, "id" | "code">

  export type tbl_DiscrepancyReasonOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    label?: SortOrder
    description?: SortOrder
    _count?: tbl_DiscrepancyReasonCountOrderByAggregateInput
    _max?: tbl_DiscrepancyReasonMaxOrderByAggregateInput
    _min?: tbl_DiscrepancyReasonMinOrderByAggregateInput
  }

  export type tbl_DiscrepancyReasonScalarWhereWithAggregatesInput = {
    AND?: tbl_DiscrepancyReasonScalarWhereWithAggregatesInput | tbl_DiscrepancyReasonScalarWhereWithAggregatesInput[]
    OR?: tbl_DiscrepancyReasonScalarWhereWithAggregatesInput[]
    NOT?: tbl_DiscrepancyReasonScalarWhereWithAggregatesInput | tbl_DiscrepancyReasonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_DiscrepancyReason"> | string
    code?: StringWithAggregatesFilter<"tbl_DiscrepancyReason"> | string
    label?: StringWithAggregatesFilter<"tbl_DiscrepancyReason"> | string
    description?: StringNullableWithAggregatesFilter<"tbl_DiscrepancyReason"> | string | null
  }

  export type tbl_AuditLogWhereInput = {
    AND?: tbl_AuditLogWhereInput | tbl_AuditLogWhereInput[]
    OR?: tbl_AuditLogWhereInput[]
    NOT?: tbl_AuditLogWhereInput | tbl_AuditLogWhereInput[]
    id?: StringFilter<"tbl_AuditLog"> | string
    shopId?: StringFilter<"tbl_AuditLog"> | string
    auditSessionId?: StringFilter<"tbl_AuditLog"> | string
    totalItemsScanned?: IntFilter<"tbl_AuditLog"> | number
    totalNetVariance?: IntFilter<"tbl_AuditLog"> | number
    totalDollarVariance?: FloatFilter<"tbl_AuditLog"> | number
    syncedToShopify?: BoolFilter<"tbl_AuditLog"> | boolean
    completedAt?: DateTimeFilter<"tbl_AuditLog"> | Date | string
  }

  export type tbl_AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    auditSessionId?: SortOrder
    totalItemsScanned?: SortOrder
    totalNetVariance?: SortOrder
    totalDollarVariance?: SortOrder
    syncedToShopify?: SortOrder
    completedAt?: SortOrder
  }

  export type tbl_AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: tbl_AuditLogWhereInput | tbl_AuditLogWhereInput[]
    OR?: tbl_AuditLogWhereInput[]
    NOT?: tbl_AuditLogWhereInput | tbl_AuditLogWhereInput[]
    shopId?: StringFilter<"tbl_AuditLog"> | string
    auditSessionId?: StringFilter<"tbl_AuditLog"> | string
    totalItemsScanned?: IntFilter<"tbl_AuditLog"> | number
    totalNetVariance?: IntFilter<"tbl_AuditLog"> | number
    totalDollarVariance?: FloatFilter<"tbl_AuditLog"> | number
    syncedToShopify?: BoolFilter<"tbl_AuditLog"> | boolean
    completedAt?: DateTimeFilter<"tbl_AuditLog"> | Date | string
  }, "id">

  export type tbl_AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    auditSessionId?: SortOrder
    totalItemsScanned?: SortOrder
    totalNetVariance?: SortOrder
    totalDollarVariance?: SortOrder
    syncedToShopify?: SortOrder
    completedAt?: SortOrder
    _count?: tbl_AuditLogCountOrderByAggregateInput
    _avg?: tbl_AuditLogAvgOrderByAggregateInput
    _max?: tbl_AuditLogMaxOrderByAggregateInput
    _min?: tbl_AuditLogMinOrderByAggregateInput
    _sum?: tbl_AuditLogSumOrderByAggregateInput
  }

  export type tbl_AuditLogScalarWhereWithAggregatesInput = {
    AND?: tbl_AuditLogScalarWhereWithAggregatesInput | tbl_AuditLogScalarWhereWithAggregatesInput[]
    OR?: tbl_AuditLogScalarWhereWithAggregatesInput[]
    NOT?: tbl_AuditLogScalarWhereWithAggregatesInput | tbl_AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_AuditLog"> | string
    shopId?: StringWithAggregatesFilter<"tbl_AuditLog"> | string
    auditSessionId?: StringWithAggregatesFilter<"tbl_AuditLog"> | string
    totalItemsScanned?: IntWithAggregatesFilter<"tbl_AuditLog"> | number
    totalNetVariance?: IntWithAggregatesFilter<"tbl_AuditLog"> | number
    totalDollarVariance?: FloatWithAggregatesFilter<"tbl_AuditLog"> | number
    syncedToShopify?: BoolWithAggregatesFilter<"tbl_AuditLog"> | boolean
    completedAt?: DateTimeWithAggregatesFilter<"tbl_AuditLog"> | Date | string
  }

  export type tbl_SubscriptionWhereInput = {
    AND?: tbl_SubscriptionWhereInput | tbl_SubscriptionWhereInput[]
    OR?: tbl_SubscriptionWhereInput[]
    NOT?: tbl_SubscriptionWhereInput | tbl_SubscriptionWhereInput[]
    id?: StringFilter<"tbl_Subscription"> | string
    shopId?: StringFilter<"tbl_Subscription"> | string
    plan?: StringFilter<"tbl_Subscription"> | string
    status?: StringFilter<"tbl_Subscription"> | string
    shopifySubscriptionId?: StringNullableFilter<"tbl_Subscription"> | string | null
    price?: FloatFilter<"tbl_Subscription"> | number
    currency?: StringFilter<"tbl_Subscription"> | string
    billingInterval?: StringFilter<"tbl_Subscription"> | string
    trialEndsAt?: DateTimeNullableFilter<"tbl_Subscription"> | Date | string | null
    billingCycleEndDate?: DateTimeNullableFilter<"tbl_Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"tbl_Subscription"> | Date | string | null
    cancellationReason?: StringNullableFilter<"tbl_Subscription"> | string | null
    createdAt?: DateTimeFilter<"tbl_Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_Subscription"> | Date | string
  }

  export type tbl_SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    shopifySubscriptionId?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingInterval?: SortOrder
    trialEndsAt?: SortOrder
    billingCycleEndDate?: SortOrder
    cancelledAt?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopId?: string
    shopifySubscriptionId?: string
    AND?: tbl_SubscriptionWhereInput | tbl_SubscriptionWhereInput[]
    OR?: tbl_SubscriptionWhereInput[]
    NOT?: tbl_SubscriptionWhereInput | tbl_SubscriptionWhereInput[]
    plan?: StringFilter<"tbl_Subscription"> | string
    status?: StringFilter<"tbl_Subscription"> | string
    price?: FloatFilter<"tbl_Subscription"> | number
    currency?: StringFilter<"tbl_Subscription"> | string
    billingInterval?: StringFilter<"tbl_Subscription"> | string
    trialEndsAt?: DateTimeNullableFilter<"tbl_Subscription"> | Date | string | null
    billingCycleEndDate?: DateTimeNullableFilter<"tbl_Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"tbl_Subscription"> | Date | string | null
    cancellationReason?: StringNullableFilter<"tbl_Subscription"> | string | null
    createdAt?: DateTimeFilter<"tbl_Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"tbl_Subscription"> | Date | string
  }, "id" | "shopId" | "shopifySubscriptionId">

  export type tbl_SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    shopifySubscriptionId?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingInterval?: SortOrder
    trialEndsAt?: SortOrder
    billingCycleEndDate?: SortOrder
    cancelledAt?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: tbl_SubscriptionCountOrderByAggregateInput
    _avg?: tbl_SubscriptionAvgOrderByAggregateInput
    _max?: tbl_SubscriptionMaxOrderByAggregateInput
    _min?: tbl_SubscriptionMinOrderByAggregateInput
    _sum?: tbl_SubscriptionSumOrderByAggregateInput
  }

  export type tbl_SubscriptionScalarWhereWithAggregatesInput = {
    AND?: tbl_SubscriptionScalarWhereWithAggregatesInput | tbl_SubscriptionScalarWhereWithAggregatesInput[]
    OR?: tbl_SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: tbl_SubscriptionScalarWhereWithAggregatesInput | tbl_SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tbl_Subscription"> | string
    shopId?: StringWithAggregatesFilter<"tbl_Subscription"> | string
    plan?: StringWithAggregatesFilter<"tbl_Subscription"> | string
    status?: StringWithAggregatesFilter<"tbl_Subscription"> | string
    shopifySubscriptionId?: StringNullableWithAggregatesFilter<"tbl_Subscription"> | string | null
    price?: FloatWithAggregatesFilter<"tbl_Subscription"> | number
    currency?: StringWithAggregatesFilter<"tbl_Subscription"> | string
    billingInterval?: StringWithAggregatesFilter<"tbl_Subscription"> | string
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"tbl_Subscription"> | Date | string | null
    billingCycleEndDate?: DateTimeNullableWithAggregatesFilter<"tbl_Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"tbl_Subscription"> | Date | string | null
    cancellationReason?: StringNullableWithAggregatesFilter<"tbl_Subscription"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"tbl_Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"tbl_Subscription"> | Date | string
  }

  export type tbl_SessionCreateInput = {
    pk?: string
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    refreshToken?: string | null
    refreshTokenExpires?: Date | string | null
  }

  export type tbl_SessionUncheckedCreateInput = {
    pk?: string
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    refreshToken?: string | null
    refreshTokenExpires?: Date | string | null
  }

  export type tbl_SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tbl_SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tbl_SessionCreateManyInput = {
    pk?: string
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    refreshToken?: string | null
    refreshTokenExpires?: Date | string | null
  }

  export type tbl_SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tbl_SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tbl_ShopCreateInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_ShopUncheckedCreateInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_ShopUpdateInput = {
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_ShopUncheckedUpdateInput = {
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_ShopCreateManyInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_ShopUpdateManyMutationInput = {
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_ShopUncheckedUpdateManyInput = {
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_UserCreateInput = {
    id?: string
    shopId: string
    email: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_UserUncheckedCreateInput = {
    id?: string
    shopId: string
    email: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_UserUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_UserUncheckedUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_UserCreateManyInput = {
    id?: string
    shopId: string
    email: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_UserUpdateManyMutationInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_UserUncheckedUpdateManyInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SettingsCreateInput = {
    id?: string
    shopId: string
    dollarLimit?: number
    itemLimit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_SettingsUncheckedCreateInput = {
    id?: string
    shopId: string
    dollarLimit?: number
    itemLimit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_SettingsUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    dollarLimit?: FloatFieldUpdateOperationsInput | number
    itemLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SettingsUncheckedUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    dollarLimit?: FloatFieldUpdateOperationsInput | number
    itemLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SettingsCreateManyInput = {
    id?: string
    shopId: string
    dollarLimit?: number
    itemLimit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_SettingsUpdateManyMutationInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    dollarLimit?: FloatFieldUpdateOperationsInput | number
    itemLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SettingsUncheckedUpdateManyInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    dollarLimit?: FloatFieldUpdateOperationsInput | number
    itemLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditSessionCreateInput = {
    id?: string
    shopId: string
    locationId: string
    staffId: string
    approvedById?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_AuditSessionUncheckedCreateInput = {
    id?: string
    shopId: string
    locationId: string
    staffId: string
    approvedById?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_AuditSessionUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditSessionUncheckedUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditSessionCreateManyInput = {
    id?: string
    shopId: string
    locationId: string
    staffId: string
    approvedById?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_AuditSessionUpdateManyMutationInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditSessionUncheckedUpdateManyInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditLineItemCreateInput = {
    id?: string
    auditSessionId: string
    productId: string
    variantId: string
    barcode: string
    title: string
    unitCost?: number
    expectedCount?: number
    actualCount?: number
    variance?: number
    reasonTag?: string | null
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_AuditLineItemUncheckedCreateInput = {
    id?: string
    auditSessionId: string
    productId: string
    variantId: string
    barcode: string
    title: string
    unitCost?: number
    expectedCount?: number
    actualCount?: number
    variance?: number
    reasonTag?: string | null
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_AuditLineItemUpdateInput = {
    auditSessionId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    unitCost?: FloatFieldUpdateOperationsInput | number
    expectedCount?: IntFieldUpdateOperationsInput | number
    actualCount?: IntFieldUpdateOperationsInput | number
    variance?: IntFieldUpdateOperationsInput | number
    reasonTag?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditLineItemUncheckedUpdateInput = {
    auditSessionId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    unitCost?: FloatFieldUpdateOperationsInput | number
    expectedCount?: IntFieldUpdateOperationsInput | number
    actualCount?: IntFieldUpdateOperationsInput | number
    variance?: IntFieldUpdateOperationsInput | number
    reasonTag?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditLineItemCreateManyInput = {
    id?: string
    auditSessionId: string
    productId: string
    variantId: string
    barcode: string
    title: string
    unitCost?: number
    expectedCount?: number
    actualCount?: number
    variance?: number
    reasonTag?: string | null
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_AuditLineItemUpdateManyMutationInput = {
    auditSessionId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    unitCost?: FloatFieldUpdateOperationsInput | number
    expectedCount?: IntFieldUpdateOperationsInput | number
    actualCount?: IntFieldUpdateOperationsInput | number
    variance?: IntFieldUpdateOperationsInput | number
    reasonTag?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditLineItemUncheckedUpdateManyInput = {
    auditSessionId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    unitCost?: FloatFieldUpdateOperationsInput | number
    expectedCount?: IntFieldUpdateOperationsInput | number
    actualCount?: IntFieldUpdateOperationsInput | number
    variance?: IntFieldUpdateOperationsInput | number
    reasonTag?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_DiscrepancyReasonCreateInput = {
    id?: string
    code: string
    label: string
    description?: string | null
  }

  export type tbl_DiscrepancyReasonUncheckedCreateInput = {
    id?: string
    code: string
    label: string
    description?: string | null
  }

  export type tbl_DiscrepancyReasonUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tbl_DiscrepancyReasonUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tbl_DiscrepancyReasonCreateManyInput = {
    id?: string
    code: string
    label: string
    description?: string | null
  }

  export type tbl_DiscrepancyReasonUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tbl_DiscrepancyReasonUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tbl_AuditLogCreateInput = {
    id?: string
    shopId: string
    auditSessionId: string
    totalItemsScanned: number
    totalNetVariance: number
    totalDollarVariance: number
    syncedToShopify?: boolean
    completedAt?: Date | string
  }

  export type tbl_AuditLogUncheckedCreateInput = {
    id?: string
    shopId: string
    auditSessionId: string
    totalItemsScanned: number
    totalNetVariance: number
    totalDollarVariance: number
    syncedToShopify?: boolean
    completedAt?: Date | string
  }

  export type tbl_AuditLogUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    auditSessionId?: StringFieldUpdateOperationsInput | string
    totalItemsScanned?: IntFieldUpdateOperationsInput | number
    totalNetVariance?: IntFieldUpdateOperationsInput | number
    totalDollarVariance?: FloatFieldUpdateOperationsInput | number
    syncedToShopify?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditLogUncheckedUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    auditSessionId?: StringFieldUpdateOperationsInput | string
    totalItemsScanned?: IntFieldUpdateOperationsInput | number
    totalNetVariance?: IntFieldUpdateOperationsInput | number
    totalDollarVariance?: FloatFieldUpdateOperationsInput | number
    syncedToShopify?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditLogCreateManyInput = {
    id?: string
    shopId: string
    auditSessionId: string
    totalItemsScanned: number
    totalNetVariance: number
    totalDollarVariance: number
    syncedToShopify?: boolean
    completedAt?: Date | string
  }

  export type tbl_AuditLogUpdateManyMutationInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    auditSessionId?: StringFieldUpdateOperationsInput | string
    totalItemsScanned?: IntFieldUpdateOperationsInput | number
    totalNetVariance?: IntFieldUpdateOperationsInput | number
    totalDollarVariance?: FloatFieldUpdateOperationsInput | number
    syncedToShopify?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_AuditLogUncheckedUpdateManyInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    auditSessionId?: StringFieldUpdateOperationsInput | string
    totalItemsScanned?: IntFieldUpdateOperationsInput | number
    totalNetVariance?: IntFieldUpdateOperationsInput | number
    totalDollarVariance?: FloatFieldUpdateOperationsInput | number
    syncedToShopify?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SubscriptionCreateInput = {
    id?: string
    shopId: string
    plan?: string
    status?: string
    shopifySubscriptionId?: string | null
    price: number
    currency?: string
    billingInterval?: string
    trialEndsAt?: Date | string | null
    billingCycleEndDate?: Date | string | null
    cancelledAt?: Date | string | null
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_SubscriptionUncheckedCreateInput = {
    id?: string
    shopId: string
    plan?: string
    status?: string
    shopifySubscriptionId?: string | null
    price: number
    currency?: string
    billingInterval?: string
    trialEndsAt?: Date | string | null
    billingCycleEndDate?: Date | string | null
    cancelledAt?: Date | string | null
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_SubscriptionUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    shopifySubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    billingInterval?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycleEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SubscriptionUncheckedUpdateInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    shopifySubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    billingInterval?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycleEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SubscriptionCreateManyInput = {
    id?: string
    shopId: string
    plan?: string
    status?: string
    shopifySubscriptionId?: string | null
    price: number
    currency?: string
    billingInterval?: string
    trialEndsAt?: Date | string | null
    billingCycleEndDate?: Date | string | null
    cancelledAt?: Date | string | null
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type tbl_SubscriptionUpdateManyMutationInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    shopifySubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    billingInterval?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycleEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tbl_SubscriptionUncheckedUpdateManyInput = {
    shopId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    shopifySubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    billingInterval?: StringFieldUpdateOperationsInput | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycleEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
    isSet?: boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
    isSet?: boolean
  }

  export type tbl_SessionCountOrderByAggregateInput = {
    pk?: SortOrder
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
  }

  export type tbl_SessionAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type tbl_SessionMaxOrderByAggregateInput = {
    pk?: SortOrder
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
  }

  export type tbl_SessionMinOrderByAggregateInput = {
    pk?: SortOrder
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpires?: SortOrder
  }

  export type tbl_SessionSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type tbl_ShopCountOrderByAggregateInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_ShopMaxOrderByAggregateInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_ShopMinOrderByAggregateInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type tbl_UserCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_UserMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_UserMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type tbl_SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    dollarLimit?: SortOrder
    itemLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SettingsAvgOrderByAggregateInput = {
    dollarLimit?: SortOrder
    itemLimit?: SortOrder
  }

  export type tbl_SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    dollarLimit?: SortOrder
    itemLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    dollarLimit?: SortOrder
    itemLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SettingsSumOrderByAggregateInput = {
    dollarLimit?: SortOrder
    itemLimit?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type tbl_AuditSessionCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    locationId?: SortOrder
    staffId?: SortOrder
    approvedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    locationId?: SortOrder
    staffId?: SortOrder
    approvedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditSessionMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    locationId?: SortOrder
    staffId?: SortOrder
    approvedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditLineItemCountOrderByAggregateInput = {
    id?: SortOrder
    auditSessionId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    barcode?: SortOrder
    title?: SortOrder
    unitCost?: SortOrder
    expectedCount?: SortOrder
    actualCount?: SortOrder
    variance?: SortOrder
    reasonTag?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditLineItemAvgOrderByAggregateInput = {
    unitCost?: SortOrder
    expectedCount?: SortOrder
    actualCount?: SortOrder
    variance?: SortOrder
  }

  export type tbl_AuditLineItemMaxOrderByAggregateInput = {
    id?: SortOrder
    auditSessionId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    barcode?: SortOrder
    title?: SortOrder
    unitCost?: SortOrder
    expectedCount?: SortOrder
    actualCount?: SortOrder
    variance?: SortOrder
    reasonTag?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditLineItemMinOrderByAggregateInput = {
    id?: SortOrder
    auditSessionId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    barcode?: SortOrder
    title?: SortOrder
    unitCost?: SortOrder
    expectedCount?: SortOrder
    actualCount?: SortOrder
    variance?: SortOrder
    reasonTag?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_AuditLineItemSumOrderByAggregateInput = {
    unitCost?: SortOrder
    expectedCount?: SortOrder
    actualCount?: SortOrder
    variance?: SortOrder
  }

  export type tbl_DiscrepancyReasonCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    label?: SortOrder
    description?: SortOrder
  }

  export type tbl_DiscrepancyReasonMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    label?: SortOrder
    description?: SortOrder
  }

  export type tbl_DiscrepancyReasonMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    label?: SortOrder
    description?: SortOrder
  }

  export type tbl_AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    auditSessionId?: SortOrder
    totalItemsScanned?: SortOrder
    totalNetVariance?: SortOrder
    totalDollarVariance?: SortOrder
    syncedToShopify?: SortOrder
    completedAt?: SortOrder
  }

  export type tbl_AuditLogAvgOrderByAggregateInput = {
    totalItemsScanned?: SortOrder
    totalNetVariance?: SortOrder
    totalDollarVariance?: SortOrder
  }

  export type tbl_AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    auditSessionId?: SortOrder
    totalItemsScanned?: SortOrder
    totalNetVariance?: SortOrder
    totalDollarVariance?: SortOrder
    syncedToShopify?: SortOrder
    completedAt?: SortOrder
  }

  export type tbl_AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    auditSessionId?: SortOrder
    totalItemsScanned?: SortOrder
    totalNetVariance?: SortOrder
    totalDollarVariance?: SortOrder
    syncedToShopify?: SortOrder
    completedAt?: SortOrder
  }

  export type tbl_AuditLogSumOrderByAggregateInput = {
    totalItemsScanned?: SortOrder
    totalNetVariance?: SortOrder
    totalDollarVariance?: SortOrder
  }

  export type tbl_SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    shopifySubscriptionId?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingInterval?: SortOrder
    trialEndsAt?: SortOrder
    billingCycleEndDate?: SortOrder
    cancelledAt?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SubscriptionAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type tbl_SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    shopifySubscriptionId?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingInterval?: SortOrder
    trialEndsAt?: SortOrder
    billingCycleEndDate?: SortOrder
    cancelledAt?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    shopifySubscriptionId?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingInterval?: SortOrder
    trialEndsAt?: SortOrder
    billingCycleEndDate?: SortOrder
    cancelledAt?: SortOrder
    cancellationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type tbl_SubscriptionSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
    unset?: boolean
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
    isSet?: boolean
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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