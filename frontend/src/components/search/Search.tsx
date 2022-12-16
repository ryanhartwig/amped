import './Search.css';

import { useCallback, useState } from 'react';
import { Tags } from '../../store/slices/themeSlice';
import { useAppSelector } from '../../utility/hooks';
import { Tag } from '../ui/Tag';

import { SearchResults } from './SearchResults';
import { sampleExercises } from '../../utility/data/sampleExercises';
import { sampleRoutines } from '../../utility/data/sampleRoutines';
import { ExerciseType } from '../../types/ExerciseType';
import { RoutineType } from '../../types/RoutineType';
import { Routine } from '../Routine';
import { Exercise } from '../Exercise';


// const sampleTags = ['strength', 'hypertrophy', 'power', 'speed', 'metabolic'];

interface SearchProps {
  tab: 'Routines' | 'Exercises',
}

export const Search = ({tab}: SearchProps) => {

  const { background_alt: background, tags } = useAppSelector(s => s.theme);
  
  const [query, setQuery] = useState<string>('');
  const [activeTags, setActiveTagss] = useState<Set<string>>(new Set());
  const [userTags, setUserTags] = useState<Set<string>>(new Set());
  
  const [routines] = useState<RoutineType[]>(sampleRoutines.sort((a, b) => a.favourited ? -1 : 1));
  const [exercises] = useState<ExerciseType[]>(sampleExercises);
  
  const onToggleTag = useCallback((t: string) => {
    const newSet = new Set(activeTags);
    activeTags.has(t) 
      ? newSet.delete(t)
      : newSet.add(t);
    setActiveTagss(newSet);
  }, [activeTags]);



  return (
    <div className='Search'>
      {/* Search bar */}
      <input className='Search-bar' 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        style={{background}}
        autoFocus
        placeholder={`Search ${tab.toLowerCase()}`}
      />

      {/* Tag filters */}
      {!!userTags.size && <div className='Search-tags noselect hidescrollbar'>
        {Array.from(userTags).map(t => <Tag key={t} onClick={() => onToggleTag(t)} text={t} toggle={activeTags.has(t) ? 'remove' : 'add'} color={tags[t as keyof Tags]} />)}
      </div>}

      {/* Results */}
      <SearchResults>
        {tab === 'Routines' 
          ? routines.map(r => <Routine query={query} activeTags={activeTags} setUserTags={setUserTags} key={r.id} routine={r} />)
          : exercises.map(e => <Exercise key={e.id} exercise={e} />)}
      </SearchResults>
    </div>
  )
}