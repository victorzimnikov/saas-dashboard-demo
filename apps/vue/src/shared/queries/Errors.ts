export class BaseError extends Error {
  public data: Record<string, unknown> = {};
  public errorType: "ValidationError" | "NetworkError" | "unknown" = "NetworkError";
}

export class QueryError extends BaseError {
  public readonly type = "query";
}
