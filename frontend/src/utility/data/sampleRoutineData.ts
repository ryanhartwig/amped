import { RoutineDataType } from "../../types/RoutineDataType";

export const sampleRoutineData: RoutineDataType[] = [
  {
    duration: 1,
    id: '80608a1b-1729-7d21-a1ca-24f858fd6106',
    routine_id: 'Shoulders',
    start_date: 1672666568301,
    exerciseData: [
      {
        duration: 0,
        exercise_id: 'bicepcurl',
        exercise_position: 0,
        exercise_name: 'Bicep Curl',
        id: '5559dcdc-91f9-964f-d8b5-648631ce2681',
        routine_data_id: 'Shoulders',
        sets: []
      },
      {
        duration: 0,
        exercise_id: 'hammercurl',
        exercise_position: 1,
        exercise_name: 'Hammer Curl',
        id: '504b5522-2cba-405f-166a-6d8d073f1837',
        routine_data_id: 'Shoulders',
        sets: []
      }
    ],
    notes: ''
  },
  {
    duration: 1,
    id: '63fea63a-25d4-0df6-a2ed-5becfd538ac1',
    routine_id: 'biceps',
    start_date: 1672752968301,
    exerciseData: [
      {
        duration: 0,
        exercise_id: 'bicepcurl',
        exercise_position: 0,
        exercise_name: 'Bicep Curl',
        id: '35b85bed-2196-9e3d-de32-7e80d7d6e9d7',
        routine_data_id: 'biceps',
        sets: []
      },
      {
        duration: 0,
        exercise_id: 'hammercurl',
        exercise_position: 1,
        exercise_name: 'Hammer Curl',
        id: '2032cde3-958b-5b71-3ea1-8a87c9d742fc',
        routine_data_id: 'biceps',
        sets: []
      }
    ],
    notes: ''
  },
  {
    duration: 2,
    id: 'a883a41b-bf69-4e98-0ab4-5aa5906030ee',
    routine_id: 'Back',
    start_date: 1672839368301,
    exerciseData: [
      {
        duration: 0,
        exercise_id: 'bicepcurl',
        exercise_position: 0,
        exercise_name: 'Bicep Curl',
        id: '264b30b7-7558-5317-dc85-02cae877f04c',
        routine_data_id: 'Back',
        sets: []
      },
      {
        duration: 2,
        exercise_id: 'hammercurl',
        exercise_position: 1,
        exercise_name: 'Hammer Curl',
        id: '414bfc6d-9b92-935d-837e-c691c7f6c16c',
        routine_data_id: 'Back',
        sets: [
          {
            id: 'b1e3d1d0-93c0-ae15-6675-d26026e7bf5a',
            count: 5,
            duration: 1,
            exercise_data_id: '414bfc6d-9b92-935d-837e-c691c7f6c16c',
            modifiers: [],
            weight: 90,
            position: 0
          },
          {
            id: 'db0c224d-eeee-bcd2-7714-d19211137dac',
            count: 5,
            duration: 0,
            exercise_data_id: '414bfc6d-9b92-935d-837e-c691c7f6c16c',
            modifiers: [],
            weight: 90,
            position: 1
          },
          {
            id: 'd2cad215-9819-d5d6-5be1-5341e7b4472c',
            count: 5,
            duration: 0,
            exercise_data_id: '414bfc6d-9b92-935d-837e-c691c7f6c16c',
            modifiers: [],
            weight: 90,
            position: 2
          },
          {
            id: 'b09835a3-f5ec-983c-24a5-cf7d517f70c8',
            count: 5,
            duration: 0,
            exercise_data_id: '414bfc6d-9b92-935d-837e-c691c7f6c16c',
            modifiers: [],
            weight: 90,
            position: 3
          }
        ]
      }
    ],
    notes: ''
  },
  {
    duration: 2,
    id: '6c949119-d9b3-f64d-8422-2daceab7b260',
    routine_id: 'Back',
    start_date: 1672926290388,
    exerciseData: [
      {
        duration: 1,
        exercise_id: 'bicepcurl',
        exercise_position: 0,
        exercise_name: 'Bicep Curl',
        id: 'aab4e839-299f-f38f-1c92-4030b1171a48',
        routine_data_id: 'Back',
        sets: []
      },
      {
        duration: 0,
        exercise_id: 'hammercurl',
        exercise_position: 1,
        exercise_name: 'Hammer Curl',
        id: '5dd7f500-d8e4-5d77-a4e5-f34b5520211c',
        routine_data_id: 'Back',
        sets: []
      }
    ],
    notes: ''
  }
]