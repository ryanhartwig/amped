import { useEffect, useMemo, useState } from 'react';
import { ExerciseDataType } from '../../types/ExerciseDataType';
import { RoutineDataType } from '../../types/RoutineDataType';
import { getDuration } from '../../utility/helpers/getDuration';
import { useAppSelector } from '../../utility/helpers/hooks';
import { InfoBorder } from '../ui/InfoBorder';
import { Modal } from '../ui/Modal';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';
import { ExerciseStats } from './ExerciseStats';
import './WorkoutSummary.css';

interface SessionData {
  selectedRoutineId: string,
  session_duration: number,
  session_id: string,
  routine_id: string,
  sessionStartDate: number,
  exerciseData: ExerciseDataType[],
}

interface WorkoutSummaryProps {
  sessionData: SessionData,
}

export const WorkoutSummary = ({sessionData: d}: WorkoutSummaryProps) => {

  const { background_alt, background } = useAppSelector(s => s.theme);

  const [rating, setRating] = useState<number>();
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  const sessionData: RoutineDataType = useMemo(() => ({
    duration: d.session_duration,
    id: d.session_id,
    routine_id: d.routine_id,
    start_date: d.sessionStartDate,
    energy: rating,
    post_notes: notes,
  }), [d.routine_id, d.sessionStartDate, d.session_duration, d.session_id, notes, rating]);

  useEffect(() => {
    console.log(notesOpen);
  }, [notesOpen])

  return (
    <div className='WorkoutSummary'>
      {/* Duration / Performance stats */}
      <div className='WorkoutSummary-stat'>
        <h2>{getDuration(d.session_duration)}</h2>
        <p>Total Duration</p>
      </div>
      <div className='WorkoutSummary-stat' style={{opacity: 0.4, cursor: 'not-allowed'}}>
        <h2>+0%</h2>
        <p>Relative Performance (coming soon)</p>
      </div>

      {/* Exercise data & sets dropdowns */}
      <div className='WorkoutSummary-exerciselist hidescrollbar' style={{background: background_alt}}>
        {d.exerciseData.map(data => 
          <ExerciseStats exerciseData={data} key={data.id} />
        )}
      </div>

      {/* 1-10 Rating */}
      <div className='WorkoutSummary-user-rating'>
        <InfoBorder background={background} title={'Rate this Workout'} >
          <div className='WorkoutSummary-ratings'>
            {Array(10).fill(true).map((x, i) => 
              <div className='WorkoutSummary-rating' 
                key={i}
                style={{background: rating === i + 1 ? background_alt : ''}}
                onClick={() => setRating(i + 1)}
              >
                <p>{i + 1}</p>
              </div>)}
          </div>
        </InfoBorder>
      </div>

      {/* Post-workout Notes */}
      <SecondaryButton 
        text={'View/edit post-workout notes'} 
        onClick={() => setNotesOpen(true)}
        style={{
          height: 35,
          minWidth: 250,
          width: '80%',
          margin: '6px 0',
          justifyContent: 'center',
        }} 
      />

      {/* Notes modal */}
      <Modal open={notesOpen} onClose={() => setNotesOpen(false)}>
        <Modal.Header>Add Notes</Modal.Header>
        <div className='WorkoutSummary-notes'>
            <textarea value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder='Notes / reflections' 
              className='WorkoutSummary-notes-text' 
              style={{background: background_alt}}
            />
        </div>
      </Modal>

      <PrimaryButton text='Save' style={{flexShrink: 0, flexGrow: 0, marginTop: 15, height: 48}} />
    </div>
  )
}