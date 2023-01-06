/**
 * Adds a zero before numbers < 10, returned as string 
 * @param n number to add zero to or return if >= 10
 * @returns input as string prefixed with 0 if < 10 or input if >= 10
 */
export const zeroTime = (n: number) => {
  return n < 10
    ? `0${n}`
    : n;
}