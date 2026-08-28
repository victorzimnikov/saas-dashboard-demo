import type { LocationQueryValue } from "vue-router";

type RawQueryValue = LocationQueryValue | LocationQueryValue[] | undefined;

export const firstQueryParam = (value: RawQueryValue): string | undefined => {
  const item = Array.isArray(value) ? value[0] : value;

  return item ?? undefined;
};

export const allQueryParams = (value: RawQueryValue): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return typeof value === "string" ? [value] : [];
};
