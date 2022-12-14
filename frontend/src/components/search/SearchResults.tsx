import { useAppSelector } from '../../utility/hooks';
import './SearchResults.css';

interface SearchResultsProps {
  results?: any[],
}

export const SearchResults = ({results}: SearchResultsProps) => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  return (
    <div className='SearchResults hidescrollbar' style={{background}}>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p><p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p><p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p><p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p><p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
      <p>sample thing</p>
    </div>
  )
}