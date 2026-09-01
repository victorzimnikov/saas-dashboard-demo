type ValueType = string | number | boolean | null | undefined;

export const toNotNaNNumberOr = <T>(value: ValueType, replacer: T): number | T => {
  const numericValue = Number(value);

  return isNaN(numericValue) ? replacer : numericValue;
};

export const toNotNaNNumberOrZero = (value: ValueType): number => toNotNaNNumberOr(value, 0);
