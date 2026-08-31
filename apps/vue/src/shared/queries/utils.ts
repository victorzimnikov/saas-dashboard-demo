import type { Pagination } from "./types/common.schema";
import { create } from "axios";
import type { AxiosInstance } from "axios";

export const rawClient: AxiosInstance = create({
  withCredentials: true,
});

export const getNextPageParam = <PAGE_PARAM = number>(
  pagination: Pagination | undefined,
  lastPageParam: PAGE_PARAM,
): PAGE_PARAM | undefined | null => {
  const skip = pagination?.skip ?? 0;
  const size = pagination?.size ?? 0;
  const total = pagination?.total ?? 0;

  if (skip + size < total && typeof lastPageParam === "number") {
    return (lastPageParam + 1) as PAGE_PARAM;
  }

  return null;
};
