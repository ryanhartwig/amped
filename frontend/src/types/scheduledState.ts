import { RoutineType } from "./RoutineType";

export interface Scheduled {
  monday: RoutineType[];
  tuesday: RoutineType[];
  wednesday: RoutineType[];
  thursday: RoutineType[];
  friday: RoutineType[];
  saturday: RoutineType[];
  sunday: RoutineType[];
}

export const scheduled = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
}