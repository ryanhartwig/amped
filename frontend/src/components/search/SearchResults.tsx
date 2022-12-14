import { useAppSelector } from '../../utility/hooks';
import './SearchResults.css';

// interface SearchResultsProps {

// }

export const SearchResults = () => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  return (
    <div className='SearchResults' style={{background}}>
      
    </div>
  )
}