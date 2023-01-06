import clsx from 'clsx';
import { IoIosFlash } from 'react-icons/io';
import { days } from '../../utility/data/days_months';
import { useAppSelector } from '../../utility/helpers/hooks';
import { minMaxDate } from '../../utility/helpers/minMaxDate';
import './WeeklyTarget.css';

interface WeeklyTargetProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export const WeeklyTarget = ({...props}: WeeklyTargetProps) => {

  const today = new Date();
  const firstDay = new Date().setDate(today.getDate() - today.getDay());

  const data = useAppSelector(s => s.workoutData.routineData);

  return (
    <div {...props} className={'WeeklyTarget ' + props.className}>
      {days.map((d, i) => {
        const day = new Date(firstDay)
        day.setDate(day.getDate() + i);

        const [min, max] = minMaxDate(day);
        const trained = data.some(d => min <= d.start_date && max >= d.start_date);
        
        return <div 
          className={clsx(
            'WeeklyTarget-day',
            {trained},
            {'today': i === today.getDay()}
          )} 
          key={`dash-target-${d}`}
        >
          {trained && 
          <IoIosFlash size={'85%'} className='WeeklyTarget-trained' />}

          <p>{d[0]}</p>
        </div>
      })}
    </div>
  )
}