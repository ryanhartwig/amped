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
  setEdit?: React.Dispatch<React.SetStateAction<RoutineType | ExerciseType | undefined>>,
  edit?: RoutineType | ExerciseType,
}

export const Search = ({tab, onSaveSelect, setEdit, edit}: SearchProps) => {
  const { background_alt: background, tags } = useAppSelector(s => s.theme);
  const location = useLocation();
  
  const [query, setQuery] = useState<string>(location.state?.name || '');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [userTags, setUserTags] = useState<Set<string>>(new Set());
  const [appTags] = useState<Set<string>>(new Set(['strength', 'hypertrophy', 'power', 'speed', 'endurance', 'other']));

  const routines = [...useAppSelector(s => s.workouts.routines)].sort(r => r.favourited ? -1 : 1);
  const exercises = [...useAppSelector(s => s.workouts.exercises)].sort(e => e.favourited ? -1 : 1);

  const display = (tab === 'Routines' && userTags.size) || (tab === 'Exercises' && appTags.size) ? '' : 'none';
  
  const [selected, setSelected] = useState<ExerciseType[]>([]);

  const onSelect = useCallback((e: ExerciseType) => {
    const index = selected.findIndex(s => s.id === e.id);

    setSelected(p => {
      return (index === -1) 
        ? [...p, e]
        : [...p.slice(0, index), ...p.slice(index + 1)];
    })
  }, [selected]);
  
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
    setEdit && setEdit(undefined);
  }, [setEdit, tab]);

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
              setEdit={setEdit}
              edit={edit}
            /> )
          : exercises.map(e => 
            <Exercise key={e.id} 
              exercise={e} 
              query={query} 
              activeTags={activeTags} 
              onSelect={onSaveSelect ? () => onSelect(e) : undefined} 
              setEdit={setEdit}
              edit={edit}
              selectedPosition={onSaveSelect 
                ? (() => {
                    const index = selected.findIndex(s => s.id === e.id);
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
        <div className='Search-save-selection' onClick={() => onSaveSelect(selected)}>
          <PrimaryButton text='Save' />
        </div>
      }
    </div>
  )
}