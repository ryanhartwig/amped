import './Day.css';

interface DayProps {
  date: Date,
}

export const Day = ({date}: DayProps) => {


  return (
    <div className='Day'>
      <div className='Day-content'>
        <p>{date.getDate()}</p>
        <p>{date.getFullYear()}</p>
        <p>{date.getMonth() + 1}</p>
      </div>
    </div>
  )
}