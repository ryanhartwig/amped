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
  monday: getRandomData(),
  tuesday: getRandomData(),
  wednesday: getRandomData(),
  thursday: getRandomData(),
  friday: getRandomData(),
  saturday: getRandomData(),
  sunday: getRandomData(),
}


function getRandomData() {
  return Array(Math.floor(Math.random() * 6))
    .fill(true)
    .map(() => ({
      routine: sampleRoutines[Math.floor(Math.random() * sampleRoutines.length)],
      completed: !!Math.round(Math.random()),
    }));
}