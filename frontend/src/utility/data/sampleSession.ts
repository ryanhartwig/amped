import { SessionState } from "../../store/slices/sessionSlice";

export const sampleSessionData: SessionState = {
  selectedRoutineId: 'Abs',
  session_id: '7b8a9b40-333e-1108-0567-048740fb50d6',
  routine_id: 'Abs',
  currentPosition: 1,
  sessionStartDate: 1672783106540,
  exerciseData: [
    {
      duration: 1250,
      exercise_id: 'bicepcurl',
      exercise_name: 'Bicep Curl',
      exercise_position: 0,
      id: '41c1f0a7-ddc4-3df0-ef03-905f543e4e85',
      performed_routine_id: 'Abs',
      sets: [
        {
          id: '103de953-d20c-0e18-6c60-16a454a00208', 
          count: 5,
          duration: 1,
          performed_exercise_id: '41c1f0a7-ddc4-3df0-ef03-905f543e4e85',
          modifiers: [],
          weight: 100,
          position: 0
        },
        {
          id: '42664e8c-99ad-0c9e-5b61-a7fdc8068dc1',
          count: 5,
          duration: 0,
          performed_exercise_id: '41c1f0a7-ddc4-3df0-ef03-905f543e4e85',
          modifiers: [],
          weight: 100,
          position: 1
        },
        {
          id: 'b0eecffd-c142-d14c-ba50-ebc2b42f2a27',
          count: 5,
          duration: 1,
          performed_exercise_id: '41c1f0a7-ddc4-3df0-ef03-905f543e4e85',
          modifiers: [
            'Hit Failure'
          ],
          weight: 100,
          position: 2
        }
      ]
    },
    {
      duration: 1200,
      exercise_id: 'hammercurl',
      exercise_name: 'Hammer Curl',
      exercise_position: 1,
      id: 'd11f395e-f65f-b509-de9f-00dba326094a',
      performed_routine_id: 'Abs',
      sets: [
        {
          id: '2f6e4719-7be6-5daf-19c5-b7b417bf1cbe',
          count: 5,
          duration: 2,
          performed_exercise_id: 'd11f395e-f65f-b509-de9f-00dba326094a',
          modifiers: [
            'Hit Failure'
          ],
          weight: 100,
          position: 0
        },
        {
          id: '1bd77cd7-f060-4365-3d0a-3f25a48bab65',
          count: 5,
          duration: 0,
          performed_exercise_id: 'd11f395e-f65f-b509-de9f-00dba326094a',
          modifiers: [
            'Hit Failure'
          ],
          weight: 100,
          position: 1
        },
        {
          id: '658ef0bf-c74c-1d4a-9f0d-54320b513ab7',
          count: 5,
          duration: 0,
          performed_exercise_id: 'd11f395e-f65f-b509-de9f-00dba326094a',
          modifiers: [
            'Hit Failure'
          ],
          weight: 100,
          position: 2
        },
        {
          id: 'f1d7428f-3f81-1233-5d02-ab87e48d04d6',
          count: 5,
          duration: 0,
          performed_exercise_id: 'd11f395e-f65f-b509-de9f-00dba326094a',
          modifiers: [
            'Hit Failure'
          ],
          weight: 100,
          position: 3
        },
        {
          id: '9c77b436-ac3a-2e73-8e15-43620fef2b95',
          count: 5,
          duration: 0,
          performed_exercise_id: 'd11f395e-f65f-b509-de9f-00dba326094a',
          modifiers: [
            'Hit Failure'
          ],
          weight: 100,
          position: 4
        },
        {
          id: '56406476-76bc-1228-7c95-4f8ef0410f58',
          count: 5,
          duration: 0,
          performed_exercise_id: 'd11f395e-f65f-b509-de9f-00dba326094a',
          modifiers: [
            'Hit Failure'
          ],
          weight: 100,
          position: 5
        }
      ]
    }
  ],
}