import './Tag.css';

interface TagProps {
  text: string,
  toggle?: boolean,
}

export const Tag = ({text, toggle}: TagProps) => {


  return (
    <div className='Tag'>
      <p>{text}</p>
    </div>
  )
}