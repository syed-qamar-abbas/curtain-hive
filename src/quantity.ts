export const validQuantity = (value: number) => Number.isInteger(value) && value >= 1 && value <= 99;
export const normaliseQuantity = (value: number) => Math.max(1, Math.min(99, Math.trunc(Number(value) || 1)));
