import { useCallback, useState } from 'react';
import { Tags } from '../../store/slices/themeSlice';
import { useAppSelector } from '../../utility/hooks';
import { Tag } from '../ui/Tag';
import './Search.css';

import { SearchResults } from './SearchResults';


const sampleTags = ['strength', 'hypertrophy', 'power', 'speed', 'metabolic'];

interface SearchProps {
  tab: 'Routines' | 'Exercises',
}

export const Search = ({tab}: SearchProps) => {

  const { background_alt: background, tags } = useAppSelector(s => s.theme);
  
  const [query, setQuery] = useState<string>('');
  const [tagsSet, setTagsSet] = useState<Set<string>>(new Set());

  const onToggleTag = useCallback((t: string) => {
    const newSet = new Set(tagsSet);
    tagsSet.has(t) 
      ? newSet.delete(t)
      : newSet.add(t);
    setTagsSet(newSet);
  }, [tagsSet]);

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
      <div className='Search-tags noselect'>
        {sampleTags.map(t => <Tag onClick={() => onToggleTag(t)} text={t} toggle={tagsSet.has(t) ? 'remove' : 'add'} color={tags[t as keyof Tags]} />)}
      </div>

      {/* Results */}
      <SearchResults />
    </div>
  )
}