export const zeroTime = (n: number) => {
  return n < 10
    ? `0${n}`
    : n;
}