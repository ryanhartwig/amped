import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ExerciseDataType } from '../../types/ExerciseDataType';
import { getDuration } from '../../utility/helpers/getDuration';
import { useAppSelector } from '../../utility/helpers/hooks';
import { InfoBorder } from '../ui/InfoBorder';
import { Modal } from '../ui/Modal';
import { SecondaryButton } from '../ui/SecondaryButton';
import './WorkoutSummary.css';

interface SessionData {
  selectedRoutineId: string,
  session_duration: number,
  session_id: string,
  sessionStartDate: number,
  exerciseData: ExerciseDataType[],
}

interface WorkoutSummaryProps {
  sessionData: SessionData,
  setRef: React.Dispatch<React.SetStateAction<MutableRefObject<HTMLDivElement>>>,
}

export const WorkoutSummary = ({sessionData: d, setRef}: WorkoutSummaryProps) => {

  const { background_alt, background } = useAppSelector(s => s.theme);

  const buttonRef = useRef<HTMLDivElement>(undefined!);

  useEffect(() => {
    setRef(buttonRef)
  }, [setRef]);

  const [rating, setRating] = useState<number>();
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    console.log(notesOpen);
  }, [notesOpen])

  return (
    <div className='WorkoutSummary'>
      <div className='WorkoutSummary-stat'>
        <h2>{getDuration(d.session_duration)}</h2>
        <p>Total Duration</p>
      </div>
      <div className='WorkoutSummary-stat' style={{opacity: 0.4, cursor: 'not-allowed'}}>
        <h2>+0%</h2>
        <p>Relative Performance (coming soon)</p>
      </div>
      <div className='WorkoutSummary-exerciselist' style={{background: background_alt}}>
      </div>
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
    </div>
  )
}