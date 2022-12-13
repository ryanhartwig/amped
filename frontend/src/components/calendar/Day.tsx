import './Day.css';

interface DayProps {
  date: any,
}

export const Day = ({date}: DayProps) => {


  return (
    <div className='Day'>
      <div className='Day-content'>
        <p>{date}</p>
      </div>
    </div>
  )
}