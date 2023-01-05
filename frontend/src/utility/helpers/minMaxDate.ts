/**
 * Returns number of milliseconds (Date.getTime()) at start and 
 * end of a day, from a given date object.
 * 
 * 
 * @param d Date object (will not mutate)
 */
export const minMaxDate = (d: Date): [number, number] => {
  return [
    (() => {
      const min = new Date(d);
      min.setHours(0);
      min.setMinutes(0);
      min.setSeconds(0);
      min.setMilliseconds(0);

      return min.getTime();
    })(),
    (() => {
      const max = new Date(d);
      max.setHours(23);
      max.setMinutes(59);
      max.setSeconds(59);
      max.setMilliseconds(999);

      return max.getTime();
    })(),
  ]
}