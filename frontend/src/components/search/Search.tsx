import { Tag } from '../ui/Tag';
import './Search.css';

import { SearchResults } from './SearchResults';

// interface SearchProps {

// }

const sampleTags = ['strength', 'hypertrophy', 'power', 'speed', 'metabolic'];


export const Search = () => {



  return (
    <div className='Search'>
      {/* Search bar */}
      <input className='Search-bar'/>

      {/* Tag filters */}
      <div className='Search-tags'>
        {sampleTags.map(t => <Tag text={t} toggle />)}
      </div>

      {/* Results */}
      <SearchResults />
    </div>
  )
}