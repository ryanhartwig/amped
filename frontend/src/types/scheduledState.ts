import { sampleRoutines } from "../utility/data/sampleRoutines";
import { RoutineType } from "./RoutineType";

interface ScheduledRoutine {
  routine: RoutineType,
  completed: boolean,
}

export interface ScheduledState {
  monday: ScheduledRoutine[];
  tuesday: ScheduledRoutine[];
  wednesday: ScheduledRoutine[];
  thursday: ScheduledRoutine[];
  friday: ScheduledRoutine[];
  saturday: ScheduledRoutine[];
  sunday: ScheduledRoutine[];
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
  const routines:ScheduledRoutine[] = [];
  ids.forEach(id => routines.push({
    routine: sampleRoutines.find(r => r.id === id)!,
    completed: !!Math.round(Math.random())
  }));

  return routines;
}