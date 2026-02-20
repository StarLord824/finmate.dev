
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
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model Source
 * 
 */
export type Source = $Result.DefaultSelection<Prisma.$SourcePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model ArenaAgent
 * 
 */
export type ArenaAgent = $Result.DefaultSelection<Prisma.$ArenaAgentPayload>
/**
 * Model ArenaSimulation
 * 
 */
export type ArenaSimulation = $Result.DefaultSelection<Prisma.$ArenaSimulationPayload>
/**
 * Model ArenaParticipation
 * 
 */
export type ArenaParticipation = $Result.DefaultSelection<Prisma.$ArenaParticipationPayload>
/**
 * Model ArenaTrade
 * 
 */
export type ArenaTrade = $Result.DefaultSelection<Prisma.$ArenaTradePayload>
/**
 * Model ArenaSnapshot
 * 
 */
export type ArenaSnapshot = $Result.DefaultSelection<Prisma.$ArenaSnapshotPayload>
/**
 * Model ArenaLeaderboard
 * 
 */
export type ArenaLeaderboard = $Result.DefaultSelection<Prisma.$ArenaLeaderboardPayload>
/**
 * Model MarketDataCache
 * 
 */
export type MarketDataCache = $Result.DefaultSelection<Prisma.$MarketDataCachePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Articles
 * const articles = await prisma.article.findMany()
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
   * // Fetch zero or more Articles
   * const articles = await prisma.article.findMany()
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
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.source`: Exposes CRUD operations for the **Source** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sources
    * const sources = await prisma.source.findMany()
    * ```
    */
  get source(): Prisma.SourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arenaAgent`: Exposes CRUD operations for the **ArenaAgent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArenaAgents
    * const arenaAgents = await prisma.arenaAgent.findMany()
    * ```
    */
  get arenaAgent(): Prisma.ArenaAgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arenaSimulation`: Exposes CRUD operations for the **ArenaSimulation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArenaSimulations
    * const arenaSimulations = await prisma.arenaSimulation.findMany()
    * ```
    */
  get arenaSimulation(): Prisma.ArenaSimulationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arenaParticipation`: Exposes CRUD operations for the **ArenaParticipation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArenaParticipations
    * const arenaParticipations = await prisma.arenaParticipation.findMany()
    * ```
    */
  get arenaParticipation(): Prisma.ArenaParticipationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arenaTrade`: Exposes CRUD operations for the **ArenaTrade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArenaTrades
    * const arenaTrades = await prisma.arenaTrade.findMany()
    * ```
    */
  get arenaTrade(): Prisma.ArenaTradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arenaSnapshot`: Exposes CRUD operations for the **ArenaSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArenaSnapshots
    * const arenaSnapshots = await prisma.arenaSnapshot.findMany()
    * ```
    */
  get arenaSnapshot(): Prisma.ArenaSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arenaLeaderboard`: Exposes CRUD operations for the **ArenaLeaderboard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArenaLeaderboards
    * const arenaLeaderboards = await prisma.arenaLeaderboard.findMany()
    * ```
    */
  get arenaLeaderboard(): Prisma.ArenaLeaderboardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marketDataCache`: Exposes CRUD operations for the **MarketDataCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarketDataCaches
    * const marketDataCaches = await prisma.marketDataCache.findMany()
    * ```
    */
  get marketDataCache(): Prisma.MarketDataCacheDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.16.1
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
    Article: 'Article',
    Source: 'Source',
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    ArenaAgent: 'ArenaAgent',
    ArenaSimulation: 'ArenaSimulation',
    ArenaParticipation: 'ArenaParticipation',
    ArenaTrade: 'ArenaTrade',
    ArenaSnapshot: 'ArenaSnapshot',
    ArenaLeaderboard: 'ArenaLeaderboard',
    MarketDataCache: 'MarketDataCache'
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
      modelProps: "article" | "source" | "user" | "session" | "account" | "verification" | "arenaAgent" | "arenaSimulation" | "arenaParticipation" | "arenaTrade" | "arenaSnapshot" | "arenaLeaderboard" | "marketDataCache"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      Source: {
        payload: Prisma.$SourcePayload<ExtArgs>
        fields: Prisma.SourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findFirst: {
            args: Prisma.SourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findMany: {
            args: Prisma.SourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          create: {
            args: Prisma.SourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          createMany: {
            args: Prisma.SourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          delete: {
            args: Prisma.SourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          update: {
            args: Prisma.SourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          deleteMany: {
            args: Prisma.SourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          upsert: {
            args: Prisma.SourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          aggregate: {
            args: Prisma.SourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSource>
          }
          groupBy: {
            args: Prisma.SourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SourceCountArgs<ExtArgs>
            result: $Utils.Optional<SourceCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      ArenaAgent: {
        payload: Prisma.$ArenaAgentPayload<ExtArgs>
        fields: Prisma.ArenaAgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArenaAgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArenaAgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>
          }
          findFirst: {
            args: Prisma.ArenaAgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArenaAgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>
          }
          findMany: {
            args: Prisma.ArenaAgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>[]
          }
          create: {
            args: Prisma.ArenaAgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>
          }
          createMany: {
            args: Prisma.ArenaAgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArenaAgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>[]
          }
          delete: {
            args: Prisma.ArenaAgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>
          }
          update: {
            args: Prisma.ArenaAgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>
          }
          deleteMany: {
            args: Prisma.ArenaAgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArenaAgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArenaAgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>[]
          }
          upsert: {
            args: Prisma.ArenaAgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaAgentPayload>
          }
          aggregate: {
            args: Prisma.ArenaAgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArenaAgent>
          }
          groupBy: {
            args: Prisma.ArenaAgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArenaAgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArenaAgentCountArgs<ExtArgs>
            result: $Utils.Optional<ArenaAgentCountAggregateOutputType> | number
          }
        }
      }
      ArenaSimulation: {
        payload: Prisma.$ArenaSimulationPayload<ExtArgs>
        fields: Prisma.ArenaSimulationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArenaSimulationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArenaSimulationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>
          }
          findFirst: {
            args: Prisma.ArenaSimulationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArenaSimulationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>
          }
          findMany: {
            args: Prisma.ArenaSimulationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>[]
          }
          create: {
            args: Prisma.ArenaSimulationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>
          }
          createMany: {
            args: Prisma.ArenaSimulationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArenaSimulationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>[]
          }
          delete: {
            args: Prisma.ArenaSimulationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>
          }
          update: {
            args: Prisma.ArenaSimulationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>
          }
          deleteMany: {
            args: Prisma.ArenaSimulationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArenaSimulationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArenaSimulationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>[]
          }
          upsert: {
            args: Prisma.ArenaSimulationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSimulationPayload>
          }
          aggregate: {
            args: Prisma.ArenaSimulationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArenaSimulation>
          }
          groupBy: {
            args: Prisma.ArenaSimulationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArenaSimulationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArenaSimulationCountArgs<ExtArgs>
            result: $Utils.Optional<ArenaSimulationCountAggregateOutputType> | number
          }
        }
      }
      ArenaParticipation: {
        payload: Prisma.$ArenaParticipationPayload<ExtArgs>
        fields: Prisma.ArenaParticipationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArenaParticipationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArenaParticipationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>
          }
          findFirst: {
            args: Prisma.ArenaParticipationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArenaParticipationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>
          }
          findMany: {
            args: Prisma.ArenaParticipationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>[]
          }
          create: {
            args: Prisma.ArenaParticipationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>
          }
          createMany: {
            args: Prisma.ArenaParticipationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArenaParticipationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>[]
          }
          delete: {
            args: Prisma.ArenaParticipationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>
          }
          update: {
            args: Prisma.ArenaParticipationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>
          }
          deleteMany: {
            args: Prisma.ArenaParticipationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArenaParticipationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArenaParticipationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>[]
          }
          upsert: {
            args: Prisma.ArenaParticipationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaParticipationPayload>
          }
          aggregate: {
            args: Prisma.ArenaParticipationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArenaParticipation>
          }
          groupBy: {
            args: Prisma.ArenaParticipationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArenaParticipationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArenaParticipationCountArgs<ExtArgs>
            result: $Utils.Optional<ArenaParticipationCountAggregateOutputType> | number
          }
        }
      }
      ArenaTrade: {
        payload: Prisma.$ArenaTradePayload<ExtArgs>
        fields: Prisma.ArenaTradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArenaTradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArenaTradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>
          }
          findFirst: {
            args: Prisma.ArenaTradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArenaTradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>
          }
          findMany: {
            args: Prisma.ArenaTradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>[]
          }
          create: {
            args: Prisma.ArenaTradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>
          }
          createMany: {
            args: Prisma.ArenaTradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArenaTradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>[]
          }
          delete: {
            args: Prisma.ArenaTradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>
          }
          update: {
            args: Prisma.ArenaTradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>
          }
          deleteMany: {
            args: Prisma.ArenaTradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArenaTradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArenaTradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>[]
          }
          upsert: {
            args: Prisma.ArenaTradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaTradePayload>
          }
          aggregate: {
            args: Prisma.ArenaTradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArenaTrade>
          }
          groupBy: {
            args: Prisma.ArenaTradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArenaTradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArenaTradeCountArgs<ExtArgs>
            result: $Utils.Optional<ArenaTradeCountAggregateOutputType> | number
          }
        }
      }
      ArenaSnapshot: {
        payload: Prisma.$ArenaSnapshotPayload<ExtArgs>
        fields: Prisma.ArenaSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArenaSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArenaSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>
          }
          findFirst: {
            args: Prisma.ArenaSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArenaSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>
          }
          findMany: {
            args: Prisma.ArenaSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>[]
          }
          create: {
            args: Prisma.ArenaSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>
          }
          createMany: {
            args: Prisma.ArenaSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArenaSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>[]
          }
          delete: {
            args: Prisma.ArenaSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>
          }
          update: {
            args: Prisma.ArenaSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.ArenaSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArenaSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArenaSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.ArenaSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaSnapshotPayload>
          }
          aggregate: {
            args: Prisma.ArenaSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArenaSnapshot>
          }
          groupBy: {
            args: Prisma.ArenaSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArenaSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArenaSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<ArenaSnapshotCountAggregateOutputType> | number
          }
        }
      }
      ArenaLeaderboard: {
        payload: Prisma.$ArenaLeaderboardPayload<ExtArgs>
        fields: Prisma.ArenaLeaderboardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArenaLeaderboardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArenaLeaderboardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>
          }
          findFirst: {
            args: Prisma.ArenaLeaderboardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArenaLeaderboardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>
          }
          findMany: {
            args: Prisma.ArenaLeaderboardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>[]
          }
          create: {
            args: Prisma.ArenaLeaderboardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>
          }
          createMany: {
            args: Prisma.ArenaLeaderboardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArenaLeaderboardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>[]
          }
          delete: {
            args: Prisma.ArenaLeaderboardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>
          }
          update: {
            args: Prisma.ArenaLeaderboardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>
          }
          deleteMany: {
            args: Prisma.ArenaLeaderboardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArenaLeaderboardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArenaLeaderboardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>[]
          }
          upsert: {
            args: Prisma.ArenaLeaderboardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArenaLeaderboardPayload>
          }
          aggregate: {
            args: Prisma.ArenaLeaderboardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArenaLeaderboard>
          }
          groupBy: {
            args: Prisma.ArenaLeaderboardGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArenaLeaderboardGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArenaLeaderboardCountArgs<ExtArgs>
            result: $Utils.Optional<ArenaLeaderboardCountAggregateOutputType> | number
          }
        }
      }
      MarketDataCache: {
        payload: Prisma.$MarketDataCachePayload<ExtArgs>
        fields: Prisma.MarketDataCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketDataCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketDataCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>
          }
          findFirst: {
            args: Prisma.MarketDataCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketDataCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>
          }
          findMany: {
            args: Prisma.MarketDataCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>[]
          }
          create: {
            args: Prisma.MarketDataCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>
          }
          createMany: {
            args: Prisma.MarketDataCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketDataCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>[]
          }
          delete: {
            args: Prisma.MarketDataCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>
          }
          update: {
            args: Prisma.MarketDataCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>
          }
          deleteMany: {
            args: Prisma.MarketDataCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketDataCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketDataCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>[]
          }
          upsert: {
            args: Prisma.MarketDataCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketDataCachePayload>
          }
          aggregate: {
            args: Prisma.MarketDataCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarketDataCache>
          }
          groupBy: {
            args: Prisma.MarketDataCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketDataCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketDataCacheCountArgs<ExtArgs>
            result: $Utils.Optional<MarketDataCacheCountAggregateOutputType> | number
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
    article?: ArticleOmit
    source?: SourceOmit
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    arenaAgent?: ArenaAgentOmit
    arenaSimulation?: ArenaSimulationOmit
    arenaParticipation?: ArenaParticipationOmit
    arenaTrade?: ArenaTradeOmit
    arenaSnapshot?: ArenaSnapshotOmit
    arenaLeaderboard?: ArenaLeaderboardOmit
    marketDataCache?: MarketDataCacheOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type ArenaAgentCountOutputType
   */

  export type ArenaAgentCountOutputType = {
    participations: number
  }

  export type ArenaAgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participations?: boolean | ArenaAgentCountOutputTypeCountParticipationsArgs
  }

  // Custom InputTypes
  /**
   * ArenaAgentCountOutputType without action
   */
  export type ArenaAgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgentCountOutputType
     */
    select?: ArenaAgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArenaAgentCountOutputType without action
   */
  export type ArenaAgentCountOutputTypeCountParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaParticipationWhereInput
  }


  /**
   * Count Type ArenaSimulationCountOutputType
   */

  export type ArenaSimulationCountOutputType = {
    participants: number
    trades: number
    snapshots: number
  }

  export type ArenaSimulationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | ArenaSimulationCountOutputTypeCountParticipantsArgs
    trades?: boolean | ArenaSimulationCountOutputTypeCountTradesArgs
    snapshots?: boolean | ArenaSimulationCountOutputTypeCountSnapshotsArgs
  }

  // Custom InputTypes
  /**
   * ArenaSimulationCountOutputType without action
   */
  export type ArenaSimulationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulationCountOutputType
     */
    select?: ArenaSimulationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArenaSimulationCountOutputType without action
   */
  export type ArenaSimulationCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaParticipationWhereInput
  }

  /**
   * ArenaSimulationCountOutputType without action
   */
  export type ArenaSimulationCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaTradeWhereInput
  }

  /**
   * ArenaSimulationCountOutputType without action
   */
  export type ArenaSimulationCountOutputTypeCountSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaSnapshotWhereInput
  }


  /**
   * Count Type ArenaParticipationCountOutputType
   */

  export type ArenaParticipationCountOutputType = {
    trades: number
  }

  export type ArenaParticipationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | ArenaParticipationCountOutputTypeCountTradesArgs
  }

  // Custom InputTypes
  /**
   * ArenaParticipationCountOutputType without action
   */
  export type ArenaParticipationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipationCountOutputType
     */
    select?: ArenaParticipationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArenaParticipationCountOutputType without action
   */
  export type ArenaParticipationCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaTradeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    link: string | null
    source: string | null
    author: string | null
    publishedAt: Date | null
    ingestedAt: Date | null
    summary: string | null
    content: string | null
    imageUrl: string | null
    fingerprint: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    link: string | null
    source: string | null
    author: string | null
    publishedAt: Date | null
    ingestedAt: Date | null
    summary: string | null
    content: string | null
    imageUrl: string | null
    fingerprint: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    link: number
    source: number
    author: number
    publishedAt: number
    ingestedAt: number
    summary: number
    content: number
    imageUrl: number
    fingerprint: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    link?: true
    source?: true
    author?: true
    publishedAt?: true
    ingestedAt?: true
    summary?: true
    content?: true
    imageUrl?: true
    fingerprint?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    link?: true
    source?: true
    author?: true
    publishedAt?: true
    ingestedAt?: true
    summary?: true
    content?: true
    imageUrl?: true
    fingerprint?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    link?: true
    source?: true
    author?: true
    publishedAt?: true
    ingestedAt?: true
    summary?: true
    content?: true
    imageUrl?: true
    fingerprint?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    link: string
    source: string
    author: string | null
    publishedAt: Date
    ingestedAt: Date
    summary: string | null
    content: string | null
    imageUrl: string | null
    fingerprint: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    link?: boolean
    source?: boolean
    author?: boolean
    publishedAt?: boolean
    ingestedAt?: boolean
    summary?: boolean
    content?: boolean
    imageUrl?: boolean
    fingerprint?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    link?: boolean
    source?: boolean
    author?: boolean
    publishedAt?: boolean
    ingestedAt?: boolean
    summary?: boolean
    content?: boolean
    imageUrl?: boolean
    fingerprint?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    link?: boolean
    source?: boolean
    author?: boolean
    publishedAt?: boolean
    ingestedAt?: boolean
    summary?: boolean
    content?: boolean
    imageUrl?: boolean
    fingerprint?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    link?: boolean
    source?: boolean
    author?: boolean
    publishedAt?: boolean
    ingestedAt?: boolean
    summary?: boolean
    content?: boolean
    imageUrl?: boolean
    fingerprint?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "link" | "source" | "author" | "publishedAt" | "ingestedAt" | "summary" | "content" | "imageUrl" | "fingerprint" | "tags" | "createdAt" | "updatedAt", ExtArgs["result"]["article"]>

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      link: string
      source: string
      author: string | null
      publishedAt: Date
      ingestedAt: Date
      summary: string | null
      content: string | null
      imageUrl: string | null
      fingerprint: string
      tags: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles and returns the data updated in the database.
     * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
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
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly link: FieldRef<"Article", 'String'>
    readonly source: FieldRef<"Article", 'String'>
    readonly author: FieldRef<"Article", 'String'>
    readonly publishedAt: FieldRef<"Article", 'DateTime'>
    readonly ingestedAt: FieldRef<"Article", 'DateTime'>
    readonly summary: FieldRef<"Article", 'String'>
    readonly content: FieldRef<"Article", 'String'>
    readonly imageUrl: FieldRef<"Article", 'String'>
    readonly fingerprint: FieldRef<"Article", 'String'>
    readonly tags: FieldRef<"Article", 'String[]'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly updatedAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article updateManyAndReturn
   */
  export type ArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
  }


  /**
   * Model Source
   */

  export type AggregateSource = {
    _count: SourceCountAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  export type SourceMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    type: string | null
    active: boolean | null
    schedule: string | null
    createdAt: Date | null
  }

  export type SourceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    type: string | null
    active: boolean | null
    schedule: string | null
    createdAt: Date | null
  }

  export type SourceCountAggregateOutputType = {
    id: number
    name: number
    url: number
    type: number
    tags: number
    active: number
    schedule: number
    createdAt: number
    _all: number
  }


  export type SourceMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    active?: true
    schedule?: true
    createdAt?: true
  }

  export type SourceMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    active?: true
    schedule?: true
    createdAt?: true
  }

  export type SourceCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    tags?: true
    active?: true
    schedule?: true
    createdAt?: true
    _all?: true
  }

  export type SourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Source to aggregate.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sources
    **/
    _count?: true | SourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourceMaxAggregateInputType
  }

  export type GetSourceAggregateType<T extends SourceAggregateArgs> = {
        [P in keyof T & keyof AggregateSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSource[P]>
      : GetScalarType<T[P], AggregateSource[P]>
  }




  export type SourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceWhereInput
    orderBy?: SourceOrderByWithAggregationInput | SourceOrderByWithAggregationInput[]
    by: SourceScalarFieldEnum[] | SourceScalarFieldEnum
    having?: SourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourceCountAggregateInputType | true
    _min?: SourceMinAggregateInputType
    _max?: SourceMaxAggregateInputType
  }

  export type SourceGroupByOutputType = {
    id: string
    name: string
    url: string
    type: string
    tags: string[]
    active: boolean
    schedule: string | null
    createdAt: Date
    _count: SourceCountAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  type GetSourceGroupByPayload<T extends SourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourceGroupByOutputType[P]>
            : GetScalarType<T[P], SourceGroupByOutputType[P]>
        }
      >
    >


  export type SourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    tags?: boolean
    active?: boolean
    schedule?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    tags?: boolean
    active?: boolean
    schedule?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    tags?: boolean
    active?: boolean
    schedule?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    tags?: boolean
    active?: boolean
    schedule?: boolean
    createdAt?: boolean
  }

  export type SourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "type" | "tags" | "active" | "schedule" | "createdAt", ExtArgs["result"]["source"]>

  export type $SourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Source"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string
      type: string
      tags: string[]
      active: boolean
      schedule: string | null
      createdAt: Date
    }, ExtArgs["result"]["source"]>
    composites: {}
  }

  type SourceGetPayload<S extends boolean | null | undefined | SourceDefaultArgs> = $Result.GetResult<Prisma.$SourcePayload, S>

  type SourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SourceCountAggregateInputType | true
    }

  export interface SourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Source'], meta: { name: 'Source' } }
    /**
     * Find zero or one Source that matches the filter.
     * @param {SourceFindUniqueArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SourceFindUniqueArgs>(args: SelectSubset<T, SourceFindUniqueArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Source that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SourceFindUniqueOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SourceFindUniqueOrThrowArgs>(args: SelectSubset<T, SourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SourceFindFirstArgs>(args?: SelectSubset<T, SourceFindFirstArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SourceFindFirstOrThrowArgs>(args?: SelectSubset<T, SourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sources
     * const sources = await prisma.source.findMany()
     * 
     * // Get first 10 Sources
     * const sources = await prisma.source.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourceWithIdOnly = await prisma.source.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SourceFindManyArgs>(args?: SelectSubset<T, SourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Source.
     * @param {SourceCreateArgs} args - Arguments to create a Source.
     * @example
     * // Create one Source
     * const Source = await prisma.source.create({
     *   data: {
     *     // ... data to create a Source
     *   }
     * })
     * 
     */
    create<T extends SourceCreateArgs>(args: SelectSubset<T, SourceCreateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sources.
     * @param {SourceCreateManyArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SourceCreateManyArgs>(args?: SelectSubset<T, SourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sources and returns the data saved in the database.
     * @param {SourceCreateManyAndReturnArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SourceCreateManyAndReturnArgs>(args?: SelectSubset<T, SourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Source.
     * @param {SourceDeleteArgs} args - Arguments to delete one Source.
     * @example
     * // Delete one Source
     * const Source = await prisma.source.delete({
     *   where: {
     *     // ... filter to delete one Source
     *   }
     * })
     * 
     */
    delete<T extends SourceDeleteArgs>(args: SelectSubset<T, SourceDeleteArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Source.
     * @param {SourceUpdateArgs} args - Arguments to update one Source.
     * @example
     * // Update one Source
     * const source = await prisma.source.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SourceUpdateArgs>(args: SelectSubset<T, SourceUpdateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sources.
     * @param {SourceDeleteManyArgs} args - Arguments to filter Sources to delete.
     * @example
     * // Delete a few Sources
     * const { count } = await prisma.source.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SourceDeleteManyArgs>(args?: SelectSubset<T, SourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SourceUpdateManyArgs>(args: SelectSubset<T, SourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources and returns the data updated in the database.
     * @param {SourceUpdateManyAndReturnArgs} args - Arguments to update many Sources.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SourceUpdateManyAndReturnArgs>(args: SelectSubset<T, SourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Source.
     * @param {SourceUpsertArgs} args - Arguments to update or create a Source.
     * @example
     * // Update or create a Source
     * const source = await prisma.source.upsert({
     *   create: {
     *     // ... data to create a Source
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Source we want to update
     *   }
     * })
     */
    upsert<T extends SourceUpsertArgs>(args: SelectSubset<T, SourceUpsertArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCountArgs} args - Arguments to filter Sources to count.
     * @example
     * // Count the number of Sources
     * const count = await prisma.source.count({
     *   where: {
     *     // ... the filter for the Sources we want to count
     *   }
     * })
    **/
    count<T extends SourceCountArgs>(
      args?: Subset<T, SourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SourceAggregateArgs>(args: Subset<T, SourceAggregateArgs>): Prisma.PrismaPromise<GetSourceAggregateType<T>>

    /**
     * Group by Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceGroupByArgs} args - Group by arguments.
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
      T extends SourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SourceGroupByArgs['orderBy'] }
        : { orderBy?: SourceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Source model
   */
  readonly fields: SourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Source.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Source model
   */
  interface SourceFieldRefs {
    readonly id: FieldRef<"Source", 'String'>
    readonly name: FieldRef<"Source", 'String'>
    readonly url: FieldRef<"Source", 'String'>
    readonly type: FieldRef<"Source", 'String'>
    readonly tags: FieldRef<"Source", 'String[]'>
    readonly active: FieldRef<"Source", 'Boolean'>
    readonly schedule: FieldRef<"Source", 'String'>
    readonly createdAt: FieldRef<"Source", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Source findUnique
   */
  export type SourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findUniqueOrThrow
   */
  export type SourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findFirst
   */
  export type SourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findFirstOrThrow
   */
  export type SourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findMany
   */
  export type SourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Filter, which Sources to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source create
   */
  export type SourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data needed to create a Source.
     */
    data: XOR<SourceCreateInput, SourceUncheckedCreateInput>
  }

  /**
   * Source createMany
   */
  export type SourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Source createManyAndReturn
   */
  export type SourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Source update
   */
  export type SourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data needed to update a Source.
     */
    data: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
    /**
     * Choose, which Source to update.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source updateMany
   */
  export type SourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
  }

  /**
   * Source updateManyAndReturn
   */
  export type SourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
  }

  /**
   * Source upsert
   */
  export type SourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The filter to search for the Source to update in case it exists.
     */
    where: SourceWhereUniqueInput
    /**
     * In case the Source found by the `where` argument doesn't exist, create a new Source with this data.
     */
    create: XOR<SourceCreateInput, SourceUncheckedCreateInput>
    /**
     * In case the Source was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
  }

  /**
   * Source delete
   */
  export type SourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Filter which Source to delete.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source deleteMany
   */
  export type SourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sources to delete
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to delete.
     */
    limit?: number
  }

  /**
   * Source without action
   */
  export type SourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    preferences: number
    bookmarks: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    preferences?: true
    bookmarks?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    preferences: JsonValue | null
    bookmarks: string[]
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    preferences?: boolean
    bookmarks?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    preferences?: boolean
    bookmarks?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    preferences?: boolean
    bookmarks?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    preferences?: boolean
    bookmarks?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "preferences" | "bookmarks", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      preferences: Prisma.JsonValue | null
      bookmarks: string[]
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly preferences: FieldRef<"User", 'Json'>
    readonly bookmarks: FieldRef<"User", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    ipAddress: number
    userAgent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "ipAddress" | "userAgent" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    accountId: number
    providerId: number
    accessToken: number
    refreshToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    idToken: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "accountId" | "providerId" | "accessToken" | "refreshToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "idToken" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accountId: string
      providerId: string
      accessToken: string | null
      refreshToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      idToken: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model ArenaAgent
   */

  export type AggregateArenaAgent = {
    _count: ArenaAgentCountAggregateOutputType | null
    _min: ArenaAgentMinAggregateOutputType | null
    _max: ArenaAgentMaxAggregateOutputType | null
  }

  export type ArenaAgentMinAggregateOutputType = {
    id: string | null
    name: string | null
    model: string | null
    personality: string | null
    strategy: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArenaAgentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    model: string | null
    personality: string | null
    strategy: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArenaAgentCountAggregateOutputType = {
    id: number
    name: number
    model: number
    personality: number
    strategy: number
    config: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArenaAgentMinAggregateInputType = {
    id?: true
    name?: true
    model?: true
    personality?: true
    strategy?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArenaAgentMaxAggregateInputType = {
    id?: true
    name?: true
    model?: true
    personality?: true
    strategy?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArenaAgentCountAggregateInputType = {
    id?: true
    name?: true
    model?: true
    personality?: true
    strategy?: true
    config?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArenaAgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaAgent to aggregate.
     */
    where?: ArenaAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaAgents to fetch.
     */
    orderBy?: ArenaAgentOrderByWithRelationInput | ArenaAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArenaAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArenaAgents
    **/
    _count?: true | ArenaAgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArenaAgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArenaAgentMaxAggregateInputType
  }

  export type GetArenaAgentAggregateType<T extends ArenaAgentAggregateArgs> = {
        [P in keyof T & keyof AggregateArenaAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArenaAgent[P]>
      : GetScalarType<T[P], AggregateArenaAgent[P]>
  }




  export type ArenaAgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaAgentWhereInput
    orderBy?: ArenaAgentOrderByWithAggregationInput | ArenaAgentOrderByWithAggregationInput[]
    by: ArenaAgentScalarFieldEnum[] | ArenaAgentScalarFieldEnum
    having?: ArenaAgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArenaAgentCountAggregateInputType | true
    _min?: ArenaAgentMinAggregateInputType
    _max?: ArenaAgentMaxAggregateInputType
  }

  export type ArenaAgentGroupByOutputType = {
    id: string
    name: string
    model: string
    personality: string | null
    strategy: string | null
    config: JsonValue
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ArenaAgentCountAggregateOutputType | null
    _min: ArenaAgentMinAggregateOutputType | null
    _max: ArenaAgentMaxAggregateOutputType | null
  }

  type GetArenaAgentGroupByPayload<T extends ArenaAgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArenaAgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArenaAgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArenaAgentGroupByOutputType[P]>
            : GetScalarType<T[P], ArenaAgentGroupByOutputType[P]>
        }
      >
    >


  export type ArenaAgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    model?: boolean
    personality?: boolean
    strategy?: boolean
    config?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    participations?: boolean | ArenaAgent$participationsArgs<ExtArgs>
    _count?: boolean | ArenaAgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaAgent"]>

  export type ArenaAgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    model?: boolean
    personality?: boolean
    strategy?: boolean
    config?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["arenaAgent"]>

  export type ArenaAgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    model?: boolean
    personality?: boolean
    strategy?: boolean
    config?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["arenaAgent"]>

  export type ArenaAgentSelectScalar = {
    id?: boolean
    name?: boolean
    model?: boolean
    personality?: boolean
    strategy?: boolean
    config?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArenaAgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "model" | "personality" | "strategy" | "config" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["arenaAgent"]>
  export type ArenaAgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participations?: boolean | ArenaAgent$participationsArgs<ExtArgs>
    _count?: boolean | ArenaAgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArenaAgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ArenaAgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArenaAgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArenaAgent"
    objects: {
      participations: Prisma.$ArenaParticipationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      model: string
      personality: string | null
      strategy: string | null
      config: Prisma.JsonValue
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["arenaAgent"]>
    composites: {}
  }

  type ArenaAgentGetPayload<S extends boolean | null | undefined | ArenaAgentDefaultArgs> = $Result.GetResult<Prisma.$ArenaAgentPayload, S>

  type ArenaAgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArenaAgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArenaAgentCountAggregateInputType | true
    }

  export interface ArenaAgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArenaAgent'], meta: { name: 'ArenaAgent' } }
    /**
     * Find zero or one ArenaAgent that matches the filter.
     * @param {ArenaAgentFindUniqueArgs} args - Arguments to find a ArenaAgent
     * @example
     * // Get one ArenaAgent
     * const arenaAgent = await prisma.arenaAgent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArenaAgentFindUniqueArgs>(args: SelectSubset<T, ArenaAgentFindUniqueArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArenaAgent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArenaAgentFindUniqueOrThrowArgs} args - Arguments to find a ArenaAgent
     * @example
     * // Get one ArenaAgent
     * const arenaAgent = await prisma.arenaAgent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArenaAgentFindUniqueOrThrowArgs>(args: SelectSubset<T, ArenaAgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaAgent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaAgentFindFirstArgs} args - Arguments to find a ArenaAgent
     * @example
     * // Get one ArenaAgent
     * const arenaAgent = await prisma.arenaAgent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArenaAgentFindFirstArgs>(args?: SelectSubset<T, ArenaAgentFindFirstArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaAgent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaAgentFindFirstOrThrowArgs} args - Arguments to find a ArenaAgent
     * @example
     * // Get one ArenaAgent
     * const arenaAgent = await prisma.arenaAgent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArenaAgentFindFirstOrThrowArgs>(args?: SelectSubset<T, ArenaAgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArenaAgents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaAgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArenaAgents
     * const arenaAgents = await prisma.arenaAgent.findMany()
     * 
     * // Get first 10 ArenaAgents
     * const arenaAgents = await prisma.arenaAgent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arenaAgentWithIdOnly = await prisma.arenaAgent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArenaAgentFindManyArgs>(args?: SelectSubset<T, ArenaAgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArenaAgent.
     * @param {ArenaAgentCreateArgs} args - Arguments to create a ArenaAgent.
     * @example
     * // Create one ArenaAgent
     * const ArenaAgent = await prisma.arenaAgent.create({
     *   data: {
     *     // ... data to create a ArenaAgent
     *   }
     * })
     * 
     */
    create<T extends ArenaAgentCreateArgs>(args: SelectSubset<T, ArenaAgentCreateArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArenaAgents.
     * @param {ArenaAgentCreateManyArgs} args - Arguments to create many ArenaAgents.
     * @example
     * // Create many ArenaAgents
     * const arenaAgent = await prisma.arenaAgent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArenaAgentCreateManyArgs>(args?: SelectSubset<T, ArenaAgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArenaAgents and returns the data saved in the database.
     * @param {ArenaAgentCreateManyAndReturnArgs} args - Arguments to create many ArenaAgents.
     * @example
     * // Create many ArenaAgents
     * const arenaAgent = await prisma.arenaAgent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArenaAgents and only return the `id`
     * const arenaAgentWithIdOnly = await prisma.arenaAgent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArenaAgentCreateManyAndReturnArgs>(args?: SelectSubset<T, ArenaAgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArenaAgent.
     * @param {ArenaAgentDeleteArgs} args - Arguments to delete one ArenaAgent.
     * @example
     * // Delete one ArenaAgent
     * const ArenaAgent = await prisma.arenaAgent.delete({
     *   where: {
     *     // ... filter to delete one ArenaAgent
     *   }
     * })
     * 
     */
    delete<T extends ArenaAgentDeleteArgs>(args: SelectSubset<T, ArenaAgentDeleteArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArenaAgent.
     * @param {ArenaAgentUpdateArgs} args - Arguments to update one ArenaAgent.
     * @example
     * // Update one ArenaAgent
     * const arenaAgent = await prisma.arenaAgent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArenaAgentUpdateArgs>(args: SelectSubset<T, ArenaAgentUpdateArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArenaAgents.
     * @param {ArenaAgentDeleteManyArgs} args - Arguments to filter ArenaAgents to delete.
     * @example
     * // Delete a few ArenaAgents
     * const { count } = await prisma.arenaAgent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArenaAgentDeleteManyArgs>(args?: SelectSubset<T, ArenaAgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaAgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArenaAgents
     * const arenaAgent = await prisma.arenaAgent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArenaAgentUpdateManyArgs>(args: SelectSubset<T, ArenaAgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaAgents and returns the data updated in the database.
     * @param {ArenaAgentUpdateManyAndReturnArgs} args - Arguments to update many ArenaAgents.
     * @example
     * // Update many ArenaAgents
     * const arenaAgent = await prisma.arenaAgent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArenaAgents and only return the `id`
     * const arenaAgentWithIdOnly = await prisma.arenaAgent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArenaAgentUpdateManyAndReturnArgs>(args: SelectSubset<T, ArenaAgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArenaAgent.
     * @param {ArenaAgentUpsertArgs} args - Arguments to update or create a ArenaAgent.
     * @example
     * // Update or create a ArenaAgent
     * const arenaAgent = await prisma.arenaAgent.upsert({
     *   create: {
     *     // ... data to create a ArenaAgent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArenaAgent we want to update
     *   }
     * })
     */
    upsert<T extends ArenaAgentUpsertArgs>(args: SelectSubset<T, ArenaAgentUpsertArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArenaAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaAgentCountArgs} args - Arguments to filter ArenaAgents to count.
     * @example
     * // Count the number of ArenaAgents
     * const count = await prisma.arenaAgent.count({
     *   where: {
     *     // ... the filter for the ArenaAgents we want to count
     *   }
     * })
    **/
    count<T extends ArenaAgentCountArgs>(
      args?: Subset<T, ArenaAgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArenaAgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArenaAgent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaAgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArenaAgentAggregateArgs>(args: Subset<T, ArenaAgentAggregateArgs>): Prisma.PrismaPromise<GetArenaAgentAggregateType<T>>

    /**
     * Group by ArenaAgent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaAgentGroupByArgs} args - Group by arguments.
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
      T extends ArenaAgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArenaAgentGroupByArgs['orderBy'] }
        : { orderBy?: ArenaAgentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArenaAgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArenaAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArenaAgent model
   */
  readonly fields: ArenaAgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArenaAgent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArenaAgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participations<T extends ArenaAgent$participationsArgs<ExtArgs> = {}>(args?: Subset<T, ArenaAgent$participationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ArenaAgent model
   */
  interface ArenaAgentFieldRefs {
    readonly id: FieldRef<"ArenaAgent", 'String'>
    readonly name: FieldRef<"ArenaAgent", 'String'>
    readonly model: FieldRef<"ArenaAgent", 'String'>
    readonly personality: FieldRef<"ArenaAgent", 'String'>
    readonly strategy: FieldRef<"ArenaAgent", 'String'>
    readonly config: FieldRef<"ArenaAgent", 'Json'>
    readonly isActive: FieldRef<"ArenaAgent", 'Boolean'>
    readonly createdAt: FieldRef<"ArenaAgent", 'DateTime'>
    readonly updatedAt: FieldRef<"ArenaAgent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArenaAgent findUnique
   */
  export type ArenaAgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * Filter, which ArenaAgent to fetch.
     */
    where: ArenaAgentWhereUniqueInput
  }

  /**
   * ArenaAgent findUniqueOrThrow
   */
  export type ArenaAgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * Filter, which ArenaAgent to fetch.
     */
    where: ArenaAgentWhereUniqueInput
  }

  /**
   * ArenaAgent findFirst
   */
  export type ArenaAgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * Filter, which ArenaAgent to fetch.
     */
    where?: ArenaAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaAgents to fetch.
     */
    orderBy?: ArenaAgentOrderByWithRelationInput | ArenaAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaAgents.
     */
    cursor?: ArenaAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaAgents.
     */
    distinct?: ArenaAgentScalarFieldEnum | ArenaAgentScalarFieldEnum[]
  }

  /**
   * ArenaAgent findFirstOrThrow
   */
  export type ArenaAgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * Filter, which ArenaAgent to fetch.
     */
    where?: ArenaAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaAgents to fetch.
     */
    orderBy?: ArenaAgentOrderByWithRelationInput | ArenaAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaAgents.
     */
    cursor?: ArenaAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaAgents.
     */
    distinct?: ArenaAgentScalarFieldEnum | ArenaAgentScalarFieldEnum[]
  }

  /**
   * ArenaAgent findMany
   */
  export type ArenaAgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * Filter, which ArenaAgents to fetch.
     */
    where?: ArenaAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaAgents to fetch.
     */
    orderBy?: ArenaAgentOrderByWithRelationInput | ArenaAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArenaAgents.
     */
    cursor?: ArenaAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaAgents.
     */
    skip?: number
    distinct?: ArenaAgentScalarFieldEnum | ArenaAgentScalarFieldEnum[]
  }

  /**
   * ArenaAgent create
   */
  export type ArenaAgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * The data needed to create a ArenaAgent.
     */
    data: XOR<ArenaAgentCreateInput, ArenaAgentUncheckedCreateInput>
  }

  /**
   * ArenaAgent createMany
   */
  export type ArenaAgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArenaAgents.
     */
    data: ArenaAgentCreateManyInput | ArenaAgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaAgent createManyAndReturn
   */
  export type ArenaAgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * The data used to create many ArenaAgents.
     */
    data: ArenaAgentCreateManyInput | ArenaAgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaAgent update
   */
  export type ArenaAgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * The data needed to update a ArenaAgent.
     */
    data: XOR<ArenaAgentUpdateInput, ArenaAgentUncheckedUpdateInput>
    /**
     * Choose, which ArenaAgent to update.
     */
    where: ArenaAgentWhereUniqueInput
  }

  /**
   * ArenaAgent updateMany
   */
  export type ArenaAgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArenaAgents.
     */
    data: XOR<ArenaAgentUpdateManyMutationInput, ArenaAgentUncheckedUpdateManyInput>
    /**
     * Filter which ArenaAgents to update
     */
    where?: ArenaAgentWhereInput
    /**
     * Limit how many ArenaAgents to update.
     */
    limit?: number
  }

  /**
   * ArenaAgent updateManyAndReturn
   */
  export type ArenaAgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * The data used to update ArenaAgents.
     */
    data: XOR<ArenaAgentUpdateManyMutationInput, ArenaAgentUncheckedUpdateManyInput>
    /**
     * Filter which ArenaAgents to update
     */
    where?: ArenaAgentWhereInput
    /**
     * Limit how many ArenaAgents to update.
     */
    limit?: number
  }

  /**
   * ArenaAgent upsert
   */
  export type ArenaAgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * The filter to search for the ArenaAgent to update in case it exists.
     */
    where: ArenaAgentWhereUniqueInput
    /**
     * In case the ArenaAgent found by the `where` argument doesn't exist, create a new ArenaAgent with this data.
     */
    create: XOR<ArenaAgentCreateInput, ArenaAgentUncheckedCreateInput>
    /**
     * In case the ArenaAgent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArenaAgentUpdateInput, ArenaAgentUncheckedUpdateInput>
  }

  /**
   * ArenaAgent delete
   */
  export type ArenaAgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
    /**
     * Filter which ArenaAgent to delete.
     */
    where: ArenaAgentWhereUniqueInput
  }

  /**
   * ArenaAgent deleteMany
   */
  export type ArenaAgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaAgents to delete
     */
    where?: ArenaAgentWhereInput
    /**
     * Limit how many ArenaAgents to delete.
     */
    limit?: number
  }

  /**
   * ArenaAgent.participations
   */
  export type ArenaAgent$participationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    where?: ArenaParticipationWhereInput
    orderBy?: ArenaParticipationOrderByWithRelationInput | ArenaParticipationOrderByWithRelationInput[]
    cursor?: ArenaParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArenaParticipationScalarFieldEnum | ArenaParticipationScalarFieldEnum[]
  }

  /**
   * ArenaAgent without action
   */
  export type ArenaAgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaAgent
     */
    select?: ArenaAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaAgent
     */
    omit?: ArenaAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaAgentInclude<ExtArgs> | null
  }


  /**
   * Model ArenaSimulation
   */

  export type AggregateArenaSimulation = {
    _count: ArenaSimulationCountAggregateOutputType | null
    _avg: ArenaSimulationAvgAggregateOutputType | null
    _sum: ArenaSimulationSumAggregateOutputType | null
    _min: ArenaSimulationMinAggregateOutputType | null
    _max: ArenaSimulationMaxAggregateOutputType | null
  }

  export type ArenaSimulationAvgAggregateOutputType = {
    initialBalance: number | null
    tickIntervalMs: number | null
    priceImpact: number | null
  }

  export type ArenaSimulationSumAggregateOutputType = {
    initialBalance: number | null
    tickIntervalMs: number | null
    priceImpact: number | null
  }

  export type ArenaSimulationMinAggregateOutputType = {
    id: string | null
    name: string | null
    status: string | null
    market: string | null
    marketType: string | null
    interval: string | null
    startDate: Date | null
    endDate: Date | null
    initialBalance: number | null
    tickIntervalMs: number | null
    priceImpact: number | null
    createdAt: Date | null
    startedAt: Date | null
    pausedAt: Date | null
    completedAt: Date | null
    errorMessage: string | null
  }

  export type ArenaSimulationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    status: string | null
    market: string | null
    marketType: string | null
    interval: string | null
    startDate: Date | null
    endDate: Date | null
    initialBalance: number | null
    tickIntervalMs: number | null
    priceImpact: number | null
    createdAt: Date | null
    startedAt: Date | null
    pausedAt: Date | null
    completedAt: Date | null
    errorMessage: string | null
  }

  export type ArenaSimulationCountAggregateOutputType = {
    id: number
    name: number
    status: number
    market: number
    marketType: number
    interval: number
    startDate: number
    endDate: number
    initialBalance: number
    tickIntervalMs: number
    priceImpact: number
    config: number
    createdAt: number
    startedAt: number
    pausedAt: number
    completedAt: number
    errorMessage: number
    _all: number
  }


  export type ArenaSimulationAvgAggregateInputType = {
    initialBalance?: true
    tickIntervalMs?: true
    priceImpact?: true
  }

  export type ArenaSimulationSumAggregateInputType = {
    initialBalance?: true
    tickIntervalMs?: true
    priceImpact?: true
  }

  export type ArenaSimulationMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    market?: true
    marketType?: true
    interval?: true
    startDate?: true
    endDate?: true
    initialBalance?: true
    tickIntervalMs?: true
    priceImpact?: true
    createdAt?: true
    startedAt?: true
    pausedAt?: true
    completedAt?: true
    errorMessage?: true
  }

  export type ArenaSimulationMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    market?: true
    marketType?: true
    interval?: true
    startDate?: true
    endDate?: true
    initialBalance?: true
    tickIntervalMs?: true
    priceImpact?: true
    createdAt?: true
    startedAt?: true
    pausedAt?: true
    completedAt?: true
    errorMessage?: true
  }

  export type ArenaSimulationCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    market?: true
    marketType?: true
    interval?: true
    startDate?: true
    endDate?: true
    initialBalance?: true
    tickIntervalMs?: true
    priceImpact?: true
    config?: true
    createdAt?: true
    startedAt?: true
    pausedAt?: true
    completedAt?: true
    errorMessage?: true
    _all?: true
  }

  export type ArenaSimulationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaSimulation to aggregate.
     */
    where?: ArenaSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSimulations to fetch.
     */
    orderBy?: ArenaSimulationOrderByWithRelationInput | ArenaSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArenaSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArenaSimulations
    **/
    _count?: true | ArenaSimulationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArenaSimulationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArenaSimulationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArenaSimulationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArenaSimulationMaxAggregateInputType
  }

  export type GetArenaSimulationAggregateType<T extends ArenaSimulationAggregateArgs> = {
        [P in keyof T & keyof AggregateArenaSimulation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArenaSimulation[P]>
      : GetScalarType<T[P], AggregateArenaSimulation[P]>
  }




  export type ArenaSimulationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaSimulationWhereInput
    orderBy?: ArenaSimulationOrderByWithAggregationInput | ArenaSimulationOrderByWithAggregationInput[]
    by: ArenaSimulationScalarFieldEnum[] | ArenaSimulationScalarFieldEnum
    having?: ArenaSimulationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArenaSimulationCountAggregateInputType | true
    _avg?: ArenaSimulationAvgAggregateInputType
    _sum?: ArenaSimulationSumAggregateInputType
    _min?: ArenaSimulationMinAggregateInputType
    _max?: ArenaSimulationMaxAggregateInputType
  }

  export type ArenaSimulationGroupByOutputType = {
    id: string
    name: string
    status: string
    market: string
    marketType: string
    interval: string
    startDate: Date
    endDate: Date
    initialBalance: number
    tickIntervalMs: number
    priceImpact: number
    config: JsonValue
    createdAt: Date
    startedAt: Date | null
    pausedAt: Date | null
    completedAt: Date | null
    errorMessage: string | null
    _count: ArenaSimulationCountAggregateOutputType | null
    _avg: ArenaSimulationAvgAggregateOutputType | null
    _sum: ArenaSimulationSumAggregateOutputType | null
    _min: ArenaSimulationMinAggregateOutputType | null
    _max: ArenaSimulationMaxAggregateOutputType | null
  }

  type GetArenaSimulationGroupByPayload<T extends ArenaSimulationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArenaSimulationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArenaSimulationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArenaSimulationGroupByOutputType[P]>
            : GetScalarType<T[P], ArenaSimulationGroupByOutputType[P]>
        }
      >
    >


  export type ArenaSimulationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    market?: boolean
    marketType?: boolean
    interval?: boolean
    startDate?: boolean
    endDate?: boolean
    initialBalance?: boolean
    tickIntervalMs?: boolean
    priceImpact?: boolean
    config?: boolean
    createdAt?: boolean
    startedAt?: boolean
    pausedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
    participants?: boolean | ArenaSimulation$participantsArgs<ExtArgs>
    trades?: boolean | ArenaSimulation$tradesArgs<ExtArgs>
    snapshots?: boolean | ArenaSimulation$snapshotsArgs<ExtArgs>
    _count?: boolean | ArenaSimulationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaSimulation"]>

  export type ArenaSimulationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    market?: boolean
    marketType?: boolean
    interval?: boolean
    startDate?: boolean
    endDate?: boolean
    initialBalance?: boolean
    tickIntervalMs?: boolean
    priceImpact?: boolean
    config?: boolean
    createdAt?: boolean
    startedAt?: boolean
    pausedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
  }, ExtArgs["result"]["arenaSimulation"]>

  export type ArenaSimulationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    market?: boolean
    marketType?: boolean
    interval?: boolean
    startDate?: boolean
    endDate?: boolean
    initialBalance?: boolean
    tickIntervalMs?: boolean
    priceImpact?: boolean
    config?: boolean
    createdAt?: boolean
    startedAt?: boolean
    pausedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
  }, ExtArgs["result"]["arenaSimulation"]>

  export type ArenaSimulationSelectScalar = {
    id?: boolean
    name?: boolean
    status?: boolean
    market?: boolean
    marketType?: boolean
    interval?: boolean
    startDate?: boolean
    endDate?: boolean
    initialBalance?: boolean
    tickIntervalMs?: boolean
    priceImpact?: boolean
    config?: boolean
    createdAt?: boolean
    startedAt?: boolean
    pausedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
  }

  export type ArenaSimulationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "status" | "market" | "marketType" | "interval" | "startDate" | "endDate" | "initialBalance" | "tickIntervalMs" | "priceImpact" | "config" | "createdAt" | "startedAt" | "pausedAt" | "completedAt" | "errorMessage", ExtArgs["result"]["arenaSimulation"]>
  export type ArenaSimulationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | ArenaSimulation$participantsArgs<ExtArgs>
    trades?: boolean | ArenaSimulation$tradesArgs<ExtArgs>
    snapshots?: boolean | ArenaSimulation$snapshotsArgs<ExtArgs>
    _count?: boolean | ArenaSimulationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArenaSimulationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ArenaSimulationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArenaSimulationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArenaSimulation"
    objects: {
      participants: Prisma.$ArenaParticipationPayload<ExtArgs>[]
      trades: Prisma.$ArenaTradePayload<ExtArgs>[]
      snapshots: Prisma.$ArenaSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      status: string
      market: string
      marketType: string
      interval: string
      startDate: Date
      endDate: Date
      initialBalance: number
      tickIntervalMs: number
      priceImpact: number
      config: Prisma.JsonValue
      createdAt: Date
      startedAt: Date | null
      pausedAt: Date | null
      completedAt: Date | null
      errorMessage: string | null
    }, ExtArgs["result"]["arenaSimulation"]>
    composites: {}
  }

  type ArenaSimulationGetPayload<S extends boolean | null | undefined | ArenaSimulationDefaultArgs> = $Result.GetResult<Prisma.$ArenaSimulationPayload, S>

  type ArenaSimulationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArenaSimulationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArenaSimulationCountAggregateInputType | true
    }

  export interface ArenaSimulationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArenaSimulation'], meta: { name: 'ArenaSimulation' } }
    /**
     * Find zero or one ArenaSimulation that matches the filter.
     * @param {ArenaSimulationFindUniqueArgs} args - Arguments to find a ArenaSimulation
     * @example
     * // Get one ArenaSimulation
     * const arenaSimulation = await prisma.arenaSimulation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArenaSimulationFindUniqueArgs>(args: SelectSubset<T, ArenaSimulationFindUniqueArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArenaSimulation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArenaSimulationFindUniqueOrThrowArgs} args - Arguments to find a ArenaSimulation
     * @example
     * // Get one ArenaSimulation
     * const arenaSimulation = await prisma.arenaSimulation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArenaSimulationFindUniqueOrThrowArgs>(args: SelectSubset<T, ArenaSimulationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaSimulation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSimulationFindFirstArgs} args - Arguments to find a ArenaSimulation
     * @example
     * // Get one ArenaSimulation
     * const arenaSimulation = await prisma.arenaSimulation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArenaSimulationFindFirstArgs>(args?: SelectSubset<T, ArenaSimulationFindFirstArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaSimulation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSimulationFindFirstOrThrowArgs} args - Arguments to find a ArenaSimulation
     * @example
     * // Get one ArenaSimulation
     * const arenaSimulation = await prisma.arenaSimulation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArenaSimulationFindFirstOrThrowArgs>(args?: SelectSubset<T, ArenaSimulationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArenaSimulations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSimulationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArenaSimulations
     * const arenaSimulations = await prisma.arenaSimulation.findMany()
     * 
     * // Get first 10 ArenaSimulations
     * const arenaSimulations = await prisma.arenaSimulation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arenaSimulationWithIdOnly = await prisma.arenaSimulation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArenaSimulationFindManyArgs>(args?: SelectSubset<T, ArenaSimulationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArenaSimulation.
     * @param {ArenaSimulationCreateArgs} args - Arguments to create a ArenaSimulation.
     * @example
     * // Create one ArenaSimulation
     * const ArenaSimulation = await prisma.arenaSimulation.create({
     *   data: {
     *     // ... data to create a ArenaSimulation
     *   }
     * })
     * 
     */
    create<T extends ArenaSimulationCreateArgs>(args: SelectSubset<T, ArenaSimulationCreateArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArenaSimulations.
     * @param {ArenaSimulationCreateManyArgs} args - Arguments to create many ArenaSimulations.
     * @example
     * // Create many ArenaSimulations
     * const arenaSimulation = await prisma.arenaSimulation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArenaSimulationCreateManyArgs>(args?: SelectSubset<T, ArenaSimulationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArenaSimulations and returns the data saved in the database.
     * @param {ArenaSimulationCreateManyAndReturnArgs} args - Arguments to create many ArenaSimulations.
     * @example
     * // Create many ArenaSimulations
     * const arenaSimulation = await prisma.arenaSimulation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArenaSimulations and only return the `id`
     * const arenaSimulationWithIdOnly = await prisma.arenaSimulation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArenaSimulationCreateManyAndReturnArgs>(args?: SelectSubset<T, ArenaSimulationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArenaSimulation.
     * @param {ArenaSimulationDeleteArgs} args - Arguments to delete one ArenaSimulation.
     * @example
     * // Delete one ArenaSimulation
     * const ArenaSimulation = await prisma.arenaSimulation.delete({
     *   where: {
     *     // ... filter to delete one ArenaSimulation
     *   }
     * })
     * 
     */
    delete<T extends ArenaSimulationDeleteArgs>(args: SelectSubset<T, ArenaSimulationDeleteArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArenaSimulation.
     * @param {ArenaSimulationUpdateArgs} args - Arguments to update one ArenaSimulation.
     * @example
     * // Update one ArenaSimulation
     * const arenaSimulation = await prisma.arenaSimulation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArenaSimulationUpdateArgs>(args: SelectSubset<T, ArenaSimulationUpdateArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArenaSimulations.
     * @param {ArenaSimulationDeleteManyArgs} args - Arguments to filter ArenaSimulations to delete.
     * @example
     * // Delete a few ArenaSimulations
     * const { count } = await prisma.arenaSimulation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArenaSimulationDeleteManyArgs>(args?: SelectSubset<T, ArenaSimulationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaSimulations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSimulationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArenaSimulations
     * const arenaSimulation = await prisma.arenaSimulation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArenaSimulationUpdateManyArgs>(args: SelectSubset<T, ArenaSimulationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaSimulations and returns the data updated in the database.
     * @param {ArenaSimulationUpdateManyAndReturnArgs} args - Arguments to update many ArenaSimulations.
     * @example
     * // Update many ArenaSimulations
     * const arenaSimulation = await prisma.arenaSimulation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArenaSimulations and only return the `id`
     * const arenaSimulationWithIdOnly = await prisma.arenaSimulation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArenaSimulationUpdateManyAndReturnArgs>(args: SelectSubset<T, ArenaSimulationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArenaSimulation.
     * @param {ArenaSimulationUpsertArgs} args - Arguments to update or create a ArenaSimulation.
     * @example
     * // Update or create a ArenaSimulation
     * const arenaSimulation = await prisma.arenaSimulation.upsert({
     *   create: {
     *     // ... data to create a ArenaSimulation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArenaSimulation we want to update
     *   }
     * })
     */
    upsert<T extends ArenaSimulationUpsertArgs>(args: SelectSubset<T, ArenaSimulationUpsertArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArenaSimulations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSimulationCountArgs} args - Arguments to filter ArenaSimulations to count.
     * @example
     * // Count the number of ArenaSimulations
     * const count = await prisma.arenaSimulation.count({
     *   where: {
     *     // ... the filter for the ArenaSimulations we want to count
     *   }
     * })
    **/
    count<T extends ArenaSimulationCountArgs>(
      args?: Subset<T, ArenaSimulationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArenaSimulationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArenaSimulation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSimulationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArenaSimulationAggregateArgs>(args: Subset<T, ArenaSimulationAggregateArgs>): Prisma.PrismaPromise<GetArenaSimulationAggregateType<T>>

    /**
     * Group by ArenaSimulation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSimulationGroupByArgs} args - Group by arguments.
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
      T extends ArenaSimulationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArenaSimulationGroupByArgs['orderBy'] }
        : { orderBy?: ArenaSimulationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArenaSimulationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArenaSimulationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArenaSimulation model
   */
  readonly fields: ArenaSimulationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArenaSimulation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArenaSimulationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participants<T extends ArenaSimulation$participantsArgs<ExtArgs> = {}>(args?: Subset<T, ArenaSimulation$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trades<T extends ArenaSimulation$tradesArgs<ExtArgs> = {}>(args?: Subset<T, ArenaSimulation$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    snapshots<T extends ArenaSimulation$snapshotsArgs<ExtArgs> = {}>(args?: Subset<T, ArenaSimulation$snapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ArenaSimulation model
   */
  interface ArenaSimulationFieldRefs {
    readonly id: FieldRef<"ArenaSimulation", 'String'>
    readonly name: FieldRef<"ArenaSimulation", 'String'>
    readonly status: FieldRef<"ArenaSimulation", 'String'>
    readonly market: FieldRef<"ArenaSimulation", 'String'>
    readonly marketType: FieldRef<"ArenaSimulation", 'String'>
    readonly interval: FieldRef<"ArenaSimulation", 'String'>
    readonly startDate: FieldRef<"ArenaSimulation", 'DateTime'>
    readonly endDate: FieldRef<"ArenaSimulation", 'DateTime'>
    readonly initialBalance: FieldRef<"ArenaSimulation", 'Float'>
    readonly tickIntervalMs: FieldRef<"ArenaSimulation", 'Int'>
    readonly priceImpact: FieldRef<"ArenaSimulation", 'Float'>
    readonly config: FieldRef<"ArenaSimulation", 'Json'>
    readonly createdAt: FieldRef<"ArenaSimulation", 'DateTime'>
    readonly startedAt: FieldRef<"ArenaSimulation", 'DateTime'>
    readonly pausedAt: FieldRef<"ArenaSimulation", 'DateTime'>
    readonly completedAt: FieldRef<"ArenaSimulation", 'DateTime'>
    readonly errorMessage: FieldRef<"ArenaSimulation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ArenaSimulation findUnique
   */
  export type ArenaSimulationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSimulation to fetch.
     */
    where: ArenaSimulationWhereUniqueInput
  }

  /**
   * ArenaSimulation findUniqueOrThrow
   */
  export type ArenaSimulationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSimulation to fetch.
     */
    where: ArenaSimulationWhereUniqueInput
  }

  /**
   * ArenaSimulation findFirst
   */
  export type ArenaSimulationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSimulation to fetch.
     */
    where?: ArenaSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSimulations to fetch.
     */
    orderBy?: ArenaSimulationOrderByWithRelationInput | ArenaSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaSimulations.
     */
    cursor?: ArenaSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaSimulations.
     */
    distinct?: ArenaSimulationScalarFieldEnum | ArenaSimulationScalarFieldEnum[]
  }

  /**
   * ArenaSimulation findFirstOrThrow
   */
  export type ArenaSimulationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSimulation to fetch.
     */
    where?: ArenaSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSimulations to fetch.
     */
    orderBy?: ArenaSimulationOrderByWithRelationInput | ArenaSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaSimulations.
     */
    cursor?: ArenaSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaSimulations.
     */
    distinct?: ArenaSimulationScalarFieldEnum | ArenaSimulationScalarFieldEnum[]
  }

  /**
   * ArenaSimulation findMany
   */
  export type ArenaSimulationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSimulations to fetch.
     */
    where?: ArenaSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSimulations to fetch.
     */
    orderBy?: ArenaSimulationOrderByWithRelationInput | ArenaSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArenaSimulations.
     */
    cursor?: ArenaSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSimulations.
     */
    skip?: number
    distinct?: ArenaSimulationScalarFieldEnum | ArenaSimulationScalarFieldEnum[]
  }

  /**
   * ArenaSimulation create
   */
  export type ArenaSimulationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * The data needed to create a ArenaSimulation.
     */
    data: XOR<ArenaSimulationCreateInput, ArenaSimulationUncheckedCreateInput>
  }

  /**
   * ArenaSimulation createMany
   */
  export type ArenaSimulationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArenaSimulations.
     */
    data: ArenaSimulationCreateManyInput | ArenaSimulationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaSimulation createManyAndReturn
   */
  export type ArenaSimulationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * The data used to create many ArenaSimulations.
     */
    data: ArenaSimulationCreateManyInput | ArenaSimulationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaSimulation update
   */
  export type ArenaSimulationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * The data needed to update a ArenaSimulation.
     */
    data: XOR<ArenaSimulationUpdateInput, ArenaSimulationUncheckedUpdateInput>
    /**
     * Choose, which ArenaSimulation to update.
     */
    where: ArenaSimulationWhereUniqueInput
  }

  /**
   * ArenaSimulation updateMany
   */
  export type ArenaSimulationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArenaSimulations.
     */
    data: XOR<ArenaSimulationUpdateManyMutationInput, ArenaSimulationUncheckedUpdateManyInput>
    /**
     * Filter which ArenaSimulations to update
     */
    where?: ArenaSimulationWhereInput
    /**
     * Limit how many ArenaSimulations to update.
     */
    limit?: number
  }

  /**
   * ArenaSimulation updateManyAndReturn
   */
  export type ArenaSimulationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * The data used to update ArenaSimulations.
     */
    data: XOR<ArenaSimulationUpdateManyMutationInput, ArenaSimulationUncheckedUpdateManyInput>
    /**
     * Filter which ArenaSimulations to update
     */
    where?: ArenaSimulationWhereInput
    /**
     * Limit how many ArenaSimulations to update.
     */
    limit?: number
  }

  /**
   * ArenaSimulation upsert
   */
  export type ArenaSimulationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * The filter to search for the ArenaSimulation to update in case it exists.
     */
    where: ArenaSimulationWhereUniqueInput
    /**
     * In case the ArenaSimulation found by the `where` argument doesn't exist, create a new ArenaSimulation with this data.
     */
    create: XOR<ArenaSimulationCreateInput, ArenaSimulationUncheckedCreateInput>
    /**
     * In case the ArenaSimulation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArenaSimulationUpdateInput, ArenaSimulationUncheckedUpdateInput>
  }

  /**
   * ArenaSimulation delete
   */
  export type ArenaSimulationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
    /**
     * Filter which ArenaSimulation to delete.
     */
    where: ArenaSimulationWhereUniqueInput
  }

  /**
   * ArenaSimulation deleteMany
   */
  export type ArenaSimulationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaSimulations to delete
     */
    where?: ArenaSimulationWhereInput
    /**
     * Limit how many ArenaSimulations to delete.
     */
    limit?: number
  }

  /**
   * ArenaSimulation.participants
   */
  export type ArenaSimulation$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    where?: ArenaParticipationWhereInput
    orderBy?: ArenaParticipationOrderByWithRelationInput | ArenaParticipationOrderByWithRelationInput[]
    cursor?: ArenaParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArenaParticipationScalarFieldEnum | ArenaParticipationScalarFieldEnum[]
  }

  /**
   * ArenaSimulation.trades
   */
  export type ArenaSimulation$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    where?: ArenaTradeWhereInput
    orderBy?: ArenaTradeOrderByWithRelationInput | ArenaTradeOrderByWithRelationInput[]
    cursor?: ArenaTradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArenaTradeScalarFieldEnum | ArenaTradeScalarFieldEnum[]
  }

  /**
   * ArenaSimulation.snapshots
   */
  export type ArenaSimulation$snapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    where?: ArenaSnapshotWhereInput
    orderBy?: ArenaSnapshotOrderByWithRelationInput | ArenaSnapshotOrderByWithRelationInput[]
    cursor?: ArenaSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArenaSnapshotScalarFieldEnum | ArenaSnapshotScalarFieldEnum[]
  }

  /**
   * ArenaSimulation without action
   */
  export type ArenaSimulationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSimulation
     */
    select?: ArenaSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSimulation
     */
    omit?: ArenaSimulationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSimulationInclude<ExtArgs> | null
  }


  /**
   * Model ArenaParticipation
   */

  export type AggregateArenaParticipation = {
    _count: ArenaParticipationCountAggregateOutputType | null
    _avg: ArenaParticipationAvgAggregateOutputType | null
    _sum: ArenaParticipationSumAggregateOutputType | null
    _min: ArenaParticipationMinAggregateOutputType | null
    _max: ArenaParticipationMaxAggregateOutputType | null
  }

  export type ArenaParticipationAvgAggregateOutputType = {
    finalBalance: number | null
    pnl: number | null
    pnlPercent: number | null
    sharpeRatio: number | null
    winRate: number | null
    totalTrades: number | null
    rank: number | null
  }

  export type ArenaParticipationSumAggregateOutputType = {
    finalBalance: number | null
    pnl: number | null
    pnlPercent: number | null
    sharpeRatio: number | null
    winRate: number | null
    totalTrades: number | null
    rank: number | null
  }

  export type ArenaParticipationMinAggregateOutputType = {
    id: string | null
    simulationId: string | null
    agentId: string | null
    finalBalance: number | null
    pnl: number | null
    pnlPercent: number | null
    sharpeRatio: number | null
    winRate: number | null
    totalTrades: number | null
    rank: number | null
  }

  export type ArenaParticipationMaxAggregateOutputType = {
    id: string | null
    simulationId: string | null
    agentId: string | null
    finalBalance: number | null
    pnl: number | null
    pnlPercent: number | null
    sharpeRatio: number | null
    winRate: number | null
    totalTrades: number | null
    rank: number | null
  }

  export type ArenaParticipationCountAggregateOutputType = {
    id: number
    simulationId: number
    agentId: number
    finalBalance: number
    pnl: number
    pnlPercent: number
    sharpeRatio: number
    winRate: number
    totalTrades: number
    rank: number
    _all: number
  }


  export type ArenaParticipationAvgAggregateInputType = {
    finalBalance?: true
    pnl?: true
    pnlPercent?: true
    sharpeRatio?: true
    winRate?: true
    totalTrades?: true
    rank?: true
  }

  export type ArenaParticipationSumAggregateInputType = {
    finalBalance?: true
    pnl?: true
    pnlPercent?: true
    sharpeRatio?: true
    winRate?: true
    totalTrades?: true
    rank?: true
  }

  export type ArenaParticipationMinAggregateInputType = {
    id?: true
    simulationId?: true
    agentId?: true
    finalBalance?: true
    pnl?: true
    pnlPercent?: true
    sharpeRatio?: true
    winRate?: true
    totalTrades?: true
    rank?: true
  }

  export type ArenaParticipationMaxAggregateInputType = {
    id?: true
    simulationId?: true
    agentId?: true
    finalBalance?: true
    pnl?: true
    pnlPercent?: true
    sharpeRatio?: true
    winRate?: true
    totalTrades?: true
    rank?: true
  }

  export type ArenaParticipationCountAggregateInputType = {
    id?: true
    simulationId?: true
    agentId?: true
    finalBalance?: true
    pnl?: true
    pnlPercent?: true
    sharpeRatio?: true
    winRate?: true
    totalTrades?: true
    rank?: true
    _all?: true
  }

  export type ArenaParticipationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaParticipation to aggregate.
     */
    where?: ArenaParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaParticipations to fetch.
     */
    orderBy?: ArenaParticipationOrderByWithRelationInput | ArenaParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArenaParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaParticipations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArenaParticipations
    **/
    _count?: true | ArenaParticipationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArenaParticipationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArenaParticipationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArenaParticipationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArenaParticipationMaxAggregateInputType
  }

  export type GetArenaParticipationAggregateType<T extends ArenaParticipationAggregateArgs> = {
        [P in keyof T & keyof AggregateArenaParticipation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArenaParticipation[P]>
      : GetScalarType<T[P], AggregateArenaParticipation[P]>
  }




  export type ArenaParticipationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaParticipationWhereInput
    orderBy?: ArenaParticipationOrderByWithAggregationInput | ArenaParticipationOrderByWithAggregationInput[]
    by: ArenaParticipationScalarFieldEnum[] | ArenaParticipationScalarFieldEnum
    having?: ArenaParticipationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArenaParticipationCountAggregateInputType | true
    _avg?: ArenaParticipationAvgAggregateInputType
    _sum?: ArenaParticipationSumAggregateInputType
    _min?: ArenaParticipationMinAggregateInputType
    _max?: ArenaParticipationMaxAggregateInputType
  }

  export type ArenaParticipationGroupByOutputType = {
    id: string
    simulationId: string
    agentId: string
    finalBalance: number | null
    pnl: number | null
    pnlPercent: number | null
    sharpeRatio: number | null
    winRate: number | null
    totalTrades: number
    rank: number | null
    _count: ArenaParticipationCountAggregateOutputType | null
    _avg: ArenaParticipationAvgAggregateOutputType | null
    _sum: ArenaParticipationSumAggregateOutputType | null
    _min: ArenaParticipationMinAggregateOutputType | null
    _max: ArenaParticipationMaxAggregateOutputType | null
  }

  type GetArenaParticipationGroupByPayload<T extends ArenaParticipationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArenaParticipationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArenaParticipationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArenaParticipationGroupByOutputType[P]>
            : GetScalarType<T[P], ArenaParticipationGroupByOutputType[P]>
        }
      >
    >


  export type ArenaParticipationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    agentId?: boolean
    finalBalance?: boolean
    pnl?: boolean
    pnlPercent?: boolean
    sharpeRatio?: boolean
    winRate?: boolean
    totalTrades?: boolean
    rank?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    agent?: boolean | ArenaAgentDefaultArgs<ExtArgs>
    trades?: boolean | ArenaParticipation$tradesArgs<ExtArgs>
    _count?: boolean | ArenaParticipationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaParticipation"]>

  export type ArenaParticipationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    agentId?: boolean
    finalBalance?: boolean
    pnl?: boolean
    pnlPercent?: boolean
    sharpeRatio?: boolean
    winRate?: boolean
    totalTrades?: boolean
    rank?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    agent?: boolean | ArenaAgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaParticipation"]>

  export type ArenaParticipationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    agentId?: boolean
    finalBalance?: boolean
    pnl?: boolean
    pnlPercent?: boolean
    sharpeRatio?: boolean
    winRate?: boolean
    totalTrades?: boolean
    rank?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    agent?: boolean | ArenaAgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaParticipation"]>

  export type ArenaParticipationSelectScalar = {
    id?: boolean
    simulationId?: boolean
    agentId?: boolean
    finalBalance?: boolean
    pnl?: boolean
    pnlPercent?: boolean
    sharpeRatio?: boolean
    winRate?: boolean
    totalTrades?: boolean
    rank?: boolean
  }

  export type ArenaParticipationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "simulationId" | "agentId" | "finalBalance" | "pnl" | "pnlPercent" | "sharpeRatio" | "winRate" | "totalTrades" | "rank", ExtArgs["result"]["arenaParticipation"]>
  export type ArenaParticipationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    agent?: boolean | ArenaAgentDefaultArgs<ExtArgs>
    trades?: boolean | ArenaParticipation$tradesArgs<ExtArgs>
    _count?: boolean | ArenaParticipationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArenaParticipationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    agent?: boolean | ArenaAgentDefaultArgs<ExtArgs>
  }
  export type ArenaParticipationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    agent?: boolean | ArenaAgentDefaultArgs<ExtArgs>
  }

  export type $ArenaParticipationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArenaParticipation"
    objects: {
      simulation: Prisma.$ArenaSimulationPayload<ExtArgs>
      agent: Prisma.$ArenaAgentPayload<ExtArgs>
      trades: Prisma.$ArenaTradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      simulationId: string
      agentId: string
      finalBalance: number | null
      pnl: number | null
      pnlPercent: number | null
      sharpeRatio: number | null
      winRate: number | null
      totalTrades: number
      rank: number | null
    }, ExtArgs["result"]["arenaParticipation"]>
    composites: {}
  }

  type ArenaParticipationGetPayload<S extends boolean | null | undefined | ArenaParticipationDefaultArgs> = $Result.GetResult<Prisma.$ArenaParticipationPayload, S>

  type ArenaParticipationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArenaParticipationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArenaParticipationCountAggregateInputType | true
    }

  export interface ArenaParticipationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArenaParticipation'], meta: { name: 'ArenaParticipation' } }
    /**
     * Find zero or one ArenaParticipation that matches the filter.
     * @param {ArenaParticipationFindUniqueArgs} args - Arguments to find a ArenaParticipation
     * @example
     * // Get one ArenaParticipation
     * const arenaParticipation = await prisma.arenaParticipation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArenaParticipationFindUniqueArgs>(args: SelectSubset<T, ArenaParticipationFindUniqueArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArenaParticipation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArenaParticipationFindUniqueOrThrowArgs} args - Arguments to find a ArenaParticipation
     * @example
     * // Get one ArenaParticipation
     * const arenaParticipation = await prisma.arenaParticipation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArenaParticipationFindUniqueOrThrowArgs>(args: SelectSubset<T, ArenaParticipationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaParticipation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaParticipationFindFirstArgs} args - Arguments to find a ArenaParticipation
     * @example
     * // Get one ArenaParticipation
     * const arenaParticipation = await prisma.arenaParticipation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArenaParticipationFindFirstArgs>(args?: SelectSubset<T, ArenaParticipationFindFirstArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaParticipation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaParticipationFindFirstOrThrowArgs} args - Arguments to find a ArenaParticipation
     * @example
     * // Get one ArenaParticipation
     * const arenaParticipation = await prisma.arenaParticipation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArenaParticipationFindFirstOrThrowArgs>(args?: SelectSubset<T, ArenaParticipationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArenaParticipations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaParticipationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArenaParticipations
     * const arenaParticipations = await prisma.arenaParticipation.findMany()
     * 
     * // Get first 10 ArenaParticipations
     * const arenaParticipations = await prisma.arenaParticipation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arenaParticipationWithIdOnly = await prisma.arenaParticipation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArenaParticipationFindManyArgs>(args?: SelectSubset<T, ArenaParticipationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArenaParticipation.
     * @param {ArenaParticipationCreateArgs} args - Arguments to create a ArenaParticipation.
     * @example
     * // Create one ArenaParticipation
     * const ArenaParticipation = await prisma.arenaParticipation.create({
     *   data: {
     *     // ... data to create a ArenaParticipation
     *   }
     * })
     * 
     */
    create<T extends ArenaParticipationCreateArgs>(args: SelectSubset<T, ArenaParticipationCreateArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArenaParticipations.
     * @param {ArenaParticipationCreateManyArgs} args - Arguments to create many ArenaParticipations.
     * @example
     * // Create many ArenaParticipations
     * const arenaParticipation = await prisma.arenaParticipation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArenaParticipationCreateManyArgs>(args?: SelectSubset<T, ArenaParticipationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArenaParticipations and returns the data saved in the database.
     * @param {ArenaParticipationCreateManyAndReturnArgs} args - Arguments to create many ArenaParticipations.
     * @example
     * // Create many ArenaParticipations
     * const arenaParticipation = await prisma.arenaParticipation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArenaParticipations and only return the `id`
     * const arenaParticipationWithIdOnly = await prisma.arenaParticipation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArenaParticipationCreateManyAndReturnArgs>(args?: SelectSubset<T, ArenaParticipationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArenaParticipation.
     * @param {ArenaParticipationDeleteArgs} args - Arguments to delete one ArenaParticipation.
     * @example
     * // Delete one ArenaParticipation
     * const ArenaParticipation = await prisma.arenaParticipation.delete({
     *   where: {
     *     // ... filter to delete one ArenaParticipation
     *   }
     * })
     * 
     */
    delete<T extends ArenaParticipationDeleteArgs>(args: SelectSubset<T, ArenaParticipationDeleteArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArenaParticipation.
     * @param {ArenaParticipationUpdateArgs} args - Arguments to update one ArenaParticipation.
     * @example
     * // Update one ArenaParticipation
     * const arenaParticipation = await prisma.arenaParticipation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArenaParticipationUpdateArgs>(args: SelectSubset<T, ArenaParticipationUpdateArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArenaParticipations.
     * @param {ArenaParticipationDeleteManyArgs} args - Arguments to filter ArenaParticipations to delete.
     * @example
     * // Delete a few ArenaParticipations
     * const { count } = await prisma.arenaParticipation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArenaParticipationDeleteManyArgs>(args?: SelectSubset<T, ArenaParticipationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaParticipations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaParticipationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArenaParticipations
     * const arenaParticipation = await prisma.arenaParticipation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArenaParticipationUpdateManyArgs>(args: SelectSubset<T, ArenaParticipationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaParticipations and returns the data updated in the database.
     * @param {ArenaParticipationUpdateManyAndReturnArgs} args - Arguments to update many ArenaParticipations.
     * @example
     * // Update many ArenaParticipations
     * const arenaParticipation = await prisma.arenaParticipation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArenaParticipations and only return the `id`
     * const arenaParticipationWithIdOnly = await prisma.arenaParticipation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArenaParticipationUpdateManyAndReturnArgs>(args: SelectSubset<T, ArenaParticipationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArenaParticipation.
     * @param {ArenaParticipationUpsertArgs} args - Arguments to update or create a ArenaParticipation.
     * @example
     * // Update or create a ArenaParticipation
     * const arenaParticipation = await prisma.arenaParticipation.upsert({
     *   create: {
     *     // ... data to create a ArenaParticipation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArenaParticipation we want to update
     *   }
     * })
     */
    upsert<T extends ArenaParticipationUpsertArgs>(args: SelectSubset<T, ArenaParticipationUpsertArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArenaParticipations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaParticipationCountArgs} args - Arguments to filter ArenaParticipations to count.
     * @example
     * // Count the number of ArenaParticipations
     * const count = await prisma.arenaParticipation.count({
     *   where: {
     *     // ... the filter for the ArenaParticipations we want to count
     *   }
     * })
    **/
    count<T extends ArenaParticipationCountArgs>(
      args?: Subset<T, ArenaParticipationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArenaParticipationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArenaParticipation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaParticipationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArenaParticipationAggregateArgs>(args: Subset<T, ArenaParticipationAggregateArgs>): Prisma.PrismaPromise<GetArenaParticipationAggregateType<T>>

    /**
     * Group by ArenaParticipation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaParticipationGroupByArgs} args - Group by arguments.
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
      T extends ArenaParticipationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArenaParticipationGroupByArgs['orderBy'] }
        : { orderBy?: ArenaParticipationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArenaParticipationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArenaParticipationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArenaParticipation model
   */
  readonly fields: ArenaParticipationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArenaParticipation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArenaParticipationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    simulation<T extends ArenaSimulationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArenaSimulationDefaultArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    agent<T extends ArenaAgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArenaAgentDefaultArgs<ExtArgs>>): Prisma__ArenaAgentClient<$Result.GetResult<Prisma.$ArenaAgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trades<T extends ArenaParticipation$tradesArgs<ExtArgs> = {}>(args?: Subset<T, ArenaParticipation$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ArenaParticipation model
   */
  interface ArenaParticipationFieldRefs {
    readonly id: FieldRef<"ArenaParticipation", 'String'>
    readonly simulationId: FieldRef<"ArenaParticipation", 'String'>
    readonly agentId: FieldRef<"ArenaParticipation", 'String'>
    readonly finalBalance: FieldRef<"ArenaParticipation", 'Float'>
    readonly pnl: FieldRef<"ArenaParticipation", 'Float'>
    readonly pnlPercent: FieldRef<"ArenaParticipation", 'Float'>
    readonly sharpeRatio: FieldRef<"ArenaParticipation", 'Float'>
    readonly winRate: FieldRef<"ArenaParticipation", 'Float'>
    readonly totalTrades: FieldRef<"ArenaParticipation", 'Int'>
    readonly rank: FieldRef<"ArenaParticipation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ArenaParticipation findUnique
   */
  export type ArenaParticipationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaParticipation to fetch.
     */
    where: ArenaParticipationWhereUniqueInput
  }

  /**
   * ArenaParticipation findUniqueOrThrow
   */
  export type ArenaParticipationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaParticipation to fetch.
     */
    where: ArenaParticipationWhereUniqueInput
  }

  /**
   * ArenaParticipation findFirst
   */
  export type ArenaParticipationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaParticipation to fetch.
     */
    where?: ArenaParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaParticipations to fetch.
     */
    orderBy?: ArenaParticipationOrderByWithRelationInput | ArenaParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaParticipations.
     */
    cursor?: ArenaParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaParticipations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaParticipations.
     */
    distinct?: ArenaParticipationScalarFieldEnum | ArenaParticipationScalarFieldEnum[]
  }

  /**
   * ArenaParticipation findFirstOrThrow
   */
  export type ArenaParticipationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaParticipation to fetch.
     */
    where?: ArenaParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaParticipations to fetch.
     */
    orderBy?: ArenaParticipationOrderByWithRelationInput | ArenaParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaParticipations.
     */
    cursor?: ArenaParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaParticipations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaParticipations.
     */
    distinct?: ArenaParticipationScalarFieldEnum | ArenaParticipationScalarFieldEnum[]
  }

  /**
   * ArenaParticipation findMany
   */
  export type ArenaParticipationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * Filter, which ArenaParticipations to fetch.
     */
    where?: ArenaParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaParticipations to fetch.
     */
    orderBy?: ArenaParticipationOrderByWithRelationInput | ArenaParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArenaParticipations.
     */
    cursor?: ArenaParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaParticipations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaParticipations.
     */
    skip?: number
    distinct?: ArenaParticipationScalarFieldEnum | ArenaParticipationScalarFieldEnum[]
  }

  /**
   * ArenaParticipation create
   */
  export type ArenaParticipationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * The data needed to create a ArenaParticipation.
     */
    data: XOR<ArenaParticipationCreateInput, ArenaParticipationUncheckedCreateInput>
  }

  /**
   * ArenaParticipation createMany
   */
  export type ArenaParticipationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArenaParticipations.
     */
    data: ArenaParticipationCreateManyInput | ArenaParticipationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaParticipation createManyAndReturn
   */
  export type ArenaParticipationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * The data used to create many ArenaParticipations.
     */
    data: ArenaParticipationCreateManyInput | ArenaParticipationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArenaParticipation update
   */
  export type ArenaParticipationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * The data needed to update a ArenaParticipation.
     */
    data: XOR<ArenaParticipationUpdateInput, ArenaParticipationUncheckedUpdateInput>
    /**
     * Choose, which ArenaParticipation to update.
     */
    where: ArenaParticipationWhereUniqueInput
  }

  /**
   * ArenaParticipation updateMany
   */
  export type ArenaParticipationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArenaParticipations.
     */
    data: XOR<ArenaParticipationUpdateManyMutationInput, ArenaParticipationUncheckedUpdateManyInput>
    /**
     * Filter which ArenaParticipations to update
     */
    where?: ArenaParticipationWhereInput
    /**
     * Limit how many ArenaParticipations to update.
     */
    limit?: number
  }

  /**
   * ArenaParticipation updateManyAndReturn
   */
  export type ArenaParticipationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * The data used to update ArenaParticipations.
     */
    data: XOR<ArenaParticipationUpdateManyMutationInput, ArenaParticipationUncheckedUpdateManyInput>
    /**
     * Filter which ArenaParticipations to update
     */
    where?: ArenaParticipationWhereInput
    /**
     * Limit how many ArenaParticipations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArenaParticipation upsert
   */
  export type ArenaParticipationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * The filter to search for the ArenaParticipation to update in case it exists.
     */
    where: ArenaParticipationWhereUniqueInput
    /**
     * In case the ArenaParticipation found by the `where` argument doesn't exist, create a new ArenaParticipation with this data.
     */
    create: XOR<ArenaParticipationCreateInput, ArenaParticipationUncheckedCreateInput>
    /**
     * In case the ArenaParticipation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArenaParticipationUpdateInput, ArenaParticipationUncheckedUpdateInput>
  }

  /**
   * ArenaParticipation delete
   */
  export type ArenaParticipationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
    /**
     * Filter which ArenaParticipation to delete.
     */
    where: ArenaParticipationWhereUniqueInput
  }

  /**
   * ArenaParticipation deleteMany
   */
  export type ArenaParticipationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaParticipations to delete
     */
    where?: ArenaParticipationWhereInput
    /**
     * Limit how many ArenaParticipations to delete.
     */
    limit?: number
  }

  /**
   * ArenaParticipation.trades
   */
  export type ArenaParticipation$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    where?: ArenaTradeWhereInput
    orderBy?: ArenaTradeOrderByWithRelationInput | ArenaTradeOrderByWithRelationInput[]
    cursor?: ArenaTradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArenaTradeScalarFieldEnum | ArenaTradeScalarFieldEnum[]
  }

  /**
   * ArenaParticipation without action
   */
  export type ArenaParticipationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaParticipation
     */
    select?: ArenaParticipationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaParticipation
     */
    omit?: ArenaParticipationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaParticipationInclude<ExtArgs> | null
  }


  /**
   * Model ArenaTrade
   */

  export type AggregateArenaTrade = {
    _count: ArenaTradeCountAggregateOutputType | null
    _avg: ArenaTradeAvgAggregateOutputType | null
    _sum: ArenaTradeSumAggregateOutputType | null
    _min: ArenaTradeMinAggregateOutputType | null
    _max: ArenaTradeMaxAggregateOutputType | null
  }

  export type ArenaTradeAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
    total: number | null
  }

  export type ArenaTradeSumAggregateOutputType = {
    quantity: number | null
    price: number | null
    total: number | null
  }

  export type ArenaTradeMinAggregateOutputType = {
    id: string | null
    simulationId: string | null
    participationId: string | null
    timestamp: Date | null
    action: string | null
    asset: string | null
    quantity: number | null
    price: number | null
    total: number | null
    reasoning: string | null
  }

  export type ArenaTradeMaxAggregateOutputType = {
    id: string | null
    simulationId: string | null
    participationId: string | null
    timestamp: Date | null
    action: string | null
    asset: string | null
    quantity: number | null
    price: number | null
    total: number | null
    reasoning: string | null
  }

  export type ArenaTradeCountAggregateOutputType = {
    id: number
    simulationId: number
    participationId: number
    timestamp: number
    action: number
    asset: number
    quantity: number
    price: number
    total: number
    reasoning: number
    _all: number
  }


  export type ArenaTradeAvgAggregateInputType = {
    quantity?: true
    price?: true
    total?: true
  }

  export type ArenaTradeSumAggregateInputType = {
    quantity?: true
    price?: true
    total?: true
  }

  export type ArenaTradeMinAggregateInputType = {
    id?: true
    simulationId?: true
    participationId?: true
    timestamp?: true
    action?: true
    asset?: true
    quantity?: true
    price?: true
    total?: true
    reasoning?: true
  }

  export type ArenaTradeMaxAggregateInputType = {
    id?: true
    simulationId?: true
    participationId?: true
    timestamp?: true
    action?: true
    asset?: true
    quantity?: true
    price?: true
    total?: true
    reasoning?: true
  }

  export type ArenaTradeCountAggregateInputType = {
    id?: true
    simulationId?: true
    participationId?: true
    timestamp?: true
    action?: true
    asset?: true
    quantity?: true
    price?: true
    total?: true
    reasoning?: true
    _all?: true
  }

  export type ArenaTradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaTrade to aggregate.
     */
    where?: ArenaTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaTrades to fetch.
     */
    orderBy?: ArenaTradeOrderByWithRelationInput | ArenaTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArenaTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaTrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArenaTrades
    **/
    _count?: true | ArenaTradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArenaTradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArenaTradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArenaTradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArenaTradeMaxAggregateInputType
  }

  export type GetArenaTradeAggregateType<T extends ArenaTradeAggregateArgs> = {
        [P in keyof T & keyof AggregateArenaTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArenaTrade[P]>
      : GetScalarType<T[P], AggregateArenaTrade[P]>
  }




  export type ArenaTradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaTradeWhereInput
    orderBy?: ArenaTradeOrderByWithAggregationInput | ArenaTradeOrderByWithAggregationInput[]
    by: ArenaTradeScalarFieldEnum[] | ArenaTradeScalarFieldEnum
    having?: ArenaTradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArenaTradeCountAggregateInputType | true
    _avg?: ArenaTradeAvgAggregateInputType
    _sum?: ArenaTradeSumAggregateInputType
    _min?: ArenaTradeMinAggregateInputType
    _max?: ArenaTradeMaxAggregateInputType
  }

  export type ArenaTradeGroupByOutputType = {
    id: string
    simulationId: string
    participationId: string
    timestamp: Date
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning: string | null
    _count: ArenaTradeCountAggregateOutputType | null
    _avg: ArenaTradeAvgAggregateOutputType | null
    _sum: ArenaTradeSumAggregateOutputType | null
    _min: ArenaTradeMinAggregateOutputType | null
    _max: ArenaTradeMaxAggregateOutputType | null
  }

  type GetArenaTradeGroupByPayload<T extends ArenaTradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArenaTradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArenaTradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArenaTradeGroupByOutputType[P]>
            : GetScalarType<T[P], ArenaTradeGroupByOutputType[P]>
        }
      >
    >


  export type ArenaTradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    participationId?: boolean
    timestamp?: boolean
    action?: boolean
    asset?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
    reasoning?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    participation?: boolean | ArenaParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaTrade"]>

  export type ArenaTradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    participationId?: boolean
    timestamp?: boolean
    action?: boolean
    asset?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
    reasoning?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    participation?: boolean | ArenaParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaTrade"]>

  export type ArenaTradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    participationId?: boolean
    timestamp?: boolean
    action?: boolean
    asset?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
    reasoning?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    participation?: boolean | ArenaParticipationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaTrade"]>

  export type ArenaTradeSelectScalar = {
    id?: boolean
    simulationId?: boolean
    participationId?: boolean
    timestamp?: boolean
    action?: boolean
    asset?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
    reasoning?: boolean
  }

  export type ArenaTradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "simulationId" | "participationId" | "timestamp" | "action" | "asset" | "quantity" | "price" | "total" | "reasoning", ExtArgs["result"]["arenaTrade"]>
  export type ArenaTradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    participation?: boolean | ArenaParticipationDefaultArgs<ExtArgs>
  }
  export type ArenaTradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    participation?: boolean | ArenaParticipationDefaultArgs<ExtArgs>
  }
  export type ArenaTradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
    participation?: boolean | ArenaParticipationDefaultArgs<ExtArgs>
  }

  export type $ArenaTradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArenaTrade"
    objects: {
      simulation: Prisma.$ArenaSimulationPayload<ExtArgs>
      participation: Prisma.$ArenaParticipationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      simulationId: string
      participationId: string
      timestamp: Date
      action: string
      asset: string
      quantity: number
      price: number
      total: number
      reasoning: string | null
    }, ExtArgs["result"]["arenaTrade"]>
    composites: {}
  }

  type ArenaTradeGetPayload<S extends boolean | null | undefined | ArenaTradeDefaultArgs> = $Result.GetResult<Prisma.$ArenaTradePayload, S>

  type ArenaTradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArenaTradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArenaTradeCountAggregateInputType | true
    }

  export interface ArenaTradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArenaTrade'], meta: { name: 'ArenaTrade' } }
    /**
     * Find zero or one ArenaTrade that matches the filter.
     * @param {ArenaTradeFindUniqueArgs} args - Arguments to find a ArenaTrade
     * @example
     * // Get one ArenaTrade
     * const arenaTrade = await prisma.arenaTrade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArenaTradeFindUniqueArgs>(args: SelectSubset<T, ArenaTradeFindUniqueArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArenaTrade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArenaTradeFindUniqueOrThrowArgs} args - Arguments to find a ArenaTrade
     * @example
     * // Get one ArenaTrade
     * const arenaTrade = await prisma.arenaTrade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArenaTradeFindUniqueOrThrowArgs>(args: SelectSubset<T, ArenaTradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaTrade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaTradeFindFirstArgs} args - Arguments to find a ArenaTrade
     * @example
     * // Get one ArenaTrade
     * const arenaTrade = await prisma.arenaTrade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArenaTradeFindFirstArgs>(args?: SelectSubset<T, ArenaTradeFindFirstArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaTrade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaTradeFindFirstOrThrowArgs} args - Arguments to find a ArenaTrade
     * @example
     * // Get one ArenaTrade
     * const arenaTrade = await prisma.arenaTrade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArenaTradeFindFirstOrThrowArgs>(args?: SelectSubset<T, ArenaTradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArenaTrades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaTradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArenaTrades
     * const arenaTrades = await prisma.arenaTrade.findMany()
     * 
     * // Get first 10 ArenaTrades
     * const arenaTrades = await prisma.arenaTrade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arenaTradeWithIdOnly = await prisma.arenaTrade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArenaTradeFindManyArgs>(args?: SelectSubset<T, ArenaTradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArenaTrade.
     * @param {ArenaTradeCreateArgs} args - Arguments to create a ArenaTrade.
     * @example
     * // Create one ArenaTrade
     * const ArenaTrade = await prisma.arenaTrade.create({
     *   data: {
     *     // ... data to create a ArenaTrade
     *   }
     * })
     * 
     */
    create<T extends ArenaTradeCreateArgs>(args: SelectSubset<T, ArenaTradeCreateArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArenaTrades.
     * @param {ArenaTradeCreateManyArgs} args - Arguments to create many ArenaTrades.
     * @example
     * // Create many ArenaTrades
     * const arenaTrade = await prisma.arenaTrade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArenaTradeCreateManyArgs>(args?: SelectSubset<T, ArenaTradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArenaTrades and returns the data saved in the database.
     * @param {ArenaTradeCreateManyAndReturnArgs} args - Arguments to create many ArenaTrades.
     * @example
     * // Create many ArenaTrades
     * const arenaTrade = await prisma.arenaTrade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArenaTrades and only return the `id`
     * const arenaTradeWithIdOnly = await prisma.arenaTrade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArenaTradeCreateManyAndReturnArgs>(args?: SelectSubset<T, ArenaTradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArenaTrade.
     * @param {ArenaTradeDeleteArgs} args - Arguments to delete one ArenaTrade.
     * @example
     * // Delete one ArenaTrade
     * const ArenaTrade = await prisma.arenaTrade.delete({
     *   where: {
     *     // ... filter to delete one ArenaTrade
     *   }
     * })
     * 
     */
    delete<T extends ArenaTradeDeleteArgs>(args: SelectSubset<T, ArenaTradeDeleteArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArenaTrade.
     * @param {ArenaTradeUpdateArgs} args - Arguments to update one ArenaTrade.
     * @example
     * // Update one ArenaTrade
     * const arenaTrade = await prisma.arenaTrade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArenaTradeUpdateArgs>(args: SelectSubset<T, ArenaTradeUpdateArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArenaTrades.
     * @param {ArenaTradeDeleteManyArgs} args - Arguments to filter ArenaTrades to delete.
     * @example
     * // Delete a few ArenaTrades
     * const { count } = await prisma.arenaTrade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArenaTradeDeleteManyArgs>(args?: SelectSubset<T, ArenaTradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaTrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaTradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArenaTrades
     * const arenaTrade = await prisma.arenaTrade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArenaTradeUpdateManyArgs>(args: SelectSubset<T, ArenaTradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaTrades and returns the data updated in the database.
     * @param {ArenaTradeUpdateManyAndReturnArgs} args - Arguments to update many ArenaTrades.
     * @example
     * // Update many ArenaTrades
     * const arenaTrade = await prisma.arenaTrade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArenaTrades and only return the `id`
     * const arenaTradeWithIdOnly = await prisma.arenaTrade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArenaTradeUpdateManyAndReturnArgs>(args: SelectSubset<T, ArenaTradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArenaTrade.
     * @param {ArenaTradeUpsertArgs} args - Arguments to update or create a ArenaTrade.
     * @example
     * // Update or create a ArenaTrade
     * const arenaTrade = await prisma.arenaTrade.upsert({
     *   create: {
     *     // ... data to create a ArenaTrade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArenaTrade we want to update
     *   }
     * })
     */
    upsert<T extends ArenaTradeUpsertArgs>(args: SelectSubset<T, ArenaTradeUpsertArgs<ExtArgs>>): Prisma__ArenaTradeClient<$Result.GetResult<Prisma.$ArenaTradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArenaTrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaTradeCountArgs} args - Arguments to filter ArenaTrades to count.
     * @example
     * // Count the number of ArenaTrades
     * const count = await prisma.arenaTrade.count({
     *   where: {
     *     // ... the filter for the ArenaTrades we want to count
     *   }
     * })
    **/
    count<T extends ArenaTradeCountArgs>(
      args?: Subset<T, ArenaTradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArenaTradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArenaTrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaTradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArenaTradeAggregateArgs>(args: Subset<T, ArenaTradeAggregateArgs>): Prisma.PrismaPromise<GetArenaTradeAggregateType<T>>

    /**
     * Group by ArenaTrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaTradeGroupByArgs} args - Group by arguments.
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
      T extends ArenaTradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArenaTradeGroupByArgs['orderBy'] }
        : { orderBy?: ArenaTradeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArenaTradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArenaTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArenaTrade model
   */
  readonly fields: ArenaTradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArenaTrade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArenaTradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    simulation<T extends ArenaSimulationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArenaSimulationDefaultArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    participation<T extends ArenaParticipationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArenaParticipationDefaultArgs<ExtArgs>>): Prisma__ArenaParticipationClient<$Result.GetResult<Prisma.$ArenaParticipationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ArenaTrade model
   */
  interface ArenaTradeFieldRefs {
    readonly id: FieldRef<"ArenaTrade", 'String'>
    readonly simulationId: FieldRef<"ArenaTrade", 'String'>
    readonly participationId: FieldRef<"ArenaTrade", 'String'>
    readonly timestamp: FieldRef<"ArenaTrade", 'DateTime'>
    readonly action: FieldRef<"ArenaTrade", 'String'>
    readonly asset: FieldRef<"ArenaTrade", 'String'>
    readonly quantity: FieldRef<"ArenaTrade", 'Float'>
    readonly price: FieldRef<"ArenaTrade", 'Float'>
    readonly total: FieldRef<"ArenaTrade", 'Float'>
    readonly reasoning: FieldRef<"ArenaTrade", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ArenaTrade findUnique
   */
  export type ArenaTradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * Filter, which ArenaTrade to fetch.
     */
    where: ArenaTradeWhereUniqueInput
  }

  /**
   * ArenaTrade findUniqueOrThrow
   */
  export type ArenaTradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * Filter, which ArenaTrade to fetch.
     */
    where: ArenaTradeWhereUniqueInput
  }

  /**
   * ArenaTrade findFirst
   */
  export type ArenaTradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * Filter, which ArenaTrade to fetch.
     */
    where?: ArenaTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaTrades to fetch.
     */
    orderBy?: ArenaTradeOrderByWithRelationInput | ArenaTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaTrades.
     */
    cursor?: ArenaTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaTrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaTrades.
     */
    distinct?: ArenaTradeScalarFieldEnum | ArenaTradeScalarFieldEnum[]
  }

  /**
   * ArenaTrade findFirstOrThrow
   */
  export type ArenaTradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * Filter, which ArenaTrade to fetch.
     */
    where?: ArenaTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaTrades to fetch.
     */
    orderBy?: ArenaTradeOrderByWithRelationInput | ArenaTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaTrades.
     */
    cursor?: ArenaTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaTrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaTrades.
     */
    distinct?: ArenaTradeScalarFieldEnum | ArenaTradeScalarFieldEnum[]
  }

  /**
   * ArenaTrade findMany
   */
  export type ArenaTradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * Filter, which ArenaTrades to fetch.
     */
    where?: ArenaTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaTrades to fetch.
     */
    orderBy?: ArenaTradeOrderByWithRelationInput | ArenaTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArenaTrades.
     */
    cursor?: ArenaTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaTrades.
     */
    skip?: number
    distinct?: ArenaTradeScalarFieldEnum | ArenaTradeScalarFieldEnum[]
  }

  /**
   * ArenaTrade create
   */
  export type ArenaTradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * The data needed to create a ArenaTrade.
     */
    data: XOR<ArenaTradeCreateInput, ArenaTradeUncheckedCreateInput>
  }

  /**
   * ArenaTrade createMany
   */
  export type ArenaTradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArenaTrades.
     */
    data: ArenaTradeCreateManyInput | ArenaTradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaTrade createManyAndReturn
   */
  export type ArenaTradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * The data used to create many ArenaTrades.
     */
    data: ArenaTradeCreateManyInput | ArenaTradeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArenaTrade update
   */
  export type ArenaTradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * The data needed to update a ArenaTrade.
     */
    data: XOR<ArenaTradeUpdateInput, ArenaTradeUncheckedUpdateInput>
    /**
     * Choose, which ArenaTrade to update.
     */
    where: ArenaTradeWhereUniqueInput
  }

  /**
   * ArenaTrade updateMany
   */
  export type ArenaTradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArenaTrades.
     */
    data: XOR<ArenaTradeUpdateManyMutationInput, ArenaTradeUncheckedUpdateManyInput>
    /**
     * Filter which ArenaTrades to update
     */
    where?: ArenaTradeWhereInput
    /**
     * Limit how many ArenaTrades to update.
     */
    limit?: number
  }

  /**
   * ArenaTrade updateManyAndReturn
   */
  export type ArenaTradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * The data used to update ArenaTrades.
     */
    data: XOR<ArenaTradeUpdateManyMutationInput, ArenaTradeUncheckedUpdateManyInput>
    /**
     * Filter which ArenaTrades to update
     */
    where?: ArenaTradeWhereInput
    /**
     * Limit how many ArenaTrades to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArenaTrade upsert
   */
  export type ArenaTradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * The filter to search for the ArenaTrade to update in case it exists.
     */
    where: ArenaTradeWhereUniqueInput
    /**
     * In case the ArenaTrade found by the `where` argument doesn't exist, create a new ArenaTrade with this data.
     */
    create: XOR<ArenaTradeCreateInput, ArenaTradeUncheckedCreateInput>
    /**
     * In case the ArenaTrade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArenaTradeUpdateInput, ArenaTradeUncheckedUpdateInput>
  }

  /**
   * ArenaTrade delete
   */
  export type ArenaTradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
    /**
     * Filter which ArenaTrade to delete.
     */
    where: ArenaTradeWhereUniqueInput
  }

  /**
   * ArenaTrade deleteMany
   */
  export type ArenaTradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaTrades to delete
     */
    where?: ArenaTradeWhereInput
    /**
     * Limit how many ArenaTrades to delete.
     */
    limit?: number
  }

  /**
   * ArenaTrade without action
   */
  export type ArenaTradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaTrade
     */
    select?: ArenaTradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaTrade
     */
    omit?: ArenaTradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaTradeInclude<ExtArgs> | null
  }


  /**
   * Model ArenaSnapshot
   */

  export type AggregateArenaSnapshot = {
    _count: ArenaSnapshotCountAggregateOutputType | null
    _avg: ArenaSnapshotAvgAggregateOutputType | null
    _sum: ArenaSnapshotSumAggregateOutputType | null
    _min: ArenaSnapshotMinAggregateOutputType | null
    _max: ArenaSnapshotMaxAggregateOutputType | null
  }

  export type ArenaSnapshotAvgAggregateOutputType = {
    tick: number | null
    price: number | null
  }

  export type ArenaSnapshotSumAggregateOutputType = {
    tick: number | null
    price: number | null
  }

  export type ArenaSnapshotMinAggregateOutputType = {
    id: string | null
    simulationId: string | null
    timestamp: Date | null
    tick: number | null
    price: number | null
  }

  export type ArenaSnapshotMaxAggregateOutputType = {
    id: string | null
    simulationId: string | null
    timestamp: Date | null
    tick: number | null
    price: number | null
  }

  export type ArenaSnapshotCountAggregateOutputType = {
    id: number
    simulationId: number
    timestamp: number
    tick: number
    price: number
    data: number
    _all: number
  }


  export type ArenaSnapshotAvgAggregateInputType = {
    tick?: true
    price?: true
  }

  export type ArenaSnapshotSumAggregateInputType = {
    tick?: true
    price?: true
  }

  export type ArenaSnapshotMinAggregateInputType = {
    id?: true
    simulationId?: true
    timestamp?: true
    tick?: true
    price?: true
  }

  export type ArenaSnapshotMaxAggregateInputType = {
    id?: true
    simulationId?: true
    timestamp?: true
    tick?: true
    price?: true
  }

  export type ArenaSnapshotCountAggregateInputType = {
    id?: true
    simulationId?: true
    timestamp?: true
    tick?: true
    price?: true
    data?: true
    _all?: true
  }

  export type ArenaSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaSnapshot to aggregate.
     */
    where?: ArenaSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSnapshots to fetch.
     */
    orderBy?: ArenaSnapshotOrderByWithRelationInput | ArenaSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArenaSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArenaSnapshots
    **/
    _count?: true | ArenaSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArenaSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArenaSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArenaSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArenaSnapshotMaxAggregateInputType
  }

  export type GetArenaSnapshotAggregateType<T extends ArenaSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateArenaSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArenaSnapshot[P]>
      : GetScalarType<T[P], AggregateArenaSnapshot[P]>
  }




  export type ArenaSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaSnapshotWhereInput
    orderBy?: ArenaSnapshotOrderByWithAggregationInput | ArenaSnapshotOrderByWithAggregationInput[]
    by: ArenaSnapshotScalarFieldEnum[] | ArenaSnapshotScalarFieldEnum
    having?: ArenaSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArenaSnapshotCountAggregateInputType | true
    _avg?: ArenaSnapshotAvgAggregateInputType
    _sum?: ArenaSnapshotSumAggregateInputType
    _min?: ArenaSnapshotMinAggregateInputType
    _max?: ArenaSnapshotMaxAggregateInputType
  }

  export type ArenaSnapshotGroupByOutputType = {
    id: string
    simulationId: string
    timestamp: Date
    tick: number
    price: number
    data: JsonValue
    _count: ArenaSnapshotCountAggregateOutputType | null
    _avg: ArenaSnapshotAvgAggregateOutputType | null
    _sum: ArenaSnapshotSumAggregateOutputType | null
    _min: ArenaSnapshotMinAggregateOutputType | null
    _max: ArenaSnapshotMaxAggregateOutputType | null
  }

  type GetArenaSnapshotGroupByPayload<T extends ArenaSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArenaSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArenaSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArenaSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], ArenaSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type ArenaSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    timestamp?: boolean
    tick?: boolean
    price?: boolean
    data?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaSnapshot"]>

  export type ArenaSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    timestamp?: boolean
    tick?: boolean
    price?: boolean
    data?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaSnapshot"]>

  export type ArenaSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    simulationId?: boolean
    timestamp?: boolean
    tick?: boolean
    price?: boolean
    data?: boolean
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["arenaSnapshot"]>

  export type ArenaSnapshotSelectScalar = {
    id?: boolean
    simulationId?: boolean
    timestamp?: boolean
    tick?: boolean
    price?: boolean
    data?: boolean
  }

  export type ArenaSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "simulationId" | "timestamp" | "tick" | "price" | "data", ExtArgs["result"]["arenaSnapshot"]>
  export type ArenaSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
  }
  export type ArenaSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
  }
  export type ArenaSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    simulation?: boolean | ArenaSimulationDefaultArgs<ExtArgs>
  }

  export type $ArenaSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArenaSnapshot"
    objects: {
      simulation: Prisma.$ArenaSimulationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      simulationId: string
      timestamp: Date
      tick: number
      price: number
      data: Prisma.JsonValue
    }, ExtArgs["result"]["arenaSnapshot"]>
    composites: {}
  }

  type ArenaSnapshotGetPayload<S extends boolean | null | undefined | ArenaSnapshotDefaultArgs> = $Result.GetResult<Prisma.$ArenaSnapshotPayload, S>

  type ArenaSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArenaSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArenaSnapshotCountAggregateInputType | true
    }

  export interface ArenaSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArenaSnapshot'], meta: { name: 'ArenaSnapshot' } }
    /**
     * Find zero or one ArenaSnapshot that matches the filter.
     * @param {ArenaSnapshotFindUniqueArgs} args - Arguments to find a ArenaSnapshot
     * @example
     * // Get one ArenaSnapshot
     * const arenaSnapshot = await prisma.arenaSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArenaSnapshotFindUniqueArgs>(args: SelectSubset<T, ArenaSnapshotFindUniqueArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArenaSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArenaSnapshotFindUniqueOrThrowArgs} args - Arguments to find a ArenaSnapshot
     * @example
     * // Get one ArenaSnapshot
     * const arenaSnapshot = await prisma.arenaSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArenaSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, ArenaSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSnapshotFindFirstArgs} args - Arguments to find a ArenaSnapshot
     * @example
     * // Get one ArenaSnapshot
     * const arenaSnapshot = await prisma.arenaSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArenaSnapshotFindFirstArgs>(args?: SelectSubset<T, ArenaSnapshotFindFirstArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSnapshotFindFirstOrThrowArgs} args - Arguments to find a ArenaSnapshot
     * @example
     * // Get one ArenaSnapshot
     * const arenaSnapshot = await prisma.arenaSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArenaSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, ArenaSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArenaSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArenaSnapshots
     * const arenaSnapshots = await prisma.arenaSnapshot.findMany()
     * 
     * // Get first 10 ArenaSnapshots
     * const arenaSnapshots = await prisma.arenaSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arenaSnapshotWithIdOnly = await prisma.arenaSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArenaSnapshotFindManyArgs>(args?: SelectSubset<T, ArenaSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArenaSnapshot.
     * @param {ArenaSnapshotCreateArgs} args - Arguments to create a ArenaSnapshot.
     * @example
     * // Create one ArenaSnapshot
     * const ArenaSnapshot = await prisma.arenaSnapshot.create({
     *   data: {
     *     // ... data to create a ArenaSnapshot
     *   }
     * })
     * 
     */
    create<T extends ArenaSnapshotCreateArgs>(args: SelectSubset<T, ArenaSnapshotCreateArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArenaSnapshots.
     * @param {ArenaSnapshotCreateManyArgs} args - Arguments to create many ArenaSnapshots.
     * @example
     * // Create many ArenaSnapshots
     * const arenaSnapshot = await prisma.arenaSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArenaSnapshotCreateManyArgs>(args?: SelectSubset<T, ArenaSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArenaSnapshots and returns the data saved in the database.
     * @param {ArenaSnapshotCreateManyAndReturnArgs} args - Arguments to create many ArenaSnapshots.
     * @example
     * // Create many ArenaSnapshots
     * const arenaSnapshot = await prisma.arenaSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArenaSnapshots and only return the `id`
     * const arenaSnapshotWithIdOnly = await prisma.arenaSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArenaSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, ArenaSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArenaSnapshot.
     * @param {ArenaSnapshotDeleteArgs} args - Arguments to delete one ArenaSnapshot.
     * @example
     * // Delete one ArenaSnapshot
     * const ArenaSnapshot = await prisma.arenaSnapshot.delete({
     *   where: {
     *     // ... filter to delete one ArenaSnapshot
     *   }
     * })
     * 
     */
    delete<T extends ArenaSnapshotDeleteArgs>(args: SelectSubset<T, ArenaSnapshotDeleteArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArenaSnapshot.
     * @param {ArenaSnapshotUpdateArgs} args - Arguments to update one ArenaSnapshot.
     * @example
     * // Update one ArenaSnapshot
     * const arenaSnapshot = await prisma.arenaSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArenaSnapshotUpdateArgs>(args: SelectSubset<T, ArenaSnapshotUpdateArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArenaSnapshots.
     * @param {ArenaSnapshotDeleteManyArgs} args - Arguments to filter ArenaSnapshots to delete.
     * @example
     * // Delete a few ArenaSnapshots
     * const { count } = await prisma.arenaSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArenaSnapshotDeleteManyArgs>(args?: SelectSubset<T, ArenaSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArenaSnapshots
     * const arenaSnapshot = await prisma.arenaSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArenaSnapshotUpdateManyArgs>(args: SelectSubset<T, ArenaSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaSnapshots and returns the data updated in the database.
     * @param {ArenaSnapshotUpdateManyAndReturnArgs} args - Arguments to update many ArenaSnapshots.
     * @example
     * // Update many ArenaSnapshots
     * const arenaSnapshot = await prisma.arenaSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArenaSnapshots and only return the `id`
     * const arenaSnapshotWithIdOnly = await prisma.arenaSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArenaSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, ArenaSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArenaSnapshot.
     * @param {ArenaSnapshotUpsertArgs} args - Arguments to update or create a ArenaSnapshot.
     * @example
     * // Update or create a ArenaSnapshot
     * const arenaSnapshot = await prisma.arenaSnapshot.upsert({
     *   create: {
     *     // ... data to create a ArenaSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArenaSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends ArenaSnapshotUpsertArgs>(args: SelectSubset<T, ArenaSnapshotUpsertArgs<ExtArgs>>): Prisma__ArenaSnapshotClient<$Result.GetResult<Prisma.$ArenaSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArenaSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSnapshotCountArgs} args - Arguments to filter ArenaSnapshots to count.
     * @example
     * // Count the number of ArenaSnapshots
     * const count = await prisma.arenaSnapshot.count({
     *   where: {
     *     // ... the filter for the ArenaSnapshots we want to count
     *   }
     * })
    **/
    count<T extends ArenaSnapshotCountArgs>(
      args?: Subset<T, ArenaSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArenaSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArenaSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArenaSnapshotAggregateArgs>(args: Subset<T, ArenaSnapshotAggregateArgs>): Prisma.PrismaPromise<GetArenaSnapshotAggregateType<T>>

    /**
     * Group by ArenaSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaSnapshotGroupByArgs} args - Group by arguments.
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
      T extends ArenaSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArenaSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: ArenaSnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArenaSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArenaSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArenaSnapshot model
   */
  readonly fields: ArenaSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArenaSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArenaSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    simulation<T extends ArenaSimulationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArenaSimulationDefaultArgs<ExtArgs>>): Prisma__ArenaSimulationClient<$Result.GetResult<Prisma.$ArenaSimulationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ArenaSnapshot model
   */
  interface ArenaSnapshotFieldRefs {
    readonly id: FieldRef<"ArenaSnapshot", 'String'>
    readonly simulationId: FieldRef<"ArenaSnapshot", 'String'>
    readonly timestamp: FieldRef<"ArenaSnapshot", 'DateTime'>
    readonly tick: FieldRef<"ArenaSnapshot", 'Int'>
    readonly price: FieldRef<"ArenaSnapshot", 'Float'>
    readonly data: FieldRef<"ArenaSnapshot", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ArenaSnapshot findUnique
   */
  export type ArenaSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSnapshot to fetch.
     */
    where: ArenaSnapshotWhereUniqueInput
  }

  /**
   * ArenaSnapshot findUniqueOrThrow
   */
  export type ArenaSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSnapshot to fetch.
     */
    where: ArenaSnapshotWhereUniqueInput
  }

  /**
   * ArenaSnapshot findFirst
   */
  export type ArenaSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSnapshot to fetch.
     */
    where?: ArenaSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSnapshots to fetch.
     */
    orderBy?: ArenaSnapshotOrderByWithRelationInput | ArenaSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaSnapshots.
     */
    cursor?: ArenaSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaSnapshots.
     */
    distinct?: ArenaSnapshotScalarFieldEnum | ArenaSnapshotScalarFieldEnum[]
  }

  /**
   * ArenaSnapshot findFirstOrThrow
   */
  export type ArenaSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSnapshot to fetch.
     */
    where?: ArenaSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSnapshots to fetch.
     */
    orderBy?: ArenaSnapshotOrderByWithRelationInput | ArenaSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaSnapshots.
     */
    cursor?: ArenaSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaSnapshots.
     */
    distinct?: ArenaSnapshotScalarFieldEnum | ArenaSnapshotScalarFieldEnum[]
  }

  /**
   * ArenaSnapshot findMany
   */
  export type ArenaSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ArenaSnapshots to fetch.
     */
    where?: ArenaSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaSnapshots to fetch.
     */
    orderBy?: ArenaSnapshotOrderByWithRelationInput | ArenaSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArenaSnapshots.
     */
    cursor?: ArenaSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaSnapshots.
     */
    skip?: number
    distinct?: ArenaSnapshotScalarFieldEnum | ArenaSnapshotScalarFieldEnum[]
  }

  /**
   * ArenaSnapshot create
   */
  export type ArenaSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a ArenaSnapshot.
     */
    data: XOR<ArenaSnapshotCreateInput, ArenaSnapshotUncheckedCreateInput>
  }

  /**
   * ArenaSnapshot createMany
   */
  export type ArenaSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArenaSnapshots.
     */
    data: ArenaSnapshotCreateManyInput | ArenaSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaSnapshot createManyAndReturn
   */
  export type ArenaSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many ArenaSnapshots.
     */
    data: ArenaSnapshotCreateManyInput | ArenaSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArenaSnapshot update
   */
  export type ArenaSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a ArenaSnapshot.
     */
    data: XOR<ArenaSnapshotUpdateInput, ArenaSnapshotUncheckedUpdateInput>
    /**
     * Choose, which ArenaSnapshot to update.
     */
    where: ArenaSnapshotWhereUniqueInput
  }

  /**
   * ArenaSnapshot updateMany
   */
  export type ArenaSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArenaSnapshots.
     */
    data: XOR<ArenaSnapshotUpdateManyMutationInput, ArenaSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ArenaSnapshots to update
     */
    where?: ArenaSnapshotWhereInput
    /**
     * Limit how many ArenaSnapshots to update.
     */
    limit?: number
  }

  /**
   * ArenaSnapshot updateManyAndReturn
   */
  export type ArenaSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update ArenaSnapshots.
     */
    data: XOR<ArenaSnapshotUpdateManyMutationInput, ArenaSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ArenaSnapshots to update
     */
    where?: ArenaSnapshotWhereInput
    /**
     * Limit how many ArenaSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArenaSnapshot upsert
   */
  export type ArenaSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the ArenaSnapshot to update in case it exists.
     */
    where: ArenaSnapshotWhereUniqueInput
    /**
     * In case the ArenaSnapshot found by the `where` argument doesn't exist, create a new ArenaSnapshot with this data.
     */
    create: XOR<ArenaSnapshotCreateInput, ArenaSnapshotUncheckedCreateInput>
    /**
     * In case the ArenaSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArenaSnapshotUpdateInput, ArenaSnapshotUncheckedUpdateInput>
  }

  /**
   * ArenaSnapshot delete
   */
  export type ArenaSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
    /**
     * Filter which ArenaSnapshot to delete.
     */
    where: ArenaSnapshotWhereUniqueInput
  }

  /**
   * ArenaSnapshot deleteMany
   */
  export type ArenaSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaSnapshots to delete
     */
    where?: ArenaSnapshotWhereInput
    /**
     * Limit how many ArenaSnapshots to delete.
     */
    limit?: number
  }

  /**
   * ArenaSnapshot without action
   */
  export type ArenaSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaSnapshot
     */
    select?: ArenaSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaSnapshot
     */
    omit?: ArenaSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArenaSnapshotInclude<ExtArgs> | null
  }


  /**
   * Model ArenaLeaderboard
   */

  export type AggregateArenaLeaderboard = {
    _count: ArenaLeaderboardCountAggregateOutputType | null
    _avg: ArenaLeaderboardAvgAggregateOutputType | null
    _sum: ArenaLeaderboardSumAggregateOutputType | null
    _min: ArenaLeaderboardMinAggregateOutputType | null
    _max: ArenaLeaderboardMaxAggregateOutputType | null
  }

  export type ArenaLeaderboardAvgAggregateOutputType = {
    totalWins: number | null
    totalSimulations: number | null
    avgPnl: number | null
    avgPnlPercent: number | null
    avgSharpe: number | null
    bestPnl: number | null
    worstPnl: number | null
  }

  export type ArenaLeaderboardSumAggregateOutputType = {
    totalWins: number | null
    totalSimulations: number | null
    avgPnl: number | null
    avgPnlPercent: number | null
    avgSharpe: number | null
    bestPnl: number | null
    worstPnl: number | null
  }

  export type ArenaLeaderboardMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    agentName: string | null
    totalWins: number | null
    totalSimulations: number | null
    avgPnl: number | null
    avgPnlPercent: number | null
    avgSharpe: number | null
    bestPnl: number | null
    worstPnl: number | null
    lastUpdated: Date | null
  }

  export type ArenaLeaderboardMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    agentName: string | null
    totalWins: number | null
    totalSimulations: number | null
    avgPnl: number | null
    avgPnlPercent: number | null
    avgSharpe: number | null
    bestPnl: number | null
    worstPnl: number | null
    lastUpdated: Date | null
  }

  export type ArenaLeaderboardCountAggregateOutputType = {
    id: number
    agentId: number
    agentName: number
    totalWins: number
    totalSimulations: number
    avgPnl: number
    avgPnlPercent: number
    avgSharpe: number
    bestPnl: number
    worstPnl: number
    lastUpdated: number
    _all: number
  }


  export type ArenaLeaderboardAvgAggregateInputType = {
    totalWins?: true
    totalSimulations?: true
    avgPnl?: true
    avgPnlPercent?: true
    avgSharpe?: true
    bestPnl?: true
    worstPnl?: true
  }

  export type ArenaLeaderboardSumAggregateInputType = {
    totalWins?: true
    totalSimulations?: true
    avgPnl?: true
    avgPnlPercent?: true
    avgSharpe?: true
    bestPnl?: true
    worstPnl?: true
  }

  export type ArenaLeaderboardMinAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    totalWins?: true
    totalSimulations?: true
    avgPnl?: true
    avgPnlPercent?: true
    avgSharpe?: true
    bestPnl?: true
    worstPnl?: true
    lastUpdated?: true
  }

  export type ArenaLeaderboardMaxAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    totalWins?: true
    totalSimulations?: true
    avgPnl?: true
    avgPnlPercent?: true
    avgSharpe?: true
    bestPnl?: true
    worstPnl?: true
    lastUpdated?: true
  }

  export type ArenaLeaderboardCountAggregateInputType = {
    id?: true
    agentId?: true
    agentName?: true
    totalWins?: true
    totalSimulations?: true
    avgPnl?: true
    avgPnlPercent?: true
    avgSharpe?: true
    bestPnl?: true
    worstPnl?: true
    lastUpdated?: true
    _all?: true
  }

  export type ArenaLeaderboardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaLeaderboard to aggregate.
     */
    where?: ArenaLeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaLeaderboards to fetch.
     */
    orderBy?: ArenaLeaderboardOrderByWithRelationInput | ArenaLeaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArenaLeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaLeaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaLeaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArenaLeaderboards
    **/
    _count?: true | ArenaLeaderboardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArenaLeaderboardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArenaLeaderboardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArenaLeaderboardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArenaLeaderboardMaxAggregateInputType
  }

  export type GetArenaLeaderboardAggregateType<T extends ArenaLeaderboardAggregateArgs> = {
        [P in keyof T & keyof AggregateArenaLeaderboard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArenaLeaderboard[P]>
      : GetScalarType<T[P], AggregateArenaLeaderboard[P]>
  }




  export type ArenaLeaderboardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArenaLeaderboardWhereInput
    orderBy?: ArenaLeaderboardOrderByWithAggregationInput | ArenaLeaderboardOrderByWithAggregationInput[]
    by: ArenaLeaderboardScalarFieldEnum[] | ArenaLeaderboardScalarFieldEnum
    having?: ArenaLeaderboardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArenaLeaderboardCountAggregateInputType | true
    _avg?: ArenaLeaderboardAvgAggregateInputType
    _sum?: ArenaLeaderboardSumAggregateInputType
    _min?: ArenaLeaderboardMinAggregateInputType
    _max?: ArenaLeaderboardMaxAggregateInputType
  }

  export type ArenaLeaderboardGroupByOutputType = {
    id: string
    agentId: string
    agentName: string
    totalWins: number
    totalSimulations: number
    avgPnl: number
    avgPnlPercent: number
    avgSharpe: number
    bestPnl: number
    worstPnl: number
    lastUpdated: Date
    _count: ArenaLeaderboardCountAggregateOutputType | null
    _avg: ArenaLeaderboardAvgAggregateOutputType | null
    _sum: ArenaLeaderboardSumAggregateOutputType | null
    _min: ArenaLeaderboardMinAggregateOutputType | null
    _max: ArenaLeaderboardMaxAggregateOutputType | null
  }

  type GetArenaLeaderboardGroupByPayload<T extends ArenaLeaderboardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArenaLeaderboardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArenaLeaderboardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArenaLeaderboardGroupByOutputType[P]>
            : GetScalarType<T[P], ArenaLeaderboardGroupByOutputType[P]>
        }
      >
    >


  export type ArenaLeaderboardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    totalWins?: boolean
    totalSimulations?: boolean
    avgPnl?: boolean
    avgPnlPercent?: boolean
    avgSharpe?: boolean
    bestPnl?: boolean
    worstPnl?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["arenaLeaderboard"]>

  export type ArenaLeaderboardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    totalWins?: boolean
    totalSimulations?: boolean
    avgPnl?: boolean
    avgPnlPercent?: boolean
    avgSharpe?: boolean
    bestPnl?: boolean
    worstPnl?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["arenaLeaderboard"]>

  export type ArenaLeaderboardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    totalWins?: boolean
    totalSimulations?: boolean
    avgPnl?: boolean
    avgPnlPercent?: boolean
    avgSharpe?: boolean
    bestPnl?: boolean
    worstPnl?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["arenaLeaderboard"]>

  export type ArenaLeaderboardSelectScalar = {
    id?: boolean
    agentId?: boolean
    agentName?: boolean
    totalWins?: boolean
    totalSimulations?: boolean
    avgPnl?: boolean
    avgPnlPercent?: boolean
    avgSharpe?: boolean
    bestPnl?: boolean
    worstPnl?: boolean
    lastUpdated?: boolean
  }

  export type ArenaLeaderboardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "agentName" | "totalWins" | "totalSimulations" | "avgPnl" | "avgPnlPercent" | "avgSharpe" | "bestPnl" | "worstPnl" | "lastUpdated", ExtArgs["result"]["arenaLeaderboard"]>

  export type $ArenaLeaderboardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArenaLeaderboard"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      agentName: string
      totalWins: number
      totalSimulations: number
      avgPnl: number
      avgPnlPercent: number
      avgSharpe: number
      bestPnl: number
      worstPnl: number
      lastUpdated: Date
    }, ExtArgs["result"]["arenaLeaderboard"]>
    composites: {}
  }

  type ArenaLeaderboardGetPayload<S extends boolean | null | undefined | ArenaLeaderboardDefaultArgs> = $Result.GetResult<Prisma.$ArenaLeaderboardPayload, S>

  type ArenaLeaderboardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArenaLeaderboardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArenaLeaderboardCountAggregateInputType | true
    }

  export interface ArenaLeaderboardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArenaLeaderboard'], meta: { name: 'ArenaLeaderboard' } }
    /**
     * Find zero or one ArenaLeaderboard that matches the filter.
     * @param {ArenaLeaderboardFindUniqueArgs} args - Arguments to find a ArenaLeaderboard
     * @example
     * // Get one ArenaLeaderboard
     * const arenaLeaderboard = await prisma.arenaLeaderboard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArenaLeaderboardFindUniqueArgs>(args: SelectSubset<T, ArenaLeaderboardFindUniqueArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArenaLeaderboard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArenaLeaderboardFindUniqueOrThrowArgs} args - Arguments to find a ArenaLeaderboard
     * @example
     * // Get one ArenaLeaderboard
     * const arenaLeaderboard = await prisma.arenaLeaderboard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArenaLeaderboardFindUniqueOrThrowArgs>(args: SelectSubset<T, ArenaLeaderboardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaLeaderboard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaLeaderboardFindFirstArgs} args - Arguments to find a ArenaLeaderboard
     * @example
     * // Get one ArenaLeaderboard
     * const arenaLeaderboard = await prisma.arenaLeaderboard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArenaLeaderboardFindFirstArgs>(args?: SelectSubset<T, ArenaLeaderboardFindFirstArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArenaLeaderboard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaLeaderboardFindFirstOrThrowArgs} args - Arguments to find a ArenaLeaderboard
     * @example
     * // Get one ArenaLeaderboard
     * const arenaLeaderboard = await prisma.arenaLeaderboard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArenaLeaderboardFindFirstOrThrowArgs>(args?: SelectSubset<T, ArenaLeaderboardFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArenaLeaderboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaLeaderboardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArenaLeaderboards
     * const arenaLeaderboards = await prisma.arenaLeaderboard.findMany()
     * 
     * // Get first 10 ArenaLeaderboards
     * const arenaLeaderboards = await prisma.arenaLeaderboard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arenaLeaderboardWithIdOnly = await prisma.arenaLeaderboard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArenaLeaderboardFindManyArgs>(args?: SelectSubset<T, ArenaLeaderboardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArenaLeaderboard.
     * @param {ArenaLeaderboardCreateArgs} args - Arguments to create a ArenaLeaderboard.
     * @example
     * // Create one ArenaLeaderboard
     * const ArenaLeaderboard = await prisma.arenaLeaderboard.create({
     *   data: {
     *     // ... data to create a ArenaLeaderboard
     *   }
     * })
     * 
     */
    create<T extends ArenaLeaderboardCreateArgs>(args: SelectSubset<T, ArenaLeaderboardCreateArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArenaLeaderboards.
     * @param {ArenaLeaderboardCreateManyArgs} args - Arguments to create many ArenaLeaderboards.
     * @example
     * // Create many ArenaLeaderboards
     * const arenaLeaderboard = await prisma.arenaLeaderboard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArenaLeaderboardCreateManyArgs>(args?: SelectSubset<T, ArenaLeaderboardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArenaLeaderboards and returns the data saved in the database.
     * @param {ArenaLeaderboardCreateManyAndReturnArgs} args - Arguments to create many ArenaLeaderboards.
     * @example
     * // Create many ArenaLeaderboards
     * const arenaLeaderboard = await prisma.arenaLeaderboard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArenaLeaderboards and only return the `id`
     * const arenaLeaderboardWithIdOnly = await prisma.arenaLeaderboard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArenaLeaderboardCreateManyAndReturnArgs>(args?: SelectSubset<T, ArenaLeaderboardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArenaLeaderboard.
     * @param {ArenaLeaderboardDeleteArgs} args - Arguments to delete one ArenaLeaderboard.
     * @example
     * // Delete one ArenaLeaderboard
     * const ArenaLeaderboard = await prisma.arenaLeaderboard.delete({
     *   where: {
     *     // ... filter to delete one ArenaLeaderboard
     *   }
     * })
     * 
     */
    delete<T extends ArenaLeaderboardDeleteArgs>(args: SelectSubset<T, ArenaLeaderboardDeleteArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArenaLeaderboard.
     * @param {ArenaLeaderboardUpdateArgs} args - Arguments to update one ArenaLeaderboard.
     * @example
     * // Update one ArenaLeaderboard
     * const arenaLeaderboard = await prisma.arenaLeaderboard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArenaLeaderboardUpdateArgs>(args: SelectSubset<T, ArenaLeaderboardUpdateArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArenaLeaderboards.
     * @param {ArenaLeaderboardDeleteManyArgs} args - Arguments to filter ArenaLeaderboards to delete.
     * @example
     * // Delete a few ArenaLeaderboards
     * const { count } = await prisma.arenaLeaderboard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArenaLeaderboardDeleteManyArgs>(args?: SelectSubset<T, ArenaLeaderboardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaLeaderboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaLeaderboardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArenaLeaderboards
     * const arenaLeaderboard = await prisma.arenaLeaderboard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArenaLeaderboardUpdateManyArgs>(args: SelectSubset<T, ArenaLeaderboardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArenaLeaderboards and returns the data updated in the database.
     * @param {ArenaLeaderboardUpdateManyAndReturnArgs} args - Arguments to update many ArenaLeaderboards.
     * @example
     * // Update many ArenaLeaderboards
     * const arenaLeaderboard = await prisma.arenaLeaderboard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArenaLeaderboards and only return the `id`
     * const arenaLeaderboardWithIdOnly = await prisma.arenaLeaderboard.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArenaLeaderboardUpdateManyAndReturnArgs>(args: SelectSubset<T, ArenaLeaderboardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArenaLeaderboard.
     * @param {ArenaLeaderboardUpsertArgs} args - Arguments to update or create a ArenaLeaderboard.
     * @example
     * // Update or create a ArenaLeaderboard
     * const arenaLeaderboard = await prisma.arenaLeaderboard.upsert({
     *   create: {
     *     // ... data to create a ArenaLeaderboard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArenaLeaderboard we want to update
     *   }
     * })
     */
    upsert<T extends ArenaLeaderboardUpsertArgs>(args: SelectSubset<T, ArenaLeaderboardUpsertArgs<ExtArgs>>): Prisma__ArenaLeaderboardClient<$Result.GetResult<Prisma.$ArenaLeaderboardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArenaLeaderboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaLeaderboardCountArgs} args - Arguments to filter ArenaLeaderboards to count.
     * @example
     * // Count the number of ArenaLeaderboards
     * const count = await prisma.arenaLeaderboard.count({
     *   where: {
     *     // ... the filter for the ArenaLeaderboards we want to count
     *   }
     * })
    **/
    count<T extends ArenaLeaderboardCountArgs>(
      args?: Subset<T, ArenaLeaderboardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArenaLeaderboardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArenaLeaderboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaLeaderboardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArenaLeaderboardAggregateArgs>(args: Subset<T, ArenaLeaderboardAggregateArgs>): Prisma.PrismaPromise<GetArenaLeaderboardAggregateType<T>>

    /**
     * Group by ArenaLeaderboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArenaLeaderboardGroupByArgs} args - Group by arguments.
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
      T extends ArenaLeaderboardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArenaLeaderboardGroupByArgs['orderBy'] }
        : { orderBy?: ArenaLeaderboardGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArenaLeaderboardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArenaLeaderboardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArenaLeaderboard model
   */
  readonly fields: ArenaLeaderboardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArenaLeaderboard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArenaLeaderboardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ArenaLeaderboard model
   */
  interface ArenaLeaderboardFieldRefs {
    readonly id: FieldRef<"ArenaLeaderboard", 'String'>
    readonly agentId: FieldRef<"ArenaLeaderboard", 'String'>
    readonly agentName: FieldRef<"ArenaLeaderboard", 'String'>
    readonly totalWins: FieldRef<"ArenaLeaderboard", 'Int'>
    readonly totalSimulations: FieldRef<"ArenaLeaderboard", 'Int'>
    readonly avgPnl: FieldRef<"ArenaLeaderboard", 'Float'>
    readonly avgPnlPercent: FieldRef<"ArenaLeaderboard", 'Float'>
    readonly avgSharpe: FieldRef<"ArenaLeaderboard", 'Float'>
    readonly bestPnl: FieldRef<"ArenaLeaderboard", 'Float'>
    readonly worstPnl: FieldRef<"ArenaLeaderboard", 'Float'>
    readonly lastUpdated: FieldRef<"ArenaLeaderboard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArenaLeaderboard findUnique
   */
  export type ArenaLeaderboardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * Filter, which ArenaLeaderboard to fetch.
     */
    where: ArenaLeaderboardWhereUniqueInput
  }

  /**
   * ArenaLeaderboard findUniqueOrThrow
   */
  export type ArenaLeaderboardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * Filter, which ArenaLeaderboard to fetch.
     */
    where: ArenaLeaderboardWhereUniqueInput
  }

  /**
   * ArenaLeaderboard findFirst
   */
  export type ArenaLeaderboardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * Filter, which ArenaLeaderboard to fetch.
     */
    where?: ArenaLeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaLeaderboards to fetch.
     */
    orderBy?: ArenaLeaderboardOrderByWithRelationInput | ArenaLeaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaLeaderboards.
     */
    cursor?: ArenaLeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaLeaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaLeaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaLeaderboards.
     */
    distinct?: ArenaLeaderboardScalarFieldEnum | ArenaLeaderboardScalarFieldEnum[]
  }

  /**
   * ArenaLeaderboard findFirstOrThrow
   */
  export type ArenaLeaderboardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * Filter, which ArenaLeaderboard to fetch.
     */
    where?: ArenaLeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaLeaderboards to fetch.
     */
    orderBy?: ArenaLeaderboardOrderByWithRelationInput | ArenaLeaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArenaLeaderboards.
     */
    cursor?: ArenaLeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaLeaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaLeaderboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArenaLeaderboards.
     */
    distinct?: ArenaLeaderboardScalarFieldEnum | ArenaLeaderboardScalarFieldEnum[]
  }

  /**
   * ArenaLeaderboard findMany
   */
  export type ArenaLeaderboardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * Filter, which ArenaLeaderboards to fetch.
     */
    where?: ArenaLeaderboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArenaLeaderboards to fetch.
     */
    orderBy?: ArenaLeaderboardOrderByWithRelationInput | ArenaLeaderboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArenaLeaderboards.
     */
    cursor?: ArenaLeaderboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArenaLeaderboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArenaLeaderboards.
     */
    skip?: number
    distinct?: ArenaLeaderboardScalarFieldEnum | ArenaLeaderboardScalarFieldEnum[]
  }

  /**
   * ArenaLeaderboard create
   */
  export type ArenaLeaderboardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * The data needed to create a ArenaLeaderboard.
     */
    data: XOR<ArenaLeaderboardCreateInput, ArenaLeaderboardUncheckedCreateInput>
  }

  /**
   * ArenaLeaderboard createMany
   */
  export type ArenaLeaderboardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArenaLeaderboards.
     */
    data: ArenaLeaderboardCreateManyInput | ArenaLeaderboardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaLeaderboard createManyAndReturn
   */
  export type ArenaLeaderboardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * The data used to create many ArenaLeaderboards.
     */
    data: ArenaLeaderboardCreateManyInput | ArenaLeaderboardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArenaLeaderboard update
   */
  export type ArenaLeaderboardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * The data needed to update a ArenaLeaderboard.
     */
    data: XOR<ArenaLeaderboardUpdateInput, ArenaLeaderboardUncheckedUpdateInput>
    /**
     * Choose, which ArenaLeaderboard to update.
     */
    where: ArenaLeaderboardWhereUniqueInput
  }

  /**
   * ArenaLeaderboard updateMany
   */
  export type ArenaLeaderboardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArenaLeaderboards.
     */
    data: XOR<ArenaLeaderboardUpdateManyMutationInput, ArenaLeaderboardUncheckedUpdateManyInput>
    /**
     * Filter which ArenaLeaderboards to update
     */
    where?: ArenaLeaderboardWhereInput
    /**
     * Limit how many ArenaLeaderboards to update.
     */
    limit?: number
  }

  /**
   * ArenaLeaderboard updateManyAndReturn
   */
  export type ArenaLeaderboardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * The data used to update ArenaLeaderboards.
     */
    data: XOR<ArenaLeaderboardUpdateManyMutationInput, ArenaLeaderboardUncheckedUpdateManyInput>
    /**
     * Filter which ArenaLeaderboards to update
     */
    where?: ArenaLeaderboardWhereInput
    /**
     * Limit how many ArenaLeaderboards to update.
     */
    limit?: number
  }

  /**
   * ArenaLeaderboard upsert
   */
  export type ArenaLeaderboardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * The filter to search for the ArenaLeaderboard to update in case it exists.
     */
    where: ArenaLeaderboardWhereUniqueInput
    /**
     * In case the ArenaLeaderboard found by the `where` argument doesn't exist, create a new ArenaLeaderboard with this data.
     */
    create: XOR<ArenaLeaderboardCreateInput, ArenaLeaderboardUncheckedCreateInput>
    /**
     * In case the ArenaLeaderboard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArenaLeaderboardUpdateInput, ArenaLeaderboardUncheckedUpdateInput>
  }

  /**
   * ArenaLeaderboard delete
   */
  export type ArenaLeaderboardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
    /**
     * Filter which ArenaLeaderboard to delete.
     */
    where: ArenaLeaderboardWhereUniqueInput
  }

  /**
   * ArenaLeaderboard deleteMany
   */
  export type ArenaLeaderboardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArenaLeaderboards to delete
     */
    where?: ArenaLeaderboardWhereInput
    /**
     * Limit how many ArenaLeaderboards to delete.
     */
    limit?: number
  }

  /**
   * ArenaLeaderboard without action
   */
  export type ArenaLeaderboardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArenaLeaderboard
     */
    select?: ArenaLeaderboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArenaLeaderboard
     */
    omit?: ArenaLeaderboardOmit<ExtArgs> | null
  }


  /**
   * Model MarketDataCache
   */

  export type AggregateMarketDataCache = {
    _count: MarketDataCacheCountAggregateOutputType | null
    _avg: MarketDataCacheAvgAggregateOutputType | null
    _sum: MarketDataCacheSumAggregateOutputType | null
    _min: MarketDataCacheMinAggregateOutputType | null
    _max: MarketDataCacheMaxAggregateOutputType | null
  }

  export type MarketDataCacheAvgAggregateOutputType = {
    dataCount: number | null
  }

  export type MarketDataCacheSumAggregateOutputType = {
    dataCount: number | null
  }

  export type MarketDataCacheMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    type: string | null
    interval: string | null
    startTime: Date | null
    endTime: Date | null
    dataCount: number | null
    createdAt: Date | null
  }

  export type MarketDataCacheMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    type: string | null
    interval: string | null
    startTime: Date | null
    endTime: Date | null
    dataCount: number | null
    createdAt: Date | null
  }

  export type MarketDataCacheCountAggregateOutputType = {
    id: number
    symbol: number
    type: number
    interval: number
    startTime: number
    endTime: number
    dataCount: number
    data: number
    createdAt: number
    _all: number
  }


  export type MarketDataCacheAvgAggregateInputType = {
    dataCount?: true
  }

  export type MarketDataCacheSumAggregateInputType = {
    dataCount?: true
  }

  export type MarketDataCacheMinAggregateInputType = {
    id?: true
    symbol?: true
    type?: true
    interval?: true
    startTime?: true
    endTime?: true
    dataCount?: true
    createdAt?: true
  }

  export type MarketDataCacheMaxAggregateInputType = {
    id?: true
    symbol?: true
    type?: true
    interval?: true
    startTime?: true
    endTime?: true
    dataCount?: true
    createdAt?: true
  }

  export type MarketDataCacheCountAggregateInputType = {
    id?: true
    symbol?: true
    type?: true
    interval?: true
    startTime?: true
    endTime?: true
    dataCount?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type MarketDataCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketDataCache to aggregate.
     */
    where?: MarketDataCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketDataCaches to fetch.
     */
    orderBy?: MarketDataCacheOrderByWithRelationInput | MarketDataCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketDataCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketDataCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketDataCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarketDataCaches
    **/
    _count?: true | MarketDataCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketDataCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketDataCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketDataCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketDataCacheMaxAggregateInputType
  }

  export type GetMarketDataCacheAggregateType<T extends MarketDataCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateMarketDataCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarketDataCache[P]>
      : GetScalarType<T[P], AggregateMarketDataCache[P]>
  }




  export type MarketDataCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketDataCacheWhereInput
    orderBy?: MarketDataCacheOrderByWithAggregationInput | MarketDataCacheOrderByWithAggregationInput[]
    by: MarketDataCacheScalarFieldEnum[] | MarketDataCacheScalarFieldEnum
    having?: MarketDataCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketDataCacheCountAggregateInputType | true
    _avg?: MarketDataCacheAvgAggregateInputType
    _sum?: MarketDataCacheSumAggregateInputType
    _min?: MarketDataCacheMinAggregateInputType
    _max?: MarketDataCacheMaxAggregateInputType
  }

  export type MarketDataCacheGroupByOutputType = {
    id: string
    symbol: string
    type: string
    interval: string
    startTime: Date
    endTime: Date
    dataCount: number
    data: JsonValue
    createdAt: Date
    _count: MarketDataCacheCountAggregateOutputType | null
    _avg: MarketDataCacheAvgAggregateOutputType | null
    _sum: MarketDataCacheSumAggregateOutputType | null
    _min: MarketDataCacheMinAggregateOutputType | null
    _max: MarketDataCacheMaxAggregateOutputType | null
  }

  type GetMarketDataCacheGroupByPayload<T extends MarketDataCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketDataCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketDataCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketDataCacheGroupByOutputType[P]>
            : GetScalarType<T[P], MarketDataCacheGroupByOutputType[P]>
        }
      >
    >


  export type MarketDataCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    type?: boolean
    interval?: boolean
    startTime?: boolean
    endTime?: boolean
    dataCount?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["marketDataCache"]>

  export type MarketDataCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    type?: boolean
    interval?: boolean
    startTime?: boolean
    endTime?: boolean
    dataCount?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["marketDataCache"]>

  export type MarketDataCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    type?: boolean
    interval?: boolean
    startTime?: boolean
    endTime?: boolean
    dataCount?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["marketDataCache"]>

  export type MarketDataCacheSelectScalar = {
    id?: boolean
    symbol?: boolean
    type?: boolean
    interval?: boolean
    startTime?: boolean
    endTime?: boolean
    dataCount?: boolean
    data?: boolean
    createdAt?: boolean
  }

  export type MarketDataCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "type" | "interval" | "startTime" | "endTime" | "dataCount" | "data" | "createdAt", ExtArgs["result"]["marketDataCache"]>

  export type $MarketDataCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MarketDataCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      type: string
      interval: string
      startTime: Date
      endTime: Date
      dataCount: number
      data: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["marketDataCache"]>
    composites: {}
  }

  type MarketDataCacheGetPayload<S extends boolean | null | undefined | MarketDataCacheDefaultArgs> = $Result.GetResult<Prisma.$MarketDataCachePayload, S>

  type MarketDataCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketDataCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketDataCacheCountAggregateInputType | true
    }

  export interface MarketDataCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MarketDataCache'], meta: { name: 'MarketDataCache' } }
    /**
     * Find zero or one MarketDataCache that matches the filter.
     * @param {MarketDataCacheFindUniqueArgs} args - Arguments to find a MarketDataCache
     * @example
     * // Get one MarketDataCache
     * const marketDataCache = await prisma.marketDataCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketDataCacheFindUniqueArgs>(args: SelectSubset<T, MarketDataCacheFindUniqueArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MarketDataCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketDataCacheFindUniqueOrThrowArgs} args - Arguments to find a MarketDataCache
     * @example
     * // Get one MarketDataCache
     * const marketDataCache = await prisma.marketDataCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketDataCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketDataCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketDataCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketDataCacheFindFirstArgs} args - Arguments to find a MarketDataCache
     * @example
     * // Get one MarketDataCache
     * const marketDataCache = await prisma.marketDataCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketDataCacheFindFirstArgs>(args?: SelectSubset<T, MarketDataCacheFindFirstArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketDataCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketDataCacheFindFirstOrThrowArgs} args - Arguments to find a MarketDataCache
     * @example
     * // Get one MarketDataCache
     * const marketDataCache = await prisma.marketDataCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketDataCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketDataCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MarketDataCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketDataCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarketDataCaches
     * const marketDataCaches = await prisma.marketDataCache.findMany()
     * 
     * // Get first 10 MarketDataCaches
     * const marketDataCaches = await prisma.marketDataCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketDataCacheWithIdOnly = await prisma.marketDataCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketDataCacheFindManyArgs>(args?: SelectSubset<T, MarketDataCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MarketDataCache.
     * @param {MarketDataCacheCreateArgs} args - Arguments to create a MarketDataCache.
     * @example
     * // Create one MarketDataCache
     * const MarketDataCache = await prisma.marketDataCache.create({
     *   data: {
     *     // ... data to create a MarketDataCache
     *   }
     * })
     * 
     */
    create<T extends MarketDataCacheCreateArgs>(args: SelectSubset<T, MarketDataCacheCreateArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MarketDataCaches.
     * @param {MarketDataCacheCreateManyArgs} args - Arguments to create many MarketDataCaches.
     * @example
     * // Create many MarketDataCaches
     * const marketDataCache = await prisma.marketDataCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketDataCacheCreateManyArgs>(args?: SelectSubset<T, MarketDataCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MarketDataCaches and returns the data saved in the database.
     * @param {MarketDataCacheCreateManyAndReturnArgs} args - Arguments to create many MarketDataCaches.
     * @example
     * // Create many MarketDataCaches
     * const marketDataCache = await prisma.marketDataCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MarketDataCaches and only return the `id`
     * const marketDataCacheWithIdOnly = await prisma.marketDataCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketDataCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketDataCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MarketDataCache.
     * @param {MarketDataCacheDeleteArgs} args - Arguments to delete one MarketDataCache.
     * @example
     * // Delete one MarketDataCache
     * const MarketDataCache = await prisma.marketDataCache.delete({
     *   where: {
     *     // ... filter to delete one MarketDataCache
     *   }
     * })
     * 
     */
    delete<T extends MarketDataCacheDeleteArgs>(args: SelectSubset<T, MarketDataCacheDeleteArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MarketDataCache.
     * @param {MarketDataCacheUpdateArgs} args - Arguments to update one MarketDataCache.
     * @example
     * // Update one MarketDataCache
     * const marketDataCache = await prisma.marketDataCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketDataCacheUpdateArgs>(args: SelectSubset<T, MarketDataCacheUpdateArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MarketDataCaches.
     * @param {MarketDataCacheDeleteManyArgs} args - Arguments to filter MarketDataCaches to delete.
     * @example
     * // Delete a few MarketDataCaches
     * const { count } = await prisma.marketDataCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketDataCacheDeleteManyArgs>(args?: SelectSubset<T, MarketDataCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketDataCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketDataCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarketDataCaches
     * const marketDataCache = await prisma.marketDataCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketDataCacheUpdateManyArgs>(args: SelectSubset<T, MarketDataCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketDataCaches and returns the data updated in the database.
     * @param {MarketDataCacheUpdateManyAndReturnArgs} args - Arguments to update many MarketDataCaches.
     * @example
     * // Update many MarketDataCaches
     * const marketDataCache = await prisma.marketDataCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MarketDataCaches and only return the `id`
     * const marketDataCacheWithIdOnly = await prisma.marketDataCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketDataCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketDataCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MarketDataCache.
     * @param {MarketDataCacheUpsertArgs} args - Arguments to update or create a MarketDataCache.
     * @example
     * // Update or create a MarketDataCache
     * const marketDataCache = await prisma.marketDataCache.upsert({
     *   create: {
     *     // ... data to create a MarketDataCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarketDataCache we want to update
     *   }
     * })
     */
    upsert<T extends MarketDataCacheUpsertArgs>(args: SelectSubset<T, MarketDataCacheUpsertArgs<ExtArgs>>): Prisma__MarketDataCacheClient<$Result.GetResult<Prisma.$MarketDataCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MarketDataCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketDataCacheCountArgs} args - Arguments to filter MarketDataCaches to count.
     * @example
     * // Count the number of MarketDataCaches
     * const count = await prisma.marketDataCache.count({
     *   where: {
     *     // ... the filter for the MarketDataCaches we want to count
     *   }
     * })
    **/
    count<T extends MarketDataCacheCountArgs>(
      args?: Subset<T, MarketDataCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketDataCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarketDataCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketDataCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MarketDataCacheAggregateArgs>(args: Subset<T, MarketDataCacheAggregateArgs>): Prisma.PrismaPromise<GetMarketDataCacheAggregateType<T>>

    /**
     * Group by MarketDataCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketDataCacheGroupByArgs} args - Group by arguments.
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
      T extends MarketDataCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketDataCacheGroupByArgs['orderBy'] }
        : { orderBy?: MarketDataCacheGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MarketDataCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketDataCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MarketDataCache model
   */
  readonly fields: MarketDataCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarketDataCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketDataCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MarketDataCache model
   */
  interface MarketDataCacheFieldRefs {
    readonly id: FieldRef<"MarketDataCache", 'String'>
    readonly symbol: FieldRef<"MarketDataCache", 'String'>
    readonly type: FieldRef<"MarketDataCache", 'String'>
    readonly interval: FieldRef<"MarketDataCache", 'String'>
    readonly startTime: FieldRef<"MarketDataCache", 'DateTime'>
    readonly endTime: FieldRef<"MarketDataCache", 'DateTime'>
    readonly dataCount: FieldRef<"MarketDataCache", 'Int'>
    readonly data: FieldRef<"MarketDataCache", 'Json'>
    readonly createdAt: FieldRef<"MarketDataCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MarketDataCache findUnique
   */
  export type MarketDataCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * Filter, which MarketDataCache to fetch.
     */
    where: MarketDataCacheWhereUniqueInput
  }

  /**
   * MarketDataCache findUniqueOrThrow
   */
  export type MarketDataCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * Filter, which MarketDataCache to fetch.
     */
    where: MarketDataCacheWhereUniqueInput
  }

  /**
   * MarketDataCache findFirst
   */
  export type MarketDataCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * Filter, which MarketDataCache to fetch.
     */
    where?: MarketDataCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketDataCaches to fetch.
     */
    orderBy?: MarketDataCacheOrderByWithRelationInput | MarketDataCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketDataCaches.
     */
    cursor?: MarketDataCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketDataCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketDataCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketDataCaches.
     */
    distinct?: MarketDataCacheScalarFieldEnum | MarketDataCacheScalarFieldEnum[]
  }

  /**
   * MarketDataCache findFirstOrThrow
   */
  export type MarketDataCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * Filter, which MarketDataCache to fetch.
     */
    where?: MarketDataCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketDataCaches to fetch.
     */
    orderBy?: MarketDataCacheOrderByWithRelationInput | MarketDataCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketDataCaches.
     */
    cursor?: MarketDataCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketDataCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketDataCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketDataCaches.
     */
    distinct?: MarketDataCacheScalarFieldEnum | MarketDataCacheScalarFieldEnum[]
  }

  /**
   * MarketDataCache findMany
   */
  export type MarketDataCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * Filter, which MarketDataCaches to fetch.
     */
    where?: MarketDataCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketDataCaches to fetch.
     */
    orderBy?: MarketDataCacheOrderByWithRelationInput | MarketDataCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarketDataCaches.
     */
    cursor?: MarketDataCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketDataCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketDataCaches.
     */
    skip?: number
    distinct?: MarketDataCacheScalarFieldEnum | MarketDataCacheScalarFieldEnum[]
  }

  /**
   * MarketDataCache create
   */
  export type MarketDataCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a MarketDataCache.
     */
    data: XOR<MarketDataCacheCreateInput, MarketDataCacheUncheckedCreateInput>
  }

  /**
   * MarketDataCache createMany
   */
  export type MarketDataCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarketDataCaches.
     */
    data: MarketDataCacheCreateManyInput | MarketDataCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MarketDataCache createManyAndReturn
   */
  export type MarketDataCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * The data used to create many MarketDataCaches.
     */
    data: MarketDataCacheCreateManyInput | MarketDataCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MarketDataCache update
   */
  export type MarketDataCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a MarketDataCache.
     */
    data: XOR<MarketDataCacheUpdateInput, MarketDataCacheUncheckedUpdateInput>
    /**
     * Choose, which MarketDataCache to update.
     */
    where: MarketDataCacheWhereUniqueInput
  }

  /**
   * MarketDataCache updateMany
   */
  export type MarketDataCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MarketDataCaches.
     */
    data: XOR<MarketDataCacheUpdateManyMutationInput, MarketDataCacheUncheckedUpdateManyInput>
    /**
     * Filter which MarketDataCaches to update
     */
    where?: MarketDataCacheWhereInput
    /**
     * Limit how many MarketDataCaches to update.
     */
    limit?: number
  }

  /**
   * MarketDataCache updateManyAndReturn
   */
  export type MarketDataCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * The data used to update MarketDataCaches.
     */
    data: XOR<MarketDataCacheUpdateManyMutationInput, MarketDataCacheUncheckedUpdateManyInput>
    /**
     * Filter which MarketDataCaches to update
     */
    where?: MarketDataCacheWhereInput
    /**
     * Limit how many MarketDataCaches to update.
     */
    limit?: number
  }

  /**
   * MarketDataCache upsert
   */
  export type MarketDataCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the MarketDataCache to update in case it exists.
     */
    where: MarketDataCacheWhereUniqueInput
    /**
     * In case the MarketDataCache found by the `where` argument doesn't exist, create a new MarketDataCache with this data.
     */
    create: XOR<MarketDataCacheCreateInput, MarketDataCacheUncheckedCreateInput>
    /**
     * In case the MarketDataCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketDataCacheUpdateInput, MarketDataCacheUncheckedUpdateInput>
  }

  /**
   * MarketDataCache delete
   */
  export type MarketDataCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
    /**
     * Filter which MarketDataCache to delete.
     */
    where: MarketDataCacheWhereUniqueInput
  }

  /**
   * MarketDataCache deleteMany
   */
  export type MarketDataCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketDataCaches to delete
     */
    where?: MarketDataCacheWhereInput
    /**
     * Limit how many MarketDataCaches to delete.
     */
    limit?: number
  }

  /**
   * MarketDataCache without action
   */
  export type MarketDataCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketDataCache
     */
    select?: MarketDataCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketDataCache
     */
    omit?: MarketDataCacheOmit<ExtArgs> | null
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


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    link: 'link',
    source: 'source',
    author: 'author',
    publishedAt: 'publishedAt',
    ingestedAt: 'ingestedAt',
    summary: 'summary',
    content: 'content',
    imageUrl: 'imageUrl',
    fingerprint: 'fingerprint',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const SourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    type: 'type',
    tags: 'tags',
    active: 'active',
    schedule: 'schedule',
    createdAt: 'createdAt'
  };

  export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    preferences: 'preferences',
    bookmarks: 'bookmarks'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    providerId: 'providerId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    idToken: 'idToken',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const ArenaAgentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    model: 'model',
    personality: 'personality',
    strategy: 'strategy',
    config: 'config',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArenaAgentScalarFieldEnum = (typeof ArenaAgentScalarFieldEnum)[keyof typeof ArenaAgentScalarFieldEnum]


  export const ArenaSimulationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    market: 'market',
    marketType: 'marketType',
    interval: 'interval',
    startDate: 'startDate',
    endDate: 'endDate',
    initialBalance: 'initialBalance',
    tickIntervalMs: 'tickIntervalMs',
    priceImpact: 'priceImpact',
    config: 'config',
    createdAt: 'createdAt',
    startedAt: 'startedAt',
    pausedAt: 'pausedAt',
    completedAt: 'completedAt',
    errorMessage: 'errorMessage'
  };

  export type ArenaSimulationScalarFieldEnum = (typeof ArenaSimulationScalarFieldEnum)[keyof typeof ArenaSimulationScalarFieldEnum]


  export const ArenaParticipationScalarFieldEnum: {
    id: 'id',
    simulationId: 'simulationId',
    agentId: 'agentId',
    finalBalance: 'finalBalance',
    pnl: 'pnl',
    pnlPercent: 'pnlPercent',
    sharpeRatio: 'sharpeRatio',
    winRate: 'winRate',
    totalTrades: 'totalTrades',
    rank: 'rank'
  };

  export type ArenaParticipationScalarFieldEnum = (typeof ArenaParticipationScalarFieldEnum)[keyof typeof ArenaParticipationScalarFieldEnum]


  export const ArenaTradeScalarFieldEnum: {
    id: 'id',
    simulationId: 'simulationId',
    participationId: 'participationId',
    timestamp: 'timestamp',
    action: 'action',
    asset: 'asset',
    quantity: 'quantity',
    price: 'price',
    total: 'total',
    reasoning: 'reasoning'
  };

  export type ArenaTradeScalarFieldEnum = (typeof ArenaTradeScalarFieldEnum)[keyof typeof ArenaTradeScalarFieldEnum]


  export const ArenaSnapshotScalarFieldEnum: {
    id: 'id',
    simulationId: 'simulationId',
    timestamp: 'timestamp',
    tick: 'tick',
    price: 'price',
    data: 'data'
  };

  export type ArenaSnapshotScalarFieldEnum = (typeof ArenaSnapshotScalarFieldEnum)[keyof typeof ArenaSnapshotScalarFieldEnum]


  export const ArenaLeaderboardScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    agentName: 'agentName',
    totalWins: 'totalWins',
    totalSimulations: 'totalSimulations',
    avgPnl: 'avgPnl',
    avgPnlPercent: 'avgPnlPercent',
    avgSharpe: 'avgSharpe',
    bestPnl: 'bestPnl',
    worstPnl: 'worstPnl',
    lastUpdated: 'lastUpdated'
  };

  export type ArenaLeaderboardScalarFieldEnum = (typeof ArenaLeaderboardScalarFieldEnum)[keyof typeof ArenaLeaderboardScalarFieldEnum]


  export const MarketDataCacheScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    type: 'type',
    interval: 'interval',
    startTime: 'startTime',
    endTime: 'endTime',
    dataCount: 'dataCount',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type MarketDataCacheScalarFieldEnum = (typeof MarketDataCacheScalarFieldEnum)[keyof typeof MarketDataCacheScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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


  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    link?: StringFilter<"Article"> | string
    source?: StringFilter<"Article"> | string
    author?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeFilter<"Article"> | Date | string
    ingestedAt?: DateTimeFilter<"Article"> | Date | string
    summary?: StringNullableFilter<"Article"> | string | null
    content?: StringNullableFilter<"Article"> | string | null
    imageUrl?: StringNullableFilter<"Article"> | string | null
    fingerprint?: StringFilter<"Article"> | string
    tags?: StringNullableListFilter<"Article">
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    link?: SortOrder
    source?: SortOrder
    author?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    ingestedAt?: SortOrder
    summary?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    fingerprint?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    link?: string
    fingerprint?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    source?: StringFilter<"Article"> | string
    author?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeFilter<"Article"> | Date | string
    ingestedAt?: DateTimeFilter<"Article"> | Date | string
    summary?: StringNullableFilter<"Article"> | string | null
    content?: StringNullableFilter<"Article"> | string | null
    imageUrl?: StringNullableFilter<"Article"> | string | null
    tags?: StringNullableListFilter<"Article">
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
  }, "id" | "link" | "fingerprint">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    link?: SortOrder
    source?: SortOrder
    author?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    ingestedAt?: SortOrder
    summary?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    fingerprint?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    link?: StringWithAggregatesFilter<"Article"> | string
    source?: StringWithAggregatesFilter<"Article"> | string
    author?: StringNullableWithAggregatesFilter<"Article"> | string | null
    publishedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    ingestedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    summary?: StringNullableWithAggregatesFilter<"Article"> | string | null
    content?: StringNullableWithAggregatesFilter<"Article"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Article"> | string | null
    fingerprint?: StringWithAggregatesFilter<"Article"> | string
    tags?: StringNullableListFilter<"Article">
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type SourceWhereInput = {
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    id?: StringFilter<"Source"> | string
    name?: StringFilter<"Source"> | string
    url?: StringFilter<"Source"> | string
    type?: StringFilter<"Source"> | string
    tags?: StringNullableListFilter<"Source">
    active?: BoolFilter<"Source"> | boolean
    schedule?: StringNullableFilter<"Source"> | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
  }

  export type SourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    active?: SortOrder
    schedule?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    url?: StringFilter<"Source"> | string
    type?: StringFilter<"Source"> | string
    tags?: StringNullableListFilter<"Source">
    active?: BoolFilter<"Source"> | boolean
    schedule?: StringNullableFilter<"Source"> | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
  }, "id" | "name">

  export type SourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    active?: SortOrder
    schedule?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SourceCountOrderByAggregateInput
    _max?: SourceMaxOrderByAggregateInput
    _min?: SourceMinOrderByAggregateInput
  }

  export type SourceScalarWhereWithAggregatesInput = {
    AND?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    OR?: SourceScalarWhereWithAggregatesInput[]
    NOT?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Source"> | string
    name?: StringWithAggregatesFilter<"Source"> | string
    url?: StringWithAggregatesFilter<"Source"> | string
    type?: StringWithAggregatesFilter<"Source"> | string
    tags?: StringNullableListFilter<"Source">
    active?: BoolWithAggregatesFilter<"Source"> | boolean
    schedule?: StringNullableWithAggregatesFilter<"Source"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Source"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    preferences?: JsonNullableFilter<"User">
    bookmarks?: StringNullableListFilter<"User">
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    preferences?: SortOrderInput | SortOrder
    bookmarks?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    preferences?: JsonNullableFilter<"User">
    bookmarks?: StringNullableListFilter<"User">
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    preferences?: SortOrderInput | SortOrder
    bookmarks?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    preferences?: JsonNullableWithAggregatesFilter<"User">
    bookmarks?: StringNullableListFilter<"User">
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type ArenaAgentWhereInput = {
    AND?: ArenaAgentWhereInput | ArenaAgentWhereInput[]
    OR?: ArenaAgentWhereInput[]
    NOT?: ArenaAgentWhereInput | ArenaAgentWhereInput[]
    id?: StringFilter<"ArenaAgent"> | string
    name?: StringFilter<"ArenaAgent"> | string
    model?: StringFilter<"ArenaAgent"> | string
    personality?: StringNullableFilter<"ArenaAgent"> | string | null
    strategy?: StringNullableFilter<"ArenaAgent"> | string | null
    config?: JsonFilter<"ArenaAgent">
    isActive?: BoolFilter<"ArenaAgent"> | boolean
    createdAt?: DateTimeFilter<"ArenaAgent"> | Date | string
    updatedAt?: DateTimeFilter<"ArenaAgent"> | Date | string
    participations?: ArenaParticipationListRelationFilter
  }

  export type ArenaAgentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    personality?: SortOrderInput | SortOrder
    strategy?: SortOrderInput | SortOrder
    config?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    participations?: ArenaParticipationOrderByRelationAggregateInput
  }

  export type ArenaAgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArenaAgentWhereInput | ArenaAgentWhereInput[]
    OR?: ArenaAgentWhereInput[]
    NOT?: ArenaAgentWhereInput | ArenaAgentWhereInput[]
    name?: StringFilter<"ArenaAgent"> | string
    model?: StringFilter<"ArenaAgent"> | string
    personality?: StringNullableFilter<"ArenaAgent"> | string | null
    strategy?: StringNullableFilter<"ArenaAgent"> | string | null
    config?: JsonFilter<"ArenaAgent">
    isActive?: BoolFilter<"ArenaAgent"> | boolean
    createdAt?: DateTimeFilter<"ArenaAgent"> | Date | string
    updatedAt?: DateTimeFilter<"ArenaAgent"> | Date | string
    participations?: ArenaParticipationListRelationFilter
  }, "id">

  export type ArenaAgentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    personality?: SortOrderInput | SortOrder
    strategy?: SortOrderInput | SortOrder
    config?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArenaAgentCountOrderByAggregateInput
    _max?: ArenaAgentMaxOrderByAggregateInput
    _min?: ArenaAgentMinOrderByAggregateInput
  }

  export type ArenaAgentScalarWhereWithAggregatesInput = {
    AND?: ArenaAgentScalarWhereWithAggregatesInput | ArenaAgentScalarWhereWithAggregatesInput[]
    OR?: ArenaAgentScalarWhereWithAggregatesInput[]
    NOT?: ArenaAgentScalarWhereWithAggregatesInput | ArenaAgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArenaAgent"> | string
    name?: StringWithAggregatesFilter<"ArenaAgent"> | string
    model?: StringWithAggregatesFilter<"ArenaAgent"> | string
    personality?: StringNullableWithAggregatesFilter<"ArenaAgent"> | string | null
    strategy?: StringNullableWithAggregatesFilter<"ArenaAgent"> | string | null
    config?: JsonWithAggregatesFilter<"ArenaAgent">
    isActive?: BoolWithAggregatesFilter<"ArenaAgent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ArenaAgent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ArenaAgent"> | Date | string
  }

  export type ArenaSimulationWhereInput = {
    AND?: ArenaSimulationWhereInput | ArenaSimulationWhereInput[]
    OR?: ArenaSimulationWhereInput[]
    NOT?: ArenaSimulationWhereInput | ArenaSimulationWhereInput[]
    id?: StringFilter<"ArenaSimulation"> | string
    name?: StringFilter<"ArenaSimulation"> | string
    status?: StringFilter<"ArenaSimulation"> | string
    market?: StringFilter<"ArenaSimulation"> | string
    marketType?: StringFilter<"ArenaSimulation"> | string
    interval?: StringFilter<"ArenaSimulation"> | string
    startDate?: DateTimeFilter<"ArenaSimulation"> | Date | string
    endDate?: DateTimeFilter<"ArenaSimulation"> | Date | string
    initialBalance?: FloatFilter<"ArenaSimulation"> | number
    tickIntervalMs?: IntFilter<"ArenaSimulation"> | number
    priceImpact?: FloatFilter<"ArenaSimulation"> | number
    config?: JsonFilter<"ArenaSimulation">
    createdAt?: DateTimeFilter<"ArenaSimulation"> | Date | string
    startedAt?: DateTimeNullableFilter<"ArenaSimulation"> | Date | string | null
    pausedAt?: DateTimeNullableFilter<"ArenaSimulation"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ArenaSimulation"> | Date | string | null
    errorMessage?: StringNullableFilter<"ArenaSimulation"> | string | null
    participants?: ArenaParticipationListRelationFilter
    trades?: ArenaTradeListRelationFilter
    snapshots?: ArenaSnapshotListRelationFilter
  }

  export type ArenaSimulationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    market?: SortOrder
    marketType?: SortOrder
    interval?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    initialBalance?: SortOrder
    tickIntervalMs?: SortOrder
    priceImpact?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    pausedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    participants?: ArenaParticipationOrderByRelationAggregateInput
    trades?: ArenaTradeOrderByRelationAggregateInput
    snapshots?: ArenaSnapshotOrderByRelationAggregateInput
  }

  export type ArenaSimulationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArenaSimulationWhereInput | ArenaSimulationWhereInput[]
    OR?: ArenaSimulationWhereInput[]
    NOT?: ArenaSimulationWhereInput | ArenaSimulationWhereInput[]
    name?: StringFilter<"ArenaSimulation"> | string
    status?: StringFilter<"ArenaSimulation"> | string
    market?: StringFilter<"ArenaSimulation"> | string
    marketType?: StringFilter<"ArenaSimulation"> | string
    interval?: StringFilter<"ArenaSimulation"> | string
    startDate?: DateTimeFilter<"ArenaSimulation"> | Date | string
    endDate?: DateTimeFilter<"ArenaSimulation"> | Date | string
    initialBalance?: FloatFilter<"ArenaSimulation"> | number
    tickIntervalMs?: IntFilter<"ArenaSimulation"> | number
    priceImpact?: FloatFilter<"ArenaSimulation"> | number
    config?: JsonFilter<"ArenaSimulation">
    createdAt?: DateTimeFilter<"ArenaSimulation"> | Date | string
    startedAt?: DateTimeNullableFilter<"ArenaSimulation"> | Date | string | null
    pausedAt?: DateTimeNullableFilter<"ArenaSimulation"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"ArenaSimulation"> | Date | string | null
    errorMessage?: StringNullableFilter<"ArenaSimulation"> | string | null
    participants?: ArenaParticipationListRelationFilter
    trades?: ArenaTradeListRelationFilter
    snapshots?: ArenaSnapshotListRelationFilter
  }, "id">

  export type ArenaSimulationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    market?: SortOrder
    marketType?: SortOrder
    interval?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    initialBalance?: SortOrder
    tickIntervalMs?: SortOrder
    priceImpact?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    pausedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    _count?: ArenaSimulationCountOrderByAggregateInput
    _avg?: ArenaSimulationAvgOrderByAggregateInput
    _max?: ArenaSimulationMaxOrderByAggregateInput
    _min?: ArenaSimulationMinOrderByAggregateInput
    _sum?: ArenaSimulationSumOrderByAggregateInput
  }

  export type ArenaSimulationScalarWhereWithAggregatesInput = {
    AND?: ArenaSimulationScalarWhereWithAggregatesInput | ArenaSimulationScalarWhereWithAggregatesInput[]
    OR?: ArenaSimulationScalarWhereWithAggregatesInput[]
    NOT?: ArenaSimulationScalarWhereWithAggregatesInput | ArenaSimulationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArenaSimulation"> | string
    name?: StringWithAggregatesFilter<"ArenaSimulation"> | string
    status?: StringWithAggregatesFilter<"ArenaSimulation"> | string
    market?: StringWithAggregatesFilter<"ArenaSimulation"> | string
    marketType?: StringWithAggregatesFilter<"ArenaSimulation"> | string
    interval?: StringWithAggregatesFilter<"ArenaSimulation"> | string
    startDate?: DateTimeWithAggregatesFilter<"ArenaSimulation"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"ArenaSimulation"> | Date | string
    initialBalance?: FloatWithAggregatesFilter<"ArenaSimulation"> | number
    tickIntervalMs?: IntWithAggregatesFilter<"ArenaSimulation"> | number
    priceImpact?: FloatWithAggregatesFilter<"ArenaSimulation"> | number
    config?: JsonWithAggregatesFilter<"ArenaSimulation">
    createdAt?: DateTimeWithAggregatesFilter<"ArenaSimulation"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"ArenaSimulation"> | Date | string | null
    pausedAt?: DateTimeNullableWithAggregatesFilter<"ArenaSimulation"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"ArenaSimulation"> | Date | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"ArenaSimulation"> | string | null
  }

  export type ArenaParticipationWhereInput = {
    AND?: ArenaParticipationWhereInput | ArenaParticipationWhereInput[]
    OR?: ArenaParticipationWhereInput[]
    NOT?: ArenaParticipationWhereInput | ArenaParticipationWhereInput[]
    id?: StringFilter<"ArenaParticipation"> | string
    simulationId?: StringFilter<"ArenaParticipation"> | string
    agentId?: StringFilter<"ArenaParticipation"> | string
    finalBalance?: FloatNullableFilter<"ArenaParticipation"> | number | null
    pnl?: FloatNullableFilter<"ArenaParticipation"> | number | null
    pnlPercent?: FloatNullableFilter<"ArenaParticipation"> | number | null
    sharpeRatio?: FloatNullableFilter<"ArenaParticipation"> | number | null
    winRate?: FloatNullableFilter<"ArenaParticipation"> | number | null
    totalTrades?: IntFilter<"ArenaParticipation"> | number
    rank?: IntNullableFilter<"ArenaParticipation"> | number | null
    simulation?: XOR<ArenaSimulationScalarRelationFilter, ArenaSimulationWhereInput>
    agent?: XOR<ArenaAgentScalarRelationFilter, ArenaAgentWhereInput>
    trades?: ArenaTradeListRelationFilter
  }

  export type ArenaParticipationOrderByWithRelationInput = {
    id?: SortOrder
    simulationId?: SortOrder
    agentId?: SortOrder
    finalBalance?: SortOrderInput | SortOrder
    pnl?: SortOrderInput | SortOrder
    pnlPercent?: SortOrderInput | SortOrder
    sharpeRatio?: SortOrderInput | SortOrder
    winRate?: SortOrderInput | SortOrder
    totalTrades?: SortOrder
    rank?: SortOrderInput | SortOrder
    simulation?: ArenaSimulationOrderByWithRelationInput
    agent?: ArenaAgentOrderByWithRelationInput
    trades?: ArenaTradeOrderByRelationAggregateInput
  }

  export type ArenaParticipationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    simulationId_agentId?: ArenaParticipationSimulationIdAgentIdCompoundUniqueInput
    AND?: ArenaParticipationWhereInput | ArenaParticipationWhereInput[]
    OR?: ArenaParticipationWhereInput[]
    NOT?: ArenaParticipationWhereInput | ArenaParticipationWhereInput[]
    simulationId?: StringFilter<"ArenaParticipation"> | string
    agentId?: StringFilter<"ArenaParticipation"> | string
    finalBalance?: FloatNullableFilter<"ArenaParticipation"> | number | null
    pnl?: FloatNullableFilter<"ArenaParticipation"> | number | null
    pnlPercent?: FloatNullableFilter<"ArenaParticipation"> | number | null
    sharpeRatio?: FloatNullableFilter<"ArenaParticipation"> | number | null
    winRate?: FloatNullableFilter<"ArenaParticipation"> | number | null
    totalTrades?: IntFilter<"ArenaParticipation"> | number
    rank?: IntNullableFilter<"ArenaParticipation"> | number | null
    simulation?: XOR<ArenaSimulationScalarRelationFilter, ArenaSimulationWhereInput>
    agent?: XOR<ArenaAgentScalarRelationFilter, ArenaAgentWhereInput>
    trades?: ArenaTradeListRelationFilter
  }, "id" | "simulationId_agentId">

  export type ArenaParticipationOrderByWithAggregationInput = {
    id?: SortOrder
    simulationId?: SortOrder
    agentId?: SortOrder
    finalBalance?: SortOrderInput | SortOrder
    pnl?: SortOrderInput | SortOrder
    pnlPercent?: SortOrderInput | SortOrder
    sharpeRatio?: SortOrderInput | SortOrder
    winRate?: SortOrderInput | SortOrder
    totalTrades?: SortOrder
    rank?: SortOrderInput | SortOrder
    _count?: ArenaParticipationCountOrderByAggregateInput
    _avg?: ArenaParticipationAvgOrderByAggregateInput
    _max?: ArenaParticipationMaxOrderByAggregateInput
    _min?: ArenaParticipationMinOrderByAggregateInput
    _sum?: ArenaParticipationSumOrderByAggregateInput
  }

  export type ArenaParticipationScalarWhereWithAggregatesInput = {
    AND?: ArenaParticipationScalarWhereWithAggregatesInput | ArenaParticipationScalarWhereWithAggregatesInput[]
    OR?: ArenaParticipationScalarWhereWithAggregatesInput[]
    NOT?: ArenaParticipationScalarWhereWithAggregatesInput | ArenaParticipationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArenaParticipation"> | string
    simulationId?: StringWithAggregatesFilter<"ArenaParticipation"> | string
    agentId?: StringWithAggregatesFilter<"ArenaParticipation"> | string
    finalBalance?: FloatNullableWithAggregatesFilter<"ArenaParticipation"> | number | null
    pnl?: FloatNullableWithAggregatesFilter<"ArenaParticipation"> | number | null
    pnlPercent?: FloatNullableWithAggregatesFilter<"ArenaParticipation"> | number | null
    sharpeRatio?: FloatNullableWithAggregatesFilter<"ArenaParticipation"> | number | null
    winRate?: FloatNullableWithAggregatesFilter<"ArenaParticipation"> | number | null
    totalTrades?: IntWithAggregatesFilter<"ArenaParticipation"> | number
    rank?: IntNullableWithAggregatesFilter<"ArenaParticipation"> | number | null
  }

  export type ArenaTradeWhereInput = {
    AND?: ArenaTradeWhereInput | ArenaTradeWhereInput[]
    OR?: ArenaTradeWhereInput[]
    NOT?: ArenaTradeWhereInput | ArenaTradeWhereInput[]
    id?: StringFilter<"ArenaTrade"> | string
    simulationId?: StringFilter<"ArenaTrade"> | string
    participationId?: StringFilter<"ArenaTrade"> | string
    timestamp?: DateTimeFilter<"ArenaTrade"> | Date | string
    action?: StringFilter<"ArenaTrade"> | string
    asset?: StringFilter<"ArenaTrade"> | string
    quantity?: FloatFilter<"ArenaTrade"> | number
    price?: FloatFilter<"ArenaTrade"> | number
    total?: FloatFilter<"ArenaTrade"> | number
    reasoning?: StringNullableFilter<"ArenaTrade"> | string | null
    simulation?: XOR<ArenaSimulationScalarRelationFilter, ArenaSimulationWhereInput>
    participation?: XOR<ArenaParticipationScalarRelationFilter, ArenaParticipationWhereInput>
  }

  export type ArenaTradeOrderByWithRelationInput = {
    id?: SortOrder
    simulationId?: SortOrder
    participationId?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
    reasoning?: SortOrderInput | SortOrder
    simulation?: ArenaSimulationOrderByWithRelationInput
    participation?: ArenaParticipationOrderByWithRelationInput
  }

  export type ArenaTradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArenaTradeWhereInput | ArenaTradeWhereInput[]
    OR?: ArenaTradeWhereInput[]
    NOT?: ArenaTradeWhereInput | ArenaTradeWhereInput[]
    simulationId?: StringFilter<"ArenaTrade"> | string
    participationId?: StringFilter<"ArenaTrade"> | string
    timestamp?: DateTimeFilter<"ArenaTrade"> | Date | string
    action?: StringFilter<"ArenaTrade"> | string
    asset?: StringFilter<"ArenaTrade"> | string
    quantity?: FloatFilter<"ArenaTrade"> | number
    price?: FloatFilter<"ArenaTrade"> | number
    total?: FloatFilter<"ArenaTrade"> | number
    reasoning?: StringNullableFilter<"ArenaTrade"> | string | null
    simulation?: XOR<ArenaSimulationScalarRelationFilter, ArenaSimulationWhereInput>
    participation?: XOR<ArenaParticipationScalarRelationFilter, ArenaParticipationWhereInput>
  }, "id">

  export type ArenaTradeOrderByWithAggregationInput = {
    id?: SortOrder
    simulationId?: SortOrder
    participationId?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
    reasoning?: SortOrderInput | SortOrder
    _count?: ArenaTradeCountOrderByAggregateInput
    _avg?: ArenaTradeAvgOrderByAggregateInput
    _max?: ArenaTradeMaxOrderByAggregateInput
    _min?: ArenaTradeMinOrderByAggregateInput
    _sum?: ArenaTradeSumOrderByAggregateInput
  }

  export type ArenaTradeScalarWhereWithAggregatesInput = {
    AND?: ArenaTradeScalarWhereWithAggregatesInput | ArenaTradeScalarWhereWithAggregatesInput[]
    OR?: ArenaTradeScalarWhereWithAggregatesInput[]
    NOT?: ArenaTradeScalarWhereWithAggregatesInput | ArenaTradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArenaTrade"> | string
    simulationId?: StringWithAggregatesFilter<"ArenaTrade"> | string
    participationId?: StringWithAggregatesFilter<"ArenaTrade"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ArenaTrade"> | Date | string
    action?: StringWithAggregatesFilter<"ArenaTrade"> | string
    asset?: StringWithAggregatesFilter<"ArenaTrade"> | string
    quantity?: FloatWithAggregatesFilter<"ArenaTrade"> | number
    price?: FloatWithAggregatesFilter<"ArenaTrade"> | number
    total?: FloatWithAggregatesFilter<"ArenaTrade"> | number
    reasoning?: StringNullableWithAggregatesFilter<"ArenaTrade"> | string | null
  }

  export type ArenaSnapshotWhereInput = {
    AND?: ArenaSnapshotWhereInput | ArenaSnapshotWhereInput[]
    OR?: ArenaSnapshotWhereInput[]
    NOT?: ArenaSnapshotWhereInput | ArenaSnapshotWhereInput[]
    id?: StringFilter<"ArenaSnapshot"> | string
    simulationId?: StringFilter<"ArenaSnapshot"> | string
    timestamp?: DateTimeFilter<"ArenaSnapshot"> | Date | string
    tick?: IntFilter<"ArenaSnapshot"> | number
    price?: FloatFilter<"ArenaSnapshot"> | number
    data?: JsonFilter<"ArenaSnapshot">
    simulation?: XOR<ArenaSimulationScalarRelationFilter, ArenaSimulationWhereInput>
  }

  export type ArenaSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    simulationId?: SortOrder
    timestamp?: SortOrder
    tick?: SortOrder
    price?: SortOrder
    data?: SortOrder
    simulation?: ArenaSimulationOrderByWithRelationInput
  }

  export type ArenaSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArenaSnapshotWhereInput | ArenaSnapshotWhereInput[]
    OR?: ArenaSnapshotWhereInput[]
    NOT?: ArenaSnapshotWhereInput | ArenaSnapshotWhereInput[]
    simulationId?: StringFilter<"ArenaSnapshot"> | string
    timestamp?: DateTimeFilter<"ArenaSnapshot"> | Date | string
    tick?: IntFilter<"ArenaSnapshot"> | number
    price?: FloatFilter<"ArenaSnapshot"> | number
    data?: JsonFilter<"ArenaSnapshot">
    simulation?: XOR<ArenaSimulationScalarRelationFilter, ArenaSimulationWhereInput>
  }, "id">

  export type ArenaSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    simulationId?: SortOrder
    timestamp?: SortOrder
    tick?: SortOrder
    price?: SortOrder
    data?: SortOrder
    _count?: ArenaSnapshotCountOrderByAggregateInput
    _avg?: ArenaSnapshotAvgOrderByAggregateInput
    _max?: ArenaSnapshotMaxOrderByAggregateInput
    _min?: ArenaSnapshotMinOrderByAggregateInput
    _sum?: ArenaSnapshotSumOrderByAggregateInput
  }

  export type ArenaSnapshotScalarWhereWithAggregatesInput = {
    AND?: ArenaSnapshotScalarWhereWithAggregatesInput | ArenaSnapshotScalarWhereWithAggregatesInput[]
    OR?: ArenaSnapshotScalarWhereWithAggregatesInput[]
    NOT?: ArenaSnapshotScalarWhereWithAggregatesInput | ArenaSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArenaSnapshot"> | string
    simulationId?: StringWithAggregatesFilter<"ArenaSnapshot"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ArenaSnapshot"> | Date | string
    tick?: IntWithAggregatesFilter<"ArenaSnapshot"> | number
    price?: FloatWithAggregatesFilter<"ArenaSnapshot"> | number
    data?: JsonWithAggregatesFilter<"ArenaSnapshot">
  }

  export type ArenaLeaderboardWhereInput = {
    AND?: ArenaLeaderboardWhereInput | ArenaLeaderboardWhereInput[]
    OR?: ArenaLeaderboardWhereInput[]
    NOT?: ArenaLeaderboardWhereInput | ArenaLeaderboardWhereInput[]
    id?: StringFilter<"ArenaLeaderboard"> | string
    agentId?: StringFilter<"ArenaLeaderboard"> | string
    agentName?: StringFilter<"ArenaLeaderboard"> | string
    totalWins?: IntFilter<"ArenaLeaderboard"> | number
    totalSimulations?: IntFilter<"ArenaLeaderboard"> | number
    avgPnl?: FloatFilter<"ArenaLeaderboard"> | number
    avgPnlPercent?: FloatFilter<"ArenaLeaderboard"> | number
    avgSharpe?: FloatFilter<"ArenaLeaderboard"> | number
    bestPnl?: FloatFilter<"ArenaLeaderboard"> | number
    worstPnl?: FloatFilter<"ArenaLeaderboard"> | number
    lastUpdated?: DateTimeFilter<"ArenaLeaderboard"> | Date | string
  }

  export type ArenaLeaderboardOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalWins?: SortOrder
    totalSimulations?: SortOrder
    avgPnl?: SortOrder
    avgPnlPercent?: SortOrder
    avgSharpe?: SortOrder
    bestPnl?: SortOrder
    worstPnl?: SortOrder
    lastUpdated?: SortOrder
  }

  export type ArenaLeaderboardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId?: string
    AND?: ArenaLeaderboardWhereInput | ArenaLeaderboardWhereInput[]
    OR?: ArenaLeaderboardWhereInput[]
    NOT?: ArenaLeaderboardWhereInput | ArenaLeaderboardWhereInput[]
    agentName?: StringFilter<"ArenaLeaderboard"> | string
    totalWins?: IntFilter<"ArenaLeaderboard"> | number
    totalSimulations?: IntFilter<"ArenaLeaderboard"> | number
    avgPnl?: FloatFilter<"ArenaLeaderboard"> | number
    avgPnlPercent?: FloatFilter<"ArenaLeaderboard"> | number
    avgSharpe?: FloatFilter<"ArenaLeaderboard"> | number
    bestPnl?: FloatFilter<"ArenaLeaderboard"> | number
    worstPnl?: FloatFilter<"ArenaLeaderboard"> | number
    lastUpdated?: DateTimeFilter<"ArenaLeaderboard"> | Date | string
  }, "id" | "agentId">

  export type ArenaLeaderboardOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalWins?: SortOrder
    totalSimulations?: SortOrder
    avgPnl?: SortOrder
    avgPnlPercent?: SortOrder
    avgSharpe?: SortOrder
    bestPnl?: SortOrder
    worstPnl?: SortOrder
    lastUpdated?: SortOrder
    _count?: ArenaLeaderboardCountOrderByAggregateInput
    _avg?: ArenaLeaderboardAvgOrderByAggregateInput
    _max?: ArenaLeaderboardMaxOrderByAggregateInput
    _min?: ArenaLeaderboardMinOrderByAggregateInput
    _sum?: ArenaLeaderboardSumOrderByAggregateInput
  }

  export type ArenaLeaderboardScalarWhereWithAggregatesInput = {
    AND?: ArenaLeaderboardScalarWhereWithAggregatesInput | ArenaLeaderboardScalarWhereWithAggregatesInput[]
    OR?: ArenaLeaderboardScalarWhereWithAggregatesInput[]
    NOT?: ArenaLeaderboardScalarWhereWithAggregatesInput | ArenaLeaderboardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArenaLeaderboard"> | string
    agentId?: StringWithAggregatesFilter<"ArenaLeaderboard"> | string
    agentName?: StringWithAggregatesFilter<"ArenaLeaderboard"> | string
    totalWins?: IntWithAggregatesFilter<"ArenaLeaderboard"> | number
    totalSimulations?: IntWithAggregatesFilter<"ArenaLeaderboard"> | number
    avgPnl?: FloatWithAggregatesFilter<"ArenaLeaderboard"> | number
    avgPnlPercent?: FloatWithAggregatesFilter<"ArenaLeaderboard"> | number
    avgSharpe?: FloatWithAggregatesFilter<"ArenaLeaderboard"> | number
    bestPnl?: FloatWithAggregatesFilter<"ArenaLeaderboard"> | number
    worstPnl?: FloatWithAggregatesFilter<"ArenaLeaderboard"> | number
    lastUpdated?: DateTimeWithAggregatesFilter<"ArenaLeaderboard"> | Date | string
  }

  export type MarketDataCacheWhereInput = {
    AND?: MarketDataCacheWhereInput | MarketDataCacheWhereInput[]
    OR?: MarketDataCacheWhereInput[]
    NOT?: MarketDataCacheWhereInput | MarketDataCacheWhereInput[]
    id?: StringFilter<"MarketDataCache"> | string
    symbol?: StringFilter<"MarketDataCache"> | string
    type?: StringFilter<"MarketDataCache"> | string
    interval?: StringFilter<"MarketDataCache"> | string
    startTime?: DateTimeFilter<"MarketDataCache"> | Date | string
    endTime?: DateTimeFilter<"MarketDataCache"> | Date | string
    dataCount?: IntFilter<"MarketDataCache"> | number
    data?: JsonFilter<"MarketDataCache">
    createdAt?: DateTimeFilter<"MarketDataCache"> | Date | string
  }

  export type MarketDataCacheOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    type?: SortOrder
    interval?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dataCount?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketDataCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    symbol_type_interval_startTime_endTime?: MarketDataCacheSymbolTypeIntervalStartTimeEndTimeCompoundUniqueInput
    AND?: MarketDataCacheWhereInput | MarketDataCacheWhereInput[]
    OR?: MarketDataCacheWhereInput[]
    NOT?: MarketDataCacheWhereInput | MarketDataCacheWhereInput[]
    symbol?: StringFilter<"MarketDataCache"> | string
    type?: StringFilter<"MarketDataCache"> | string
    interval?: StringFilter<"MarketDataCache"> | string
    startTime?: DateTimeFilter<"MarketDataCache"> | Date | string
    endTime?: DateTimeFilter<"MarketDataCache"> | Date | string
    dataCount?: IntFilter<"MarketDataCache"> | number
    data?: JsonFilter<"MarketDataCache">
    createdAt?: DateTimeFilter<"MarketDataCache"> | Date | string
  }, "id" | "symbol_type_interval_startTime_endTime">

  export type MarketDataCacheOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    type?: SortOrder
    interval?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dataCount?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    _count?: MarketDataCacheCountOrderByAggregateInput
    _avg?: MarketDataCacheAvgOrderByAggregateInput
    _max?: MarketDataCacheMaxOrderByAggregateInput
    _min?: MarketDataCacheMinOrderByAggregateInput
    _sum?: MarketDataCacheSumOrderByAggregateInput
  }

  export type MarketDataCacheScalarWhereWithAggregatesInput = {
    AND?: MarketDataCacheScalarWhereWithAggregatesInput | MarketDataCacheScalarWhereWithAggregatesInput[]
    OR?: MarketDataCacheScalarWhereWithAggregatesInput[]
    NOT?: MarketDataCacheScalarWhereWithAggregatesInput | MarketDataCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MarketDataCache"> | string
    symbol?: StringWithAggregatesFilter<"MarketDataCache"> | string
    type?: StringWithAggregatesFilter<"MarketDataCache"> | string
    interval?: StringWithAggregatesFilter<"MarketDataCache"> | string
    startTime?: DateTimeWithAggregatesFilter<"MarketDataCache"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"MarketDataCache"> | Date | string
    dataCount?: IntWithAggregatesFilter<"MarketDataCache"> | number
    data?: JsonWithAggregatesFilter<"MarketDataCache">
    createdAt?: DateTimeWithAggregatesFilter<"MarketDataCache"> | Date | string
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    link: string
    source: string
    author?: string | null
    publishedAt: Date | string
    ingestedAt?: Date | string
    summary?: string | null
    content?: string | null
    imageUrl?: string | null
    fingerprint: string
    tags?: ArticleCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    link: string
    source: string
    author?: string | null
    publishedAt: Date | string
    ingestedAt?: Date | string
    summary?: string | null
    content?: string | null
    imageUrl?: string | null
    fingerprint: string
    tags?: ArticleCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprint?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprint?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateManyInput = {
    id?: string
    title: string
    link: string
    source: string
    author?: string | null
    publishedAt: Date | string
    ingestedAt?: Date | string
    summary?: string | null
    content?: string | null
    imageUrl?: string | null
    fingerprint: string
    tags?: ArticleCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprint?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprint?: StringFieldUpdateOperationsInput | string
    tags?: ArticleUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceCreateInput = {
    id?: string
    name: string
    url: string
    type: string
    tags?: SourceCreatetagsInput | string[]
    active?: boolean
    schedule?: string | null
    createdAt?: Date | string
  }

  export type SourceUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    type: string
    tags?: SourceCreatetagsInput | string[]
    active?: boolean
    schedule?: string | null
    createdAt?: Date | string
  }

  export type SourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    tags?: SourceUpdatetagsInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    tags?: SourceUpdatetagsInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceCreateManyInput = {
    id?: string
    name: string
    url: string
    type: string
    tags?: SourceCreatetagsInput | string[]
    active?: boolean
    schedule?: string | null
    createdAt?: Date | string
  }

  export type SourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    tags?: SourceUpdatetagsInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    tags?: SourceUpdatetagsInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserCreatebookmarksInput | string[]
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserCreatebookmarksInput | string[]
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserCreatebookmarksInput | string[]
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
  }

  export type SessionCreateInput = {
    id: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaAgentCreateInput = {
    id?: string
    name: string
    model: string
    personality?: string | null
    strategy?: string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: ArenaParticipationCreateNestedManyWithoutAgentInput
  }

  export type ArenaAgentUncheckedCreateInput = {
    id?: string
    name: string
    model: string
    personality?: string | null
    strategy?: string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: ArenaParticipationUncheckedCreateNestedManyWithoutAgentInput
  }

  export type ArenaAgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    strategy?: NullableStringFieldUpdateOperationsInput | string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ArenaParticipationUpdateManyWithoutAgentNestedInput
  }

  export type ArenaAgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    strategy?: NullableStringFieldUpdateOperationsInput | string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ArenaParticipationUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type ArenaAgentCreateManyInput = {
    id?: string
    name: string
    model: string
    personality?: string | null
    strategy?: string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArenaAgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    strategy?: NullableStringFieldUpdateOperationsInput | string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaAgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    strategy?: NullableStringFieldUpdateOperationsInput | string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaSimulationCreateInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    participants?: ArenaParticipationCreateNestedManyWithoutSimulationInput
    trades?: ArenaTradeCreateNestedManyWithoutSimulationInput
    snapshots?: ArenaSnapshotCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationUncheckedCreateInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    participants?: ArenaParticipationUncheckedCreateNestedManyWithoutSimulationInput
    trades?: ArenaTradeUncheckedCreateNestedManyWithoutSimulationInput
    snapshots?: ArenaSnapshotUncheckedCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ArenaParticipationUpdateManyWithoutSimulationNestedInput
    trades?: ArenaTradeUpdateManyWithoutSimulationNestedInput
    snapshots?: ArenaSnapshotUpdateManyWithoutSimulationNestedInput
  }

  export type ArenaSimulationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ArenaParticipationUncheckedUpdateManyWithoutSimulationNestedInput
    trades?: ArenaTradeUncheckedUpdateManyWithoutSimulationNestedInput
    snapshots?: ArenaSnapshotUncheckedUpdateManyWithoutSimulationNestedInput
  }

  export type ArenaSimulationCreateManyInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
  }

  export type ArenaSimulationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaSimulationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaParticipationCreateInput = {
    id?: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
    simulation: ArenaSimulationCreateNestedOneWithoutParticipantsInput
    agent: ArenaAgentCreateNestedOneWithoutParticipationsInput
    trades?: ArenaTradeCreateNestedManyWithoutParticipationInput
  }

  export type ArenaParticipationUncheckedCreateInput = {
    id?: string
    simulationId: string
    agentId: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
    trades?: ArenaTradeUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ArenaParticipationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    simulation?: ArenaSimulationUpdateOneRequiredWithoutParticipantsNestedInput
    agent?: ArenaAgentUpdateOneRequiredWithoutParticipationsNestedInput
    trades?: ArenaTradeUpdateManyWithoutParticipationNestedInput
  }

  export type ArenaParticipationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    trades?: ArenaTradeUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ArenaParticipationCreateManyInput = {
    id?: string
    simulationId: string
    agentId: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
  }

  export type ArenaParticipationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ArenaParticipationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ArenaTradeCreateInput = {
    id?: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
    simulation: ArenaSimulationCreateNestedOneWithoutTradesInput
    participation: ArenaParticipationCreateNestedOneWithoutTradesInput
  }

  export type ArenaTradeUncheckedCreateInput = {
    id?: string
    simulationId: string
    participationId: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
  }

  export type ArenaTradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    simulation?: ArenaSimulationUpdateOneRequiredWithoutTradesNestedInput
    participation?: ArenaParticipationUpdateOneRequiredWithoutTradesNestedInput
  }

  export type ArenaTradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    participationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaTradeCreateManyInput = {
    id?: string
    simulationId: string
    participationId: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
  }

  export type ArenaTradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaTradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    participationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaSnapshotCreateInput = {
    id?: string
    timestamp: Date | string
    tick: number
    price: number
    data: JsonNullValueInput | InputJsonValue
    simulation: ArenaSimulationCreateNestedOneWithoutSnapshotsInput
  }

  export type ArenaSnapshotUncheckedCreateInput = {
    id?: string
    simulationId: string
    timestamp: Date | string
    tick: number
    price: number
    data: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    tick?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
    simulation?: ArenaSimulationUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type ArenaSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    tick?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotCreateManyInput = {
    id?: string
    simulationId: string
    timestamp: Date | string
    tick: number
    price: number
    data: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    tick?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    tick?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
  }

  export type ArenaLeaderboardCreateInput = {
    id?: string
    agentId: string
    agentName: string
    totalWins?: number
    totalSimulations?: number
    avgPnl?: number
    avgPnlPercent?: number
    avgSharpe?: number
    bestPnl?: number
    worstPnl?: number
    lastUpdated?: Date | string
  }

  export type ArenaLeaderboardUncheckedCreateInput = {
    id?: string
    agentId: string
    agentName: string
    totalWins?: number
    totalSimulations?: number
    avgPnl?: number
    avgPnlPercent?: number
    avgSharpe?: number
    bestPnl?: number
    worstPnl?: number
    lastUpdated?: Date | string
  }

  export type ArenaLeaderboardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalWins?: IntFieldUpdateOperationsInput | number
    totalSimulations?: IntFieldUpdateOperationsInput | number
    avgPnl?: FloatFieldUpdateOperationsInput | number
    avgPnlPercent?: FloatFieldUpdateOperationsInput | number
    avgSharpe?: FloatFieldUpdateOperationsInput | number
    bestPnl?: FloatFieldUpdateOperationsInput | number
    worstPnl?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaLeaderboardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalWins?: IntFieldUpdateOperationsInput | number
    totalSimulations?: IntFieldUpdateOperationsInput | number
    avgPnl?: FloatFieldUpdateOperationsInput | number
    avgPnlPercent?: FloatFieldUpdateOperationsInput | number
    avgSharpe?: FloatFieldUpdateOperationsInput | number
    bestPnl?: FloatFieldUpdateOperationsInput | number
    worstPnl?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaLeaderboardCreateManyInput = {
    id?: string
    agentId: string
    agentName: string
    totalWins?: number
    totalSimulations?: number
    avgPnl?: number
    avgPnlPercent?: number
    avgSharpe?: number
    bestPnl?: number
    worstPnl?: number
    lastUpdated?: Date | string
  }

  export type ArenaLeaderboardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalWins?: IntFieldUpdateOperationsInput | number
    totalSimulations?: IntFieldUpdateOperationsInput | number
    avgPnl?: FloatFieldUpdateOperationsInput | number
    avgPnlPercent?: FloatFieldUpdateOperationsInput | number
    avgSharpe?: FloatFieldUpdateOperationsInput | number
    bestPnl?: FloatFieldUpdateOperationsInput | number
    worstPnl?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaLeaderboardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    totalWins?: IntFieldUpdateOperationsInput | number
    totalSimulations?: IntFieldUpdateOperationsInput | number
    avgPnl?: FloatFieldUpdateOperationsInput | number
    avgPnlPercent?: FloatFieldUpdateOperationsInput | number
    avgSharpe?: FloatFieldUpdateOperationsInput | number
    bestPnl?: FloatFieldUpdateOperationsInput | number
    worstPnl?: FloatFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketDataCacheCreateInput = {
    id?: string
    symbol: string
    type: string
    interval: string
    startTime: Date | string
    endTime: Date | string
    dataCount: number
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MarketDataCacheUncheckedCreateInput = {
    id?: string
    symbol: string
    type: string
    interval: string
    startTime: Date | string
    endTime: Date | string
    dataCount: number
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MarketDataCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    dataCount?: IntFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketDataCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    dataCount?: IntFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketDataCacheCreateManyInput = {
    id?: string
    symbol: string
    type: string
    interval: string
    startTime: Date | string
    endTime: Date | string
    dataCount: number
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MarketDataCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    dataCount?: IntFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketDataCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    dataCount?: IntFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    link?: SortOrder
    source?: SortOrder
    author?: SortOrder
    publishedAt?: SortOrder
    ingestedAt?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    fingerprint?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    link?: SortOrder
    source?: SortOrder
    author?: SortOrder
    publishedAt?: SortOrder
    ingestedAt?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    fingerprint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    link?: SortOrder
    source?: SortOrder
    author?: SortOrder
    publishedAt?: SortOrder
    ingestedAt?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    fingerprint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    active?: SortOrder
    schedule?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    active?: SortOrder
    schedule?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    active?: SortOrder
    schedule?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    preferences?: SortOrder
    bookmarks?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ArenaParticipationListRelationFilter = {
    every?: ArenaParticipationWhereInput
    some?: ArenaParticipationWhereInput
    none?: ArenaParticipationWhereInput
  }

  export type ArenaParticipationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArenaAgentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    personality?: SortOrder
    strategy?: SortOrder
    config?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArenaAgentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    personality?: SortOrder
    strategy?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArenaAgentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    personality?: SortOrder
    strategy?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
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

  export type ArenaTradeListRelationFilter = {
    every?: ArenaTradeWhereInput
    some?: ArenaTradeWhereInput
    none?: ArenaTradeWhereInput
  }

  export type ArenaSnapshotListRelationFilter = {
    every?: ArenaSnapshotWhereInput
    some?: ArenaSnapshotWhereInput
    none?: ArenaSnapshotWhereInput
  }

  export type ArenaTradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArenaSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArenaSimulationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    market?: SortOrder
    marketType?: SortOrder
    interval?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    initialBalance?: SortOrder
    tickIntervalMs?: SortOrder
    priceImpact?: SortOrder
    config?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    pausedAt?: SortOrder
    completedAt?: SortOrder
    errorMessage?: SortOrder
  }

  export type ArenaSimulationAvgOrderByAggregateInput = {
    initialBalance?: SortOrder
    tickIntervalMs?: SortOrder
    priceImpact?: SortOrder
  }

  export type ArenaSimulationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    market?: SortOrder
    marketType?: SortOrder
    interval?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    initialBalance?: SortOrder
    tickIntervalMs?: SortOrder
    priceImpact?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    pausedAt?: SortOrder
    completedAt?: SortOrder
    errorMessage?: SortOrder
  }

  export type ArenaSimulationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    market?: SortOrder
    marketType?: SortOrder
    interval?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    initialBalance?: SortOrder
    tickIntervalMs?: SortOrder
    priceImpact?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    pausedAt?: SortOrder
    completedAt?: SortOrder
    errorMessage?: SortOrder
  }

  export type ArenaSimulationSumOrderByAggregateInput = {
    initialBalance?: SortOrder
    tickIntervalMs?: SortOrder
    priceImpact?: SortOrder
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ArenaSimulationScalarRelationFilter = {
    is?: ArenaSimulationWhereInput
    isNot?: ArenaSimulationWhereInput
  }

  export type ArenaAgentScalarRelationFilter = {
    is?: ArenaAgentWhereInput
    isNot?: ArenaAgentWhereInput
  }

  export type ArenaParticipationSimulationIdAgentIdCompoundUniqueInput = {
    simulationId: string
    agentId: string
  }

  export type ArenaParticipationCountOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    agentId?: SortOrder
    finalBalance?: SortOrder
    pnl?: SortOrder
    pnlPercent?: SortOrder
    sharpeRatio?: SortOrder
    winRate?: SortOrder
    totalTrades?: SortOrder
    rank?: SortOrder
  }

  export type ArenaParticipationAvgOrderByAggregateInput = {
    finalBalance?: SortOrder
    pnl?: SortOrder
    pnlPercent?: SortOrder
    sharpeRatio?: SortOrder
    winRate?: SortOrder
    totalTrades?: SortOrder
    rank?: SortOrder
  }

  export type ArenaParticipationMaxOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    agentId?: SortOrder
    finalBalance?: SortOrder
    pnl?: SortOrder
    pnlPercent?: SortOrder
    sharpeRatio?: SortOrder
    winRate?: SortOrder
    totalTrades?: SortOrder
    rank?: SortOrder
  }

  export type ArenaParticipationMinOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    agentId?: SortOrder
    finalBalance?: SortOrder
    pnl?: SortOrder
    pnlPercent?: SortOrder
    sharpeRatio?: SortOrder
    winRate?: SortOrder
    totalTrades?: SortOrder
    rank?: SortOrder
  }

  export type ArenaParticipationSumOrderByAggregateInput = {
    finalBalance?: SortOrder
    pnl?: SortOrder
    pnlPercent?: SortOrder
    sharpeRatio?: SortOrder
    winRate?: SortOrder
    totalTrades?: SortOrder
    rank?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type ArenaParticipationScalarRelationFilter = {
    is?: ArenaParticipationWhereInput
    isNot?: ArenaParticipationWhereInput
  }

  export type ArenaTradeCountOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    participationId?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
    reasoning?: SortOrder
  }

  export type ArenaTradeAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
  }

  export type ArenaTradeMaxOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    participationId?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
    reasoning?: SortOrder
  }

  export type ArenaTradeMinOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    participationId?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
    reasoning?: SortOrder
  }

  export type ArenaTradeSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
  }

  export type ArenaSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    timestamp?: SortOrder
    tick?: SortOrder
    price?: SortOrder
    data?: SortOrder
  }

  export type ArenaSnapshotAvgOrderByAggregateInput = {
    tick?: SortOrder
    price?: SortOrder
  }

  export type ArenaSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    timestamp?: SortOrder
    tick?: SortOrder
    price?: SortOrder
  }

  export type ArenaSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    simulationId?: SortOrder
    timestamp?: SortOrder
    tick?: SortOrder
    price?: SortOrder
  }

  export type ArenaSnapshotSumOrderByAggregateInput = {
    tick?: SortOrder
    price?: SortOrder
  }

  export type ArenaLeaderboardCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalWins?: SortOrder
    totalSimulations?: SortOrder
    avgPnl?: SortOrder
    avgPnlPercent?: SortOrder
    avgSharpe?: SortOrder
    bestPnl?: SortOrder
    worstPnl?: SortOrder
    lastUpdated?: SortOrder
  }

  export type ArenaLeaderboardAvgOrderByAggregateInput = {
    totalWins?: SortOrder
    totalSimulations?: SortOrder
    avgPnl?: SortOrder
    avgPnlPercent?: SortOrder
    avgSharpe?: SortOrder
    bestPnl?: SortOrder
    worstPnl?: SortOrder
  }

  export type ArenaLeaderboardMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalWins?: SortOrder
    totalSimulations?: SortOrder
    avgPnl?: SortOrder
    avgPnlPercent?: SortOrder
    avgSharpe?: SortOrder
    bestPnl?: SortOrder
    worstPnl?: SortOrder
    lastUpdated?: SortOrder
  }

  export type ArenaLeaderboardMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    agentName?: SortOrder
    totalWins?: SortOrder
    totalSimulations?: SortOrder
    avgPnl?: SortOrder
    avgPnlPercent?: SortOrder
    avgSharpe?: SortOrder
    bestPnl?: SortOrder
    worstPnl?: SortOrder
    lastUpdated?: SortOrder
  }

  export type ArenaLeaderboardSumOrderByAggregateInput = {
    totalWins?: SortOrder
    totalSimulations?: SortOrder
    avgPnl?: SortOrder
    avgPnlPercent?: SortOrder
    avgSharpe?: SortOrder
    bestPnl?: SortOrder
    worstPnl?: SortOrder
  }

  export type MarketDataCacheSymbolTypeIntervalStartTimeEndTimeCompoundUniqueInput = {
    symbol: string
    type: string
    interval: string
    startTime: Date | string
    endTime: Date | string
  }

  export type MarketDataCacheCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    type?: SortOrder
    interval?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dataCount?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketDataCacheAvgOrderByAggregateInput = {
    dataCount?: SortOrder
  }

  export type MarketDataCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    type?: SortOrder
    interval?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dataCount?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketDataCacheMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    type?: SortOrder
    interval?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    dataCount?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketDataCacheSumOrderByAggregateInput = {
    dataCount?: SortOrder
  }

  export type ArticleCreatetagsInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ArticleUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SourceCreatetagsInput = {
    set: string[]
  }

  export type SourceUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserCreatebookmarksInput = {
    set: string[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type UserUpdatebookmarksInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type ArenaParticipationCreateNestedManyWithoutAgentInput = {
    create?: XOR<ArenaParticipationCreateWithoutAgentInput, ArenaParticipationUncheckedCreateWithoutAgentInput> | ArenaParticipationCreateWithoutAgentInput[] | ArenaParticipationUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutAgentInput | ArenaParticipationCreateOrConnectWithoutAgentInput[]
    createMany?: ArenaParticipationCreateManyAgentInputEnvelope
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
  }

  export type ArenaParticipationUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<ArenaParticipationCreateWithoutAgentInput, ArenaParticipationUncheckedCreateWithoutAgentInput> | ArenaParticipationCreateWithoutAgentInput[] | ArenaParticipationUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutAgentInput | ArenaParticipationCreateOrConnectWithoutAgentInput[]
    createMany?: ArenaParticipationCreateManyAgentInputEnvelope
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
  }

  export type ArenaParticipationUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ArenaParticipationCreateWithoutAgentInput, ArenaParticipationUncheckedCreateWithoutAgentInput> | ArenaParticipationCreateWithoutAgentInput[] | ArenaParticipationUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutAgentInput | ArenaParticipationCreateOrConnectWithoutAgentInput[]
    upsert?: ArenaParticipationUpsertWithWhereUniqueWithoutAgentInput | ArenaParticipationUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ArenaParticipationCreateManyAgentInputEnvelope
    set?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    disconnect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    delete?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    update?: ArenaParticipationUpdateWithWhereUniqueWithoutAgentInput | ArenaParticipationUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ArenaParticipationUpdateManyWithWhereWithoutAgentInput | ArenaParticipationUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ArenaParticipationScalarWhereInput | ArenaParticipationScalarWhereInput[]
  }

  export type ArenaParticipationUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ArenaParticipationCreateWithoutAgentInput, ArenaParticipationUncheckedCreateWithoutAgentInput> | ArenaParticipationCreateWithoutAgentInput[] | ArenaParticipationUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutAgentInput | ArenaParticipationCreateOrConnectWithoutAgentInput[]
    upsert?: ArenaParticipationUpsertWithWhereUniqueWithoutAgentInput | ArenaParticipationUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ArenaParticipationCreateManyAgentInputEnvelope
    set?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    disconnect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    delete?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    update?: ArenaParticipationUpdateWithWhereUniqueWithoutAgentInput | ArenaParticipationUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ArenaParticipationUpdateManyWithWhereWithoutAgentInput | ArenaParticipationUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ArenaParticipationScalarWhereInput | ArenaParticipationScalarWhereInput[]
  }

  export type ArenaParticipationCreateNestedManyWithoutSimulationInput = {
    create?: XOR<ArenaParticipationCreateWithoutSimulationInput, ArenaParticipationUncheckedCreateWithoutSimulationInput> | ArenaParticipationCreateWithoutSimulationInput[] | ArenaParticipationUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutSimulationInput | ArenaParticipationCreateOrConnectWithoutSimulationInput[]
    createMany?: ArenaParticipationCreateManySimulationInputEnvelope
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
  }

  export type ArenaTradeCreateNestedManyWithoutSimulationInput = {
    create?: XOR<ArenaTradeCreateWithoutSimulationInput, ArenaTradeUncheckedCreateWithoutSimulationInput> | ArenaTradeCreateWithoutSimulationInput[] | ArenaTradeUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutSimulationInput | ArenaTradeCreateOrConnectWithoutSimulationInput[]
    createMany?: ArenaTradeCreateManySimulationInputEnvelope
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
  }

  export type ArenaSnapshotCreateNestedManyWithoutSimulationInput = {
    create?: XOR<ArenaSnapshotCreateWithoutSimulationInput, ArenaSnapshotUncheckedCreateWithoutSimulationInput> | ArenaSnapshotCreateWithoutSimulationInput[] | ArenaSnapshotUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaSnapshotCreateOrConnectWithoutSimulationInput | ArenaSnapshotCreateOrConnectWithoutSimulationInput[]
    createMany?: ArenaSnapshotCreateManySimulationInputEnvelope
    connect?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
  }

  export type ArenaParticipationUncheckedCreateNestedManyWithoutSimulationInput = {
    create?: XOR<ArenaParticipationCreateWithoutSimulationInput, ArenaParticipationUncheckedCreateWithoutSimulationInput> | ArenaParticipationCreateWithoutSimulationInput[] | ArenaParticipationUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutSimulationInput | ArenaParticipationCreateOrConnectWithoutSimulationInput[]
    createMany?: ArenaParticipationCreateManySimulationInputEnvelope
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
  }

  export type ArenaTradeUncheckedCreateNestedManyWithoutSimulationInput = {
    create?: XOR<ArenaTradeCreateWithoutSimulationInput, ArenaTradeUncheckedCreateWithoutSimulationInput> | ArenaTradeCreateWithoutSimulationInput[] | ArenaTradeUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutSimulationInput | ArenaTradeCreateOrConnectWithoutSimulationInput[]
    createMany?: ArenaTradeCreateManySimulationInputEnvelope
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
  }

  export type ArenaSnapshotUncheckedCreateNestedManyWithoutSimulationInput = {
    create?: XOR<ArenaSnapshotCreateWithoutSimulationInput, ArenaSnapshotUncheckedCreateWithoutSimulationInput> | ArenaSnapshotCreateWithoutSimulationInput[] | ArenaSnapshotUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaSnapshotCreateOrConnectWithoutSimulationInput | ArenaSnapshotCreateOrConnectWithoutSimulationInput[]
    createMany?: ArenaSnapshotCreateManySimulationInputEnvelope
    connect?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
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

  export type ArenaParticipationUpdateManyWithoutSimulationNestedInput = {
    create?: XOR<ArenaParticipationCreateWithoutSimulationInput, ArenaParticipationUncheckedCreateWithoutSimulationInput> | ArenaParticipationCreateWithoutSimulationInput[] | ArenaParticipationUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutSimulationInput | ArenaParticipationCreateOrConnectWithoutSimulationInput[]
    upsert?: ArenaParticipationUpsertWithWhereUniqueWithoutSimulationInput | ArenaParticipationUpsertWithWhereUniqueWithoutSimulationInput[]
    createMany?: ArenaParticipationCreateManySimulationInputEnvelope
    set?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    disconnect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    delete?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    update?: ArenaParticipationUpdateWithWhereUniqueWithoutSimulationInput | ArenaParticipationUpdateWithWhereUniqueWithoutSimulationInput[]
    updateMany?: ArenaParticipationUpdateManyWithWhereWithoutSimulationInput | ArenaParticipationUpdateManyWithWhereWithoutSimulationInput[]
    deleteMany?: ArenaParticipationScalarWhereInput | ArenaParticipationScalarWhereInput[]
  }

  export type ArenaTradeUpdateManyWithoutSimulationNestedInput = {
    create?: XOR<ArenaTradeCreateWithoutSimulationInput, ArenaTradeUncheckedCreateWithoutSimulationInput> | ArenaTradeCreateWithoutSimulationInput[] | ArenaTradeUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutSimulationInput | ArenaTradeCreateOrConnectWithoutSimulationInput[]
    upsert?: ArenaTradeUpsertWithWhereUniqueWithoutSimulationInput | ArenaTradeUpsertWithWhereUniqueWithoutSimulationInput[]
    createMany?: ArenaTradeCreateManySimulationInputEnvelope
    set?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    disconnect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    delete?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    update?: ArenaTradeUpdateWithWhereUniqueWithoutSimulationInput | ArenaTradeUpdateWithWhereUniqueWithoutSimulationInput[]
    updateMany?: ArenaTradeUpdateManyWithWhereWithoutSimulationInput | ArenaTradeUpdateManyWithWhereWithoutSimulationInput[]
    deleteMany?: ArenaTradeScalarWhereInput | ArenaTradeScalarWhereInput[]
  }

  export type ArenaSnapshotUpdateManyWithoutSimulationNestedInput = {
    create?: XOR<ArenaSnapshotCreateWithoutSimulationInput, ArenaSnapshotUncheckedCreateWithoutSimulationInput> | ArenaSnapshotCreateWithoutSimulationInput[] | ArenaSnapshotUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaSnapshotCreateOrConnectWithoutSimulationInput | ArenaSnapshotCreateOrConnectWithoutSimulationInput[]
    upsert?: ArenaSnapshotUpsertWithWhereUniqueWithoutSimulationInput | ArenaSnapshotUpsertWithWhereUniqueWithoutSimulationInput[]
    createMany?: ArenaSnapshotCreateManySimulationInputEnvelope
    set?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    disconnect?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    delete?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    connect?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    update?: ArenaSnapshotUpdateWithWhereUniqueWithoutSimulationInput | ArenaSnapshotUpdateWithWhereUniqueWithoutSimulationInput[]
    updateMany?: ArenaSnapshotUpdateManyWithWhereWithoutSimulationInput | ArenaSnapshotUpdateManyWithWhereWithoutSimulationInput[]
    deleteMany?: ArenaSnapshotScalarWhereInput | ArenaSnapshotScalarWhereInput[]
  }

  export type ArenaParticipationUncheckedUpdateManyWithoutSimulationNestedInput = {
    create?: XOR<ArenaParticipationCreateWithoutSimulationInput, ArenaParticipationUncheckedCreateWithoutSimulationInput> | ArenaParticipationCreateWithoutSimulationInput[] | ArenaParticipationUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutSimulationInput | ArenaParticipationCreateOrConnectWithoutSimulationInput[]
    upsert?: ArenaParticipationUpsertWithWhereUniqueWithoutSimulationInput | ArenaParticipationUpsertWithWhereUniqueWithoutSimulationInput[]
    createMany?: ArenaParticipationCreateManySimulationInputEnvelope
    set?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    disconnect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    delete?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    connect?: ArenaParticipationWhereUniqueInput | ArenaParticipationWhereUniqueInput[]
    update?: ArenaParticipationUpdateWithWhereUniqueWithoutSimulationInput | ArenaParticipationUpdateWithWhereUniqueWithoutSimulationInput[]
    updateMany?: ArenaParticipationUpdateManyWithWhereWithoutSimulationInput | ArenaParticipationUpdateManyWithWhereWithoutSimulationInput[]
    deleteMany?: ArenaParticipationScalarWhereInput | ArenaParticipationScalarWhereInput[]
  }

  export type ArenaTradeUncheckedUpdateManyWithoutSimulationNestedInput = {
    create?: XOR<ArenaTradeCreateWithoutSimulationInput, ArenaTradeUncheckedCreateWithoutSimulationInput> | ArenaTradeCreateWithoutSimulationInput[] | ArenaTradeUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutSimulationInput | ArenaTradeCreateOrConnectWithoutSimulationInput[]
    upsert?: ArenaTradeUpsertWithWhereUniqueWithoutSimulationInput | ArenaTradeUpsertWithWhereUniqueWithoutSimulationInput[]
    createMany?: ArenaTradeCreateManySimulationInputEnvelope
    set?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    disconnect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    delete?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    update?: ArenaTradeUpdateWithWhereUniqueWithoutSimulationInput | ArenaTradeUpdateWithWhereUniqueWithoutSimulationInput[]
    updateMany?: ArenaTradeUpdateManyWithWhereWithoutSimulationInput | ArenaTradeUpdateManyWithWhereWithoutSimulationInput[]
    deleteMany?: ArenaTradeScalarWhereInput | ArenaTradeScalarWhereInput[]
  }

  export type ArenaSnapshotUncheckedUpdateManyWithoutSimulationNestedInput = {
    create?: XOR<ArenaSnapshotCreateWithoutSimulationInput, ArenaSnapshotUncheckedCreateWithoutSimulationInput> | ArenaSnapshotCreateWithoutSimulationInput[] | ArenaSnapshotUncheckedCreateWithoutSimulationInput[]
    connectOrCreate?: ArenaSnapshotCreateOrConnectWithoutSimulationInput | ArenaSnapshotCreateOrConnectWithoutSimulationInput[]
    upsert?: ArenaSnapshotUpsertWithWhereUniqueWithoutSimulationInput | ArenaSnapshotUpsertWithWhereUniqueWithoutSimulationInput[]
    createMany?: ArenaSnapshotCreateManySimulationInputEnvelope
    set?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    disconnect?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    delete?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    connect?: ArenaSnapshotWhereUniqueInput | ArenaSnapshotWhereUniqueInput[]
    update?: ArenaSnapshotUpdateWithWhereUniqueWithoutSimulationInput | ArenaSnapshotUpdateWithWhereUniqueWithoutSimulationInput[]
    updateMany?: ArenaSnapshotUpdateManyWithWhereWithoutSimulationInput | ArenaSnapshotUpdateManyWithWhereWithoutSimulationInput[]
    deleteMany?: ArenaSnapshotScalarWhereInput | ArenaSnapshotScalarWhereInput[]
  }

  export type ArenaSimulationCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<ArenaSimulationCreateWithoutParticipantsInput, ArenaSimulationUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ArenaSimulationCreateOrConnectWithoutParticipantsInput
    connect?: ArenaSimulationWhereUniqueInput
  }

  export type ArenaAgentCreateNestedOneWithoutParticipationsInput = {
    create?: XOR<ArenaAgentCreateWithoutParticipationsInput, ArenaAgentUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: ArenaAgentCreateOrConnectWithoutParticipationsInput
    connect?: ArenaAgentWhereUniqueInput
  }

  export type ArenaTradeCreateNestedManyWithoutParticipationInput = {
    create?: XOR<ArenaTradeCreateWithoutParticipationInput, ArenaTradeUncheckedCreateWithoutParticipationInput> | ArenaTradeCreateWithoutParticipationInput[] | ArenaTradeUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutParticipationInput | ArenaTradeCreateOrConnectWithoutParticipationInput[]
    createMany?: ArenaTradeCreateManyParticipationInputEnvelope
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
  }

  export type ArenaTradeUncheckedCreateNestedManyWithoutParticipationInput = {
    create?: XOR<ArenaTradeCreateWithoutParticipationInput, ArenaTradeUncheckedCreateWithoutParticipationInput> | ArenaTradeCreateWithoutParticipationInput[] | ArenaTradeUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutParticipationInput | ArenaTradeCreateOrConnectWithoutParticipationInput[]
    createMany?: ArenaTradeCreateManyParticipationInputEnvelope
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ArenaSimulationUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<ArenaSimulationCreateWithoutParticipantsInput, ArenaSimulationUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ArenaSimulationCreateOrConnectWithoutParticipantsInput
    upsert?: ArenaSimulationUpsertWithoutParticipantsInput
    connect?: ArenaSimulationWhereUniqueInput
    update?: XOR<XOR<ArenaSimulationUpdateToOneWithWhereWithoutParticipantsInput, ArenaSimulationUpdateWithoutParticipantsInput>, ArenaSimulationUncheckedUpdateWithoutParticipantsInput>
  }

  export type ArenaAgentUpdateOneRequiredWithoutParticipationsNestedInput = {
    create?: XOR<ArenaAgentCreateWithoutParticipationsInput, ArenaAgentUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: ArenaAgentCreateOrConnectWithoutParticipationsInput
    upsert?: ArenaAgentUpsertWithoutParticipationsInput
    connect?: ArenaAgentWhereUniqueInput
    update?: XOR<XOR<ArenaAgentUpdateToOneWithWhereWithoutParticipationsInput, ArenaAgentUpdateWithoutParticipationsInput>, ArenaAgentUncheckedUpdateWithoutParticipationsInput>
  }

  export type ArenaTradeUpdateManyWithoutParticipationNestedInput = {
    create?: XOR<ArenaTradeCreateWithoutParticipationInput, ArenaTradeUncheckedCreateWithoutParticipationInput> | ArenaTradeCreateWithoutParticipationInput[] | ArenaTradeUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutParticipationInput | ArenaTradeCreateOrConnectWithoutParticipationInput[]
    upsert?: ArenaTradeUpsertWithWhereUniqueWithoutParticipationInput | ArenaTradeUpsertWithWhereUniqueWithoutParticipationInput[]
    createMany?: ArenaTradeCreateManyParticipationInputEnvelope
    set?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    disconnect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    delete?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    update?: ArenaTradeUpdateWithWhereUniqueWithoutParticipationInput | ArenaTradeUpdateWithWhereUniqueWithoutParticipationInput[]
    updateMany?: ArenaTradeUpdateManyWithWhereWithoutParticipationInput | ArenaTradeUpdateManyWithWhereWithoutParticipationInput[]
    deleteMany?: ArenaTradeScalarWhereInput | ArenaTradeScalarWhereInput[]
  }

  export type ArenaTradeUncheckedUpdateManyWithoutParticipationNestedInput = {
    create?: XOR<ArenaTradeCreateWithoutParticipationInput, ArenaTradeUncheckedCreateWithoutParticipationInput> | ArenaTradeCreateWithoutParticipationInput[] | ArenaTradeUncheckedCreateWithoutParticipationInput[]
    connectOrCreate?: ArenaTradeCreateOrConnectWithoutParticipationInput | ArenaTradeCreateOrConnectWithoutParticipationInput[]
    upsert?: ArenaTradeUpsertWithWhereUniqueWithoutParticipationInput | ArenaTradeUpsertWithWhereUniqueWithoutParticipationInput[]
    createMany?: ArenaTradeCreateManyParticipationInputEnvelope
    set?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    disconnect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    delete?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    connect?: ArenaTradeWhereUniqueInput | ArenaTradeWhereUniqueInput[]
    update?: ArenaTradeUpdateWithWhereUniqueWithoutParticipationInput | ArenaTradeUpdateWithWhereUniqueWithoutParticipationInput[]
    updateMany?: ArenaTradeUpdateManyWithWhereWithoutParticipationInput | ArenaTradeUpdateManyWithWhereWithoutParticipationInput[]
    deleteMany?: ArenaTradeScalarWhereInput | ArenaTradeScalarWhereInput[]
  }

  export type ArenaSimulationCreateNestedOneWithoutTradesInput = {
    create?: XOR<ArenaSimulationCreateWithoutTradesInput, ArenaSimulationUncheckedCreateWithoutTradesInput>
    connectOrCreate?: ArenaSimulationCreateOrConnectWithoutTradesInput
    connect?: ArenaSimulationWhereUniqueInput
  }

  export type ArenaParticipationCreateNestedOneWithoutTradesInput = {
    create?: XOR<ArenaParticipationCreateWithoutTradesInput, ArenaParticipationUncheckedCreateWithoutTradesInput>
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutTradesInput
    connect?: ArenaParticipationWhereUniqueInput
  }

  export type ArenaSimulationUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<ArenaSimulationCreateWithoutTradesInput, ArenaSimulationUncheckedCreateWithoutTradesInput>
    connectOrCreate?: ArenaSimulationCreateOrConnectWithoutTradesInput
    upsert?: ArenaSimulationUpsertWithoutTradesInput
    connect?: ArenaSimulationWhereUniqueInput
    update?: XOR<XOR<ArenaSimulationUpdateToOneWithWhereWithoutTradesInput, ArenaSimulationUpdateWithoutTradesInput>, ArenaSimulationUncheckedUpdateWithoutTradesInput>
  }

  export type ArenaParticipationUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<ArenaParticipationCreateWithoutTradesInput, ArenaParticipationUncheckedCreateWithoutTradesInput>
    connectOrCreate?: ArenaParticipationCreateOrConnectWithoutTradesInput
    upsert?: ArenaParticipationUpsertWithoutTradesInput
    connect?: ArenaParticipationWhereUniqueInput
    update?: XOR<XOR<ArenaParticipationUpdateToOneWithWhereWithoutTradesInput, ArenaParticipationUpdateWithoutTradesInput>, ArenaParticipationUncheckedUpdateWithoutTradesInput>
  }

  export type ArenaSimulationCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<ArenaSimulationCreateWithoutSnapshotsInput, ArenaSimulationUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: ArenaSimulationCreateOrConnectWithoutSnapshotsInput
    connect?: ArenaSimulationWhereUniqueInput
  }

  export type ArenaSimulationUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<ArenaSimulationCreateWithoutSnapshotsInput, ArenaSimulationUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: ArenaSimulationCreateOrConnectWithoutSnapshotsInput
    upsert?: ArenaSimulationUpsertWithoutSnapshotsInput
    connect?: ArenaSimulationWhereUniqueInput
    update?: XOR<XOR<ArenaSimulationUpdateToOneWithWhereWithoutSnapshotsInput, ArenaSimulationUpdateWithoutSnapshotsInput>, ArenaSimulationUncheckedUpdateWithoutSnapshotsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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

  export type SessionCreateWithoutUserInput = {
    id: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserCreatebookmarksInput | string[]
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserCreatebookmarksInput | string[]
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserCreatebookmarksInput | string[]
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserCreatebookmarksInput | string[]
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: NullableJsonNullValueInput | InputJsonValue
    bookmarks?: UserUpdatebookmarksInput | string[]
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArenaParticipationCreateWithoutAgentInput = {
    id?: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
    simulation: ArenaSimulationCreateNestedOneWithoutParticipantsInput
    trades?: ArenaTradeCreateNestedManyWithoutParticipationInput
  }

  export type ArenaParticipationUncheckedCreateWithoutAgentInput = {
    id?: string
    simulationId: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
    trades?: ArenaTradeUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ArenaParticipationCreateOrConnectWithoutAgentInput = {
    where: ArenaParticipationWhereUniqueInput
    create: XOR<ArenaParticipationCreateWithoutAgentInput, ArenaParticipationUncheckedCreateWithoutAgentInput>
  }

  export type ArenaParticipationCreateManyAgentInputEnvelope = {
    data: ArenaParticipationCreateManyAgentInput | ArenaParticipationCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type ArenaParticipationUpsertWithWhereUniqueWithoutAgentInput = {
    where: ArenaParticipationWhereUniqueInput
    update: XOR<ArenaParticipationUpdateWithoutAgentInput, ArenaParticipationUncheckedUpdateWithoutAgentInput>
    create: XOR<ArenaParticipationCreateWithoutAgentInput, ArenaParticipationUncheckedCreateWithoutAgentInput>
  }

  export type ArenaParticipationUpdateWithWhereUniqueWithoutAgentInput = {
    where: ArenaParticipationWhereUniqueInput
    data: XOR<ArenaParticipationUpdateWithoutAgentInput, ArenaParticipationUncheckedUpdateWithoutAgentInput>
  }

  export type ArenaParticipationUpdateManyWithWhereWithoutAgentInput = {
    where: ArenaParticipationScalarWhereInput
    data: XOR<ArenaParticipationUpdateManyMutationInput, ArenaParticipationUncheckedUpdateManyWithoutAgentInput>
  }

  export type ArenaParticipationScalarWhereInput = {
    AND?: ArenaParticipationScalarWhereInput | ArenaParticipationScalarWhereInput[]
    OR?: ArenaParticipationScalarWhereInput[]
    NOT?: ArenaParticipationScalarWhereInput | ArenaParticipationScalarWhereInput[]
    id?: StringFilter<"ArenaParticipation"> | string
    simulationId?: StringFilter<"ArenaParticipation"> | string
    agentId?: StringFilter<"ArenaParticipation"> | string
    finalBalance?: FloatNullableFilter<"ArenaParticipation"> | number | null
    pnl?: FloatNullableFilter<"ArenaParticipation"> | number | null
    pnlPercent?: FloatNullableFilter<"ArenaParticipation"> | number | null
    sharpeRatio?: FloatNullableFilter<"ArenaParticipation"> | number | null
    winRate?: FloatNullableFilter<"ArenaParticipation"> | number | null
    totalTrades?: IntFilter<"ArenaParticipation"> | number
    rank?: IntNullableFilter<"ArenaParticipation"> | number | null
  }

  export type ArenaParticipationCreateWithoutSimulationInput = {
    id?: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
    agent: ArenaAgentCreateNestedOneWithoutParticipationsInput
    trades?: ArenaTradeCreateNestedManyWithoutParticipationInput
  }

  export type ArenaParticipationUncheckedCreateWithoutSimulationInput = {
    id?: string
    agentId: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
    trades?: ArenaTradeUncheckedCreateNestedManyWithoutParticipationInput
  }

  export type ArenaParticipationCreateOrConnectWithoutSimulationInput = {
    where: ArenaParticipationWhereUniqueInput
    create: XOR<ArenaParticipationCreateWithoutSimulationInput, ArenaParticipationUncheckedCreateWithoutSimulationInput>
  }

  export type ArenaParticipationCreateManySimulationInputEnvelope = {
    data: ArenaParticipationCreateManySimulationInput | ArenaParticipationCreateManySimulationInput[]
    skipDuplicates?: boolean
  }

  export type ArenaTradeCreateWithoutSimulationInput = {
    id?: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
    participation: ArenaParticipationCreateNestedOneWithoutTradesInput
  }

  export type ArenaTradeUncheckedCreateWithoutSimulationInput = {
    id?: string
    participationId: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
  }

  export type ArenaTradeCreateOrConnectWithoutSimulationInput = {
    where: ArenaTradeWhereUniqueInput
    create: XOR<ArenaTradeCreateWithoutSimulationInput, ArenaTradeUncheckedCreateWithoutSimulationInput>
  }

  export type ArenaTradeCreateManySimulationInputEnvelope = {
    data: ArenaTradeCreateManySimulationInput | ArenaTradeCreateManySimulationInput[]
    skipDuplicates?: boolean
  }

  export type ArenaSnapshotCreateWithoutSimulationInput = {
    id?: string
    timestamp: Date | string
    tick: number
    price: number
    data: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotUncheckedCreateWithoutSimulationInput = {
    id?: string
    timestamp: Date | string
    tick: number
    price: number
    data: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotCreateOrConnectWithoutSimulationInput = {
    where: ArenaSnapshotWhereUniqueInput
    create: XOR<ArenaSnapshotCreateWithoutSimulationInput, ArenaSnapshotUncheckedCreateWithoutSimulationInput>
  }

  export type ArenaSnapshotCreateManySimulationInputEnvelope = {
    data: ArenaSnapshotCreateManySimulationInput | ArenaSnapshotCreateManySimulationInput[]
    skipDuplicates?: boolean
  }

  export type ArenaParticipationUpsertWithWhereUniqueWithoutSimulationInput = {
    where: ArenaParticipationWhereUniqueInput
    update: XOR<ArenaParticipationUpdateWithoutSimulationInput, ArenaParticipationUncheckedUpdateWithoutSimulationInput>
    create: XOR<ArenaParticipationCreateWithoutSimulationInput, ArenaParticipationUncheckedCreateWithoutSimulationInput>
  }

  export type ArenaParticipationUpdateWithWhereUniqueWithoutSimulationInput = {
    where: ArenaParticipationWhereUniqueInput
    data: XOR<ArenaParticipationUpdateWithoutSimulationInput, ArenaParticipationUncheckedUpdateWithoutSimulationInput>
  }

  export type ArenaParticipationUpdateManyWithWhereWithoutSimulationInput = {
    where: ArenaParticipationScalarWhereInput
    data: XOR<ArenaParticipationUpdateManyMutationInput, ArenaParticipationUncheckedUpdateManyWithoutSimulationInput>
  }

  export type ArenaTradeUpsertWithWhereUniqueWithoutSimulationInput = {
    where: ArenaTradeWhereUniqueInput
    update: XOR<ArenaTradeUpdateWithoutSimulationInput, ArenaTradeUncheckedUpdateWithoutSimulationInput>
    create: XOR<ArenaTradeCreateWithoutSimulationInput, ArenaTradeUncheckedCreateWithoutSimulationInput>
  }

  export type ArenaTradeUpdateWithWhereUniqueWithoutSimulationInput = {
    where: ArenaTradeWhereUniqueInput
    data: XOR<ArenaTradeUpdateWithoutSimulationInput, ArenaTradeUncheckedUpdateWithoutSimulationInput>
  }

  export type ArenaTradeUpdateManyWithWhereWithoutSimulationInput = {
    where: ArenaTradeScalarWhereInput
    data: XOR<ArenaTradeUpdateManyMutationInput, ArenaTradeUncheckedUpdateManyWithoutSimulationInput>
  }

  export type ArenaTradeScalarWhereInput = {
    AND?: ArenaTradeScalarWhereInput | ArenaTradeScalarWhereInput[]
    OR?: ArenaTradeScalarWhereInput[]
    NOT?: ArenaTradeScalarWhereInput | ArenaTradeScalarWhereInput[]
    id?: StringFilter<"ArenaTrade"> | string
    simulationId?: StringFilter<"ArenaTrade"> | string
    participationId?: StringFilter<"ArenaTrade"> | string
    timestamp?: DateTimeFilter<"ArenaTrade"> | Date | string
    action?: StringFilter<"ArenaTrade"> | string
    asset?: StringFilter<"ArenaTrade"> | string
    quantity?: FloatFilter<"ArenaTrade"> | number
    price?: FloatFilter<"ArenaTrade"> | number
    total?: FloatFilter<"ArenaTrade"> | number
    reasoning?: StringNullableFilter<"ArenaTrade"> | string | null
  }

  export type ArenaSnapshotUpsertWithWhereUniqueWithoutSimulationInput = {
    where: ArenaSnapshotWhereUniqueInput
    update: XOR<ArenaSnapshotUpdateWithoutSimulationInput, ArenaSnapshotUncheckedUpdateWithoutSimulationInput>
    create: XOR<ArenaSnapshotCreateWithoutSimulationInput, ArenaSnapshotUncheckedCreateWithoutSimulationInput>
  }

  export type ArenaSnapshotUpdateWithWhereUniqueWithoutSimulationInput = {
    where: ArenaSnapshotWhereUniqueInput
    data: XOR<ArenaSnapshotUpdateWithoutSimulationInput, ArenaSnapshotUncheckedUpdateWithoutSimulationInput>
  }

  export type ArenaSnapshotUpdateManyWithWhereWithoutSimulationInput = {
    where: ArenaSnapshotScalarWhereInput
    data: XOR<ArenaSnapshotUpdateManyMutationInput, ArenaSnapshotUncheckedUpdateManyWithoutSimulationInput>
  }

  export type ArenaSnapshotScalarWhereInput = {
    AND?: ArenaSnapshotScalarWhereInput | ArenaSnapshotScalarWhereInput[]
    OR?: ArenaSnapshotScalarWhereInput[]
    NOT?: ArenaSnapshotScalarWhereInput | ArenaSnapshotScalarWhereInput[]
    id?: StringFilter<"ArenaSnapshot"> | string
    simulationId?: StringFilter<"ArenaSnapshot"> | string
    timestamp?: DateTimeFilter<"ArenaSnapshot"> | Date | string
    tick?: IntFilter<"ArenaSnapshot"> | number
    price?: FloatFilter<"ArenaSnapshot"> | number
    data?: JsonFilter<"ArenaSnapshot">
  }

  export type ArenaSimulationCreateWithoutParticipantsInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    trades?: ArenaTradeCreateNestedManyWithoutSimulationInput
    snapshots?: ArenaSnapshotCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationUncheckedCreateWithoutParticipantsInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    trades?: ArenaTradeUncheckedCreateNestedManyWithoutSimulationInput
    snapshots?: ArenaSnapshotUncheckedCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationCreateOrConnectWithoutParticipantsInput = {
    where: ArenaSimulationWhereUniqueInput
    create: XOR<ArenaSimulationCreateWithoutParticipantsInput, ArenaSimulationUncheckedCreateWithoutParticipantsInput>
  }

  export type ArenaAgentCreateWithoutParticipationsInput = {
    id?: string
    name: string
    model: string
    personality?: string | null
    strategy?: string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArenaAgentUncheckedCreateWithoutParticipationsInput = {
    id?: string
    name: string
    model: string
    personality?: string | null
    strategy?: string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArenaAgentCreateOrConnectWithoutParticipationsInput = {
    where: ArenaAgentWhereUniqueInput
    create: XOR<ArenaAgentCreateWithoutParticipationsInput, ArenaAgentUncheckedCreateWithoutParticipationsInput>
  }

  export type ArenaTradeCreateWithoutParticipationInput = {
    id?: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
    simulation: ArenaSimulationCreateNestedOneWithoutTradesInput
  }

  export type ArenaTradeUncheckedCreateWithoutParticipationInput = {
    id?: string
    simulationId: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
  }

  export type ArenaTradeCreateOrConnectWithoutParticipationInput = {
    where: ArenaTradeWhereUniqueInput
    create: XOR<ArenaTradeCreateWithoutParticipationInput, ArenaTradeUncheckedCreateWithoutParticipationInput>
  }

  export type ArenaTradeCreateManyParticipationInputEnvelope = {
    data: ArenaTradeCreateManyParticipationInput | ArenaTradeCreateManyParticipationInput[]
    skipDuplicates?: boolean
  }

  export type ArenaSimulationUpsertWithoutParticipantsInput = {
    update: XOR<ArenaSimulationUpdateWithoutParticipantsInput, ArenaSimulationUncheckedUpdateWithoutParticipantsInput>
    create: XOR<ArenaSimulationCreateWithoutParticipantsInput, ArenaSimulationUncheckedCreateWithoutParticipantsInput>
    where?: ArenaSimulationWhereInput
  }

  export type ArenaSimulationUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: ArenaSimulationWhereInput
    data: XOR<ArenaSimulationUpdateWithoutParticipantsInput, ArenaSimulationUncheckedUpdateWithoutParticipantsInput>
  }

  export type ArenaSimulationUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    trades?: ArenaTradeUpdateManyWithoutSimulationNestedInput
    snapshots?: ArenaSnapshotUpdateManyWithoutSimulationNestedInput
  }

  export type ArenaSimulationUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    trades?: ArenaTradeUncheckedUpdateManyWithoutSimulationNestedInput
    snapshots?: ArenaSnapshotUncheckedUpdateManyWithoutSimulationNestedInput
  }

  export type ArenaAgentUpsertWithoutParticipationsInput = {
    update: XOR<ArenaAgentUpdateWithoutParticipationsInput, ArenaAgentUncheckedUpdateWithoutParticipationsInput>
    create: XOR<ArenaAgentCreateWithoutParticipationsInput, ArenaAgentUncheckedCreateWithoutParticipationsInput>
    where?: ArenaAgentWhereInput
  }

  export type ArenaAgentUpdateToOneWithWhereWithoutParticipationsInput = {
    where?: ArenaAgentWhereInput
    data: XOR<ArenaAgentUpdateWithoutParticipationsInput, ArenaAgentUncheckedUpdateWithoutParticipationsInput>
  }

  export type ArenaAgentUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    strategy?: NullableStringFieldUpdateOperationsInput | string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaAgentUncheckedUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    strategy?: NullableStringFieldUpdateOperationsInput | string | null
    config?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaTradeUpsertWithWhereUniqueWithoutParticipationInput = {
    where: ArenaTradeWhereUniqueInput
    update: XOR<ArenaTradeUpdateWithoutParticipationInput, ArenaTradeUncheckedUpdateWithoutParticipationInput>
    create: XOR<ArenaTradeCreateWithoutParticipationInput, ArenaTradeUncheckedCreateWithoutParticipationInput>
  }

  export type ArenaTradeUpdateWithWhereUniqueWithoutParticipationInput = {
    where: ArenaTradeWhereUniqueInput
    data: XOR<ArenaTradeUpdateWithoutParticipationInput, ArenaTradeUncheckedUpdateWithoutParticipationInput>
  }

  export type ArenaTradeUpdateManyWithWhereWithoutParticipationInput = {
    where: ArenaTradeScalarWhereInput
    data: XOR<ArenaTradeUpdateManyMutationInput, ArenaTradeUncheckedUpdateManyWithoutParticipationInput>
  }

  export type ArenaSimulationCreateWithoutTradesInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    participants?: ArenaParticipationCreateNestedManyWithoutSimulationInput
    snapshots?: ArenaSnapshotCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationUncheckedCreateWithoutTradesInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    participants?: ArenaParticipationUncheckedCreateNestedManyWithoutSimulationInput
    snapshots?: ArenaSnapshotUncheckedCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationCreateOrConnectWithoutTradesInput = {
    where: ArenaSimulationWhereUniqueInput
    create: XOR<ArenaSimulationCreateWithoutTradesInput, ArenaSimulationUncheckedCreateWithoutTradesInput>
  }

  export type ArenaParticipationCreateWithoutTradesInput = {
    id?: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
    simulation: ArenaSimulationCreateNestedOneWithoutParticipantsInput
    agent: ArenaAgentCreateNestedOneWithoutParticipationsInput
  }

  export type ArenaParticipationUncheckedCreateWithoutTradesInput = {
    id?: string
    simulationId: string
    agentId: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
  }

  export type ArenaParticipationCreateOrConnectWithoutTradesInput = {
    where: ArenaParticipationWhereUniqueInput
    create: XOR<ArenaParticipationCreateWithoutTradesInput, ArenaParticipationUncheckedCreateWithoutTradesInput>
  }

  export type ArenaSimulationUpsertWithoutTradesInput = {
    update: XOR<ArenaSimulationUpdateWithoutTradesInput, ArenaSimulationUncheckedUpdateWithoutTradesInput>
    create: XOR<ArenaSimulationCreateWithoutTradesInput, ArenaSimulationUncheckedCreateWithoutTradesInput>
    where?: ArenaSimulationWhereInput
  }

  export type ArenaSimulationUpdateToOneWithWhereWithoutTradesInput = {
    where?: ArenaSimulationWhereInput
    data: XOR<ArenaSimulationUpdateWithoutTradesInput, ArenaSimulationUncheckedUpdateWithoutTradesInput>
  }

  export type ArenaSimulationUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ArenaParticipationUpdateManyWithoutSimulationNestedInput
    snapshots?: ArenaSnapshotUpdateManyWithoutSimulationNestedInput
  }

  export type ArenaSimulationUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ArenaParticipationUncheckedUpdateManyWithoutSimulationNestedInput
    snapshots?: ArenaSnapshotUncheckedUpdateManyWithoutSimulationNestedInput
  }

  export type ArenaParticipationUpsertWithoutTradesInput = {
    update: XOR<ArenaParticipationUpdateWithoutTradesInput, ArenaParticipationUncheckedUpdateWithoutTradesInput>
    create: XOR<ArenaParticipationCreateWithoutTradesInput, ArenaParticipationUncheckedCreateWithoutTradesInput>
    where?: ArenaParticipationWhereInput
  }

  export type ArenaParticipationUpdateToOneWithWhereWithoutTradesInput = {
    where?: ArenaParticipationWhereInput
    data: XOR<ArenaParticipationUpdateWithoutTradesInput, ArenaParticipationUncheckedUpdateWithoutTradesInput>
  }

  export type ArenaParticipationUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    simulation?: ArenaSimulationUpdateOneRequiredWithoutParticipantsNestedInput
    agent?: ArenaAgentUpdateOneRequiredWithoutParticipationsNestedInput
  }

  export type ArenaParticipationUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ArenaSimulationCreateWithoutSnapshotsInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    participants?: ArenaParticipationCreateNestedManyWithoutSimulationInput
    trades?: ArenaTradeCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationUncheckedCreateWithoutSnapshotsInput = {
    id?: string
    name: string
    status?: string
    market: string
    marketType: string
    interval?: string
    startDate: Date | string
    endDate: Date | string
    initialBalance?: number
    tickIntervalMs?: number
    priceImpact?: number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    startedAt?: Date | string | null
    pausedAt?: Date | string | null
    completedAt?: Date | string | null
    errorMessage?: string | null
    participants?: ArenaParticipationUncheckedCreateNestedManyWithoutSimulationInput
    trades?: ArenaTradeUncheckedCreateNestedManyWithoutSimulationInput
  }

  export type ArenaSimulationCreateOrConnectWithoutSnapshotsInput = {
    where: ArenaSimulationWhereUniqueInput
    create: XOR<ArenaSimulationCreateWithoutSnapshotsInput, ArenaSimulationUncheckedCreateWithoutSnapshotsInput>
  }

  export type ArenaSimulationUpsertWithoutSnapshotsInput = {
    update: XOR<ArenaSimulationUpdateWithoutSnapshotsInput, ArenaSimulationUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<ArenaSimulationCreateWithoutSnapshotsInput, ArenaSimulationUncheckedCreateWithoutSnapshotsInput>
    where?: ArenaSimulationWhereInput
  }

  export type ArenaSimulationUpdateToOneWithWhereWithoutSnapshotsInput = {
    where?: ArenaSimulationWhereInput
    data: XOR<ArenaSimulationUpdateWithoutSnapshotsInput, ArenaSimulationUncheckedUpdateWithoutSnapshotsInput>
  }

  export type ArenaSimulationUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ArenaParticipationUpdateManyWithoutSimulationNestedInput
    trades?: ArenaTradeUpdateManyWithoutSimulationNestedInput
  }

  export type ArenaSimulationUncheckedUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    marketType?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    initialBalance?: FloatFieldUpdateOperationsInput | number
    tickIntervalMs?: IntFieldUpdateOperationsInput | number
    priceImpact?: FloatFieldUpdateOperationsInput | number
    config?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ArenaParticipationUncheckedUpdateManyWithoutSimulationNestedInput
    trades?: ArenaTradeUncheckedUpdateManyWithoutSimulationNestedInput
  }

  export type SessionCreateManyUserInput = {
    id: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArenaParticipationCreateManyAgentInput = {
    id?: string
    simulationId: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
  }

  export type ArenaParticipationUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    simulation?: ArenaSimulationUpdateOneRequiredWithoutParticipantsNestedInput
    trades?: ArenaTradeUpdateManyWithoutParticipationNestedInput
  }

  export type ArenaParticipationUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    trades?: ArenaTradeUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ArenaParticipationUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ArenaParticipationCreateManySimulationInput = {
    id?: string
    agentId: string
    finalBalance?: number | null
    pnl?: number | null
    pnlPercent?: number | null
    sharpeRatio?: number | null
    winRate?: number | null
    totalTrades?: number
    rank?: number | null
  }

  export type ArenaTradeCreateManySimulationInput = {
    id?: string
    participationId: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
  }

  export type ArenaSnapshotCreateManySimulationInput = {
    id?: string
    timestamp: Date | string
    tick: number
    price: number
    data: JsonNullValueInput | InputJsonValue
  }

  export type ArenaParticipationUpdateWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    agent?: ArenaAgentUpdateOneRequiredWithoutParticipationsNestedInput
    trades?: ArenaTradeUpdateManyWithoutParticipationNestedInput
  }

  export type ArenaParticipationUncheckedUpdateWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    trades?: ArenaTradeUncheckedUpdateManyWithoutParticipationNestedInput
  }

  export type ArenaParticipationUncheckedUpdateManyWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    finalBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    pnl?: NullableFloatFieldUpdateOperationsInput | number | null
    pnlPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    sharpeRatio?: NullableFloatFieldUpdateOperationsInput | number | null
    winRate?: NullableFloatFieldUpdateOperationsInput | number | null
    totalTrades?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ArenaTradeUpdateWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    participation?: ArenaParticipationUpdateOneRequiredWithoutTradesNestedInput
  }

  export type ArenaTradeUncheckedUpdateWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    participationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaTradeUncheckedUpdateManyWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    participationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaSnapshotUpdateWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    tick?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotUncheckedUpdateWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    tick?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
  }

  export type ArenaSnapshotUncheckedUpdateManyWithoutSimulationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    tick?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    data?: JsonNullValueInput | InputJsonValue
  }

  export type ArenaTradeCreateManyParticipationInput = {
    id?: string
    simulationId: string
    timestamp: Date | string
    action: string
    asset: string
    quantity: number
    price: number
    total: number
    reasoning?: string | null
  }

  export type ArenaTradeUpdateWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
    simulation?: ArenaSimulationUpdateOneRequiredWithoutTradesNestedInput
  }

  export type ArenaTradeUncheckedUpdateWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArenaTradeUncheckedUpdateManyWithoutParticipationInput = {
    id?: StringFieldUpdateOperationsInput | string
    simulationId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    reasoning?: NullableStringFieldUpdateOperationsInput | string | null
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