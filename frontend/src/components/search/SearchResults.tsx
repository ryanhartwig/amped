import './SearchResults.css';

import { useAppSelector } from '../../utility/helpers/hooks';

interface SearchResultsProps {
  children?: React.ReactNode;  
}

export const SearchResults = ({children}: SearchResultsProps) => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  return (
    <div className='SearchResults hidescrollbar' style={{background}}>
      {children}
    </div>
  )
}