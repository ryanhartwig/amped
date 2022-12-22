import './Search.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Tags } from '../../store/slices/themeSlice';
import { useAppSelector } from '../../utility/hooks';
import { Tag } from '../ui/Tag';

import { SearchResults } from './SearchResults';
import { Routine } from '../Routine';
import { Exercise } from '../Exercise';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { ExerciseType } from '../../types/ExerciseType';
import { PrimaryButton } from '../ui/PrimaryButton';
import { useLocation } from 'react-router-dom';
import { RoutineType } from '../../types/RoutineType';

interface SearchProps {
  tab: 'Routines' | 'Exercises',
  onSaveSelect?: (exercises: ExerciseType[]) => any,
  setSelected?: React.Dispatch<React.SetStateAction<RoutineType | ExerciseType | undefined>>,
  selected?: RoutineType | ExerciseType,
}

export const Search = ({tab, onSaveSelect, setSelected, selected}: SearchProps) => {
  const { background_alt: background, tags } = useAppSelector(s => s.theme);
  const location = useLocation();
  
  const [query, setQuery] = useState<string>(location.state?.name || '');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [userTags, setUserTags] = useState<Set<string>>(new Set());
  const [appTags] = useState<Set<string>>(new Set(['strength', 'hypertrophy', 'power', 'speed', 'endurance', 'other']));

  const routines = [...useAppSelector(s => s.workouts.routines)].sort(r => r.favourited ? -1 : 1);
  const exercises = [...useAppSelector(s => s.workouts.exercises)].sort(e => e.favourited ? -1 : 1);

  const display = (tab === 'Routines' && userTags.size) || (tab === 'Exercises' && appTags.size) ? '' : 'none';
  
  const [addExercises, setAddExercises] = useState<ExerciseType[]>([]);

  const onSelect = useCallback((e: ExerciseType) => {
    const index = addExercises.findIndex(s => s.id === e.id);

    setAddExercises(p => {
      return (index === -1) 
        ? [...p, e]
        : [...p.slice(0, index), ...p.slice(index + 1)];
    })
  }, [addExercises]);
  
  const onToggleTag = useCallback((t: string) => {
    const newSet = new Set(activeTags);
    activeTags.has(t) 
      ? newSet.delete(t)
      : newSet.add(t);
    setActiveTags(newSet);
  }, [activeTags]);

  // Prevent resetting on initial render
  const tabRef = useRef<string>(tab);
  
  /* Reset when changing tabs */
  useEffect(() => {
    if (tabRef.current === tab) return;
    tabRef.current = tab;
    setQuery('');
    setActiveTags(new Set());
    setSelected && setSelected(undefined);
  }, [setSelected, tab]);

  return (
    <div className='Search'>
      {/* Search bar icon */}
      <div className='Search-icon'>
        <AiOutlineSearch size={21} />
      </div>
      {/* Search bar */}
      <input className='Search-bar' 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        style={{background}}
        placeholder={`Search ${tab.toLowerCase()}`}
      />
      {/* Clear search bar */}
      <div className='Search-clear' onClick={() => setQuery('')} style={{display: query.length ? '' : 'none'}}>
        <IoCloseOutline size={21} />
      </div>

      {/* Tag filters */}
      <div className='Search-tags noselect hidescrollbar' style={{display}}>
        {Array.from(tab === 'Routines' ? userTags : appTags).map(t => <Tag key={t} onClick={() => onToggleTag(t)} text={t} toggle={activeTags.has(t) ? 'remove' : 'add'} color={tags[t as keyof Tags]} />)}
      </div>

      {/* Results */}
      <SearchResults>
        {tab === 'Routines' 
          ? routines.map(r => 
            <Routine query={query} 
              activeTags={activeTags} 
              setUserTags={setUserTags} 
              key={r.id} 
              routine={r} 
              setSelected={setSelected}
              selected={selected}
            /> )
          : exercises.map(e => 
            <Exercise key={e.id} 
              exercise={e} 
              query={query} 
              activeTags={activeTags} 
              onSelect={onSaveSelect ? () => onSelect(e) : undefined} 
              setSelected={setSelected}
              selected={selected}
              selectedPosition={onSaveSelect 
                ? (() => {
                    const index = addExercises.findIndex(s => s.id === e.id);
                    return index === -1 
                      ? undefined
                      : index + 1
                  })() 
                : undefined} 
            />
          )
        }
      </SearchResults>

      {onSaveSelect && 
        <div className='Search-save-selection' onClick={() => onSaveSelect(addExercises)}>
          <PrimaryButton text='Save' />
        </div>
      }
    </div>
  )
}