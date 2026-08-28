export type SuccessResponse<D> = {
  data: D;
};

export type ErrorResponse<P = never> = {
  error: string;
  payload?: P;
};
