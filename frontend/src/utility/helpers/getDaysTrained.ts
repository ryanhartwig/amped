import { RoutineDataType } from "../../types/RoutineDataType";
import { minMaxDate } from "./minMaxDate";

export const getDaysTrained = (d: RoutineDataType[], firstDay: number | Date) => {
  let count = 0;

  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDay);
    day.setDate(day.getDate() + i);

    const [min, max] = minMaxDate(day);
    count += d.some(d => min <= d.start_date && max >= d.start_date)
      ? 1 : 0;
  }

  return count;
}