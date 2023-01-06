import { AiOutlineCheck } from 'react-icons/ai';
import { GoalType } from '../../types/GoalType';
import { useAppSelector } from '../../utility/helpers/hooks';
import './Goal.css';

interface GoalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  goal: GoalType,
}

export const Goal = ({goal: g, ...props}: GoalProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);

  const [m, d, y] = new Date(g.deadline).toDateString().split(' ').slice(1);

  return (
    <div {...props} className={'Goal ' + props.className} style={{cursor: props.onClick ? 'pointer' : '', ...props.style, background}}>
      <div className='Goal-left'>
        <p>{g.goal}</p>
      </div>
      {!g.completed 
      ? <p className='Goal-left-date'>by {`${m} ${d}, ${y}`}</p>
      : <div className='Goal-completed'>
          <AiOutlineCheck size={13} />
          <p>complete</p>
        </div>}
    </div>
  )
}