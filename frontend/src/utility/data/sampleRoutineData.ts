import { RoutineDataType } from "../../types/RoutineDataType";

export const sampleRoutineData: RoutineDataType[] = [
  {
    duration: 2743,
    id: 'ct1',
    routine_id: 'chesttriceps',
    start_date: Date.now(),
    post_notes: 'Did great',
    energy: 8,
  }, {
    duration: 2118,
    id: 'b1',
    routine_id: 'biceps',
    start_date: (Date.now() - 1000000000),
    post_notes: 'Flex more',
    energy: 7,
  }
]

