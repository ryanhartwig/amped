import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { SetFieldType } from '../../types/SetFieldType';
import { FormatTime } from '../ui/FormatTime';
import { Modal } from '../ui/Modal';
import { Tag } from '../ui/Tag';
import { EditSet } from './EditSet';
import './SetField.css';

interface SetFieldProps {
  set: SetFieldType,
  sets: SetFieldType[],
  setSets?: React.Dispatch<React.SetStateAction<SetFieldType[]>>,
}

export const SetField = ({set, sets, setSets = undefined}: SetFieldProps) => {

  const [edit, setEdit] = useState<boolean>(false);
  
  const setType = set.modifiers.includes('Drop Set')
    ? 'Drop Set'
    : set.modifiers.includes('Warmup')
      ? 'Warmup'
  : '';
  const failure = set.modifiers.includes('Hit Failure');

  const color = 
    setType === 'Drop Set'
      ? '#375c7d'
      : setType === 'Warmup'
        ? '#725231'
  : '';

  const getText = (): string => {
    if (setType === 'Drop Set') return 'Drop Set';
    const [ warmupSets, normalSets ] = [
      sets.filter(s => s.modifiers.includes('Warmup')),
      sets.filter(s => s.modifiers.every(m => !['Warmup', 'Drop Set'].includes(m)))
    ];

    if (setType === 'Warmup') return `Warmup ${warmupSets.findIndex(s => s.id === set.id) + 1}`
    else return `Set ${normalSets.findIndex(s => s.id === set.id) + 1}`;
  }

  const getDuration = useMemo(() => {
    let duration = set.duration;

    // Dont trigger recursive function if the current set is a drop set
    if (setType === 'Drop Set') return duration;

    const findAddDropSetDuration = (index: number = set.position + 1) => {
      const current = sets[index];
      if (!current) return;
      else if (!current.modifiers.includes('Drop Set')) return;

      duration += current.duration;
      findAddDropSetDuration(current.position + 1);
    }

    findAddDropSetDuration();
    return duration;
  }, [set.duration, set.position, setType, sets]);

  return (
    <>
      <div className={clsx('SetField', {'edit': !!setSets})} onClick={!setSets ? undefined : () => setEdit(true)}>
        <div>
          <p style={{fontSize: 13, color}}>{getText()}</p>
          <BsDot style={{opacity: 0.2}} />
          <p style={{fontSize: 25}}>{set.weight}</p>
          <p style={{fontSize: 11, opacity: 0.4}}>lbs</p>
          <p style={{fontSize: 25, marginLeft: 8}}>{set.count}</p>
          <p style={{fontSize: 11, opacity: 0.4}}>reps</p>
        </div>
        <div>
          {failure && <Tag text='Hit Failure' fontSize='0.7em' hollow matchColorText color='#6e2b2b' style={{padding: '2px 6px'}} />}
          {setType !== 'Drop Set' && <FormatTime seconds={getDuration} style={{fontSize: '0.9em', opacity: 0.7}} />}
        </div>
      </div>
      <Modal open={edit} onClose={() => setEdit(false)} closeText="Cancel">
        <Modal.Header>Edit Set</Modal.Header>
        <EditSet set={set} sets={sets} setSets={setSets!} setEdit={setEdit} />
      </Modal>
    </>
  )
}