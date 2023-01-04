import { sampleRoutines } from "../utility/data/sampleRoutines";
import { RoutineType } from "./RoutineType";

export interface ScheduledState {
  monday: RoutineType[];
  tuesday: RoutineType[];
  wednesday: RoutineType[];
  thursday: RoutineType[];
  friday: RoutineType[];
  saturday: RoutineType[];
  sunday: RoutineType[];
}

export const scheduled: ScheduledState = {
  monday: getDailyRoutines(),
  tuesday: getDailyRoutines(),
  wednesday: getDailyRoutines(),
  thursday: getDailyRoutines(),
  friday: getDailyRoutines(),
  saturday: getDailyRoutines(),
  sunday: getDailyRoutines(),
}

function getDailyRoutines() {
  const ids = new Set<string>(
    Array(Math.floor(Math.random() * 6))
      .fill(true)
      .map(() => sampleRoutines[Math.floor(Math.random() * sampleRoutines.length)].id)
  );

  return Array.from(ids).map(id => sampleRoutines.find(r => r.id === id)!);
}