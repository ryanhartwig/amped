import { GoalType } from '../../types/Goal';
import { useAppSelector } from '../../utility/helpers/hooks';
import './Goal.css';

interface GoalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  goal: GoalType,
}

export const Goal = ({goal: g, ...props}: GoalProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);

  const [m, d, y] = new Date(g.deadline).toDateString().split(' ').slice(1);

  return (
    <div {...props} className={'Goal ' + props.className} style={{...props.style, background}}>
      <div className='Goal-left'>
        <p>{g.goal}</p>
        <p>by {`${m} ${d}, ${y}`}</p>
      </div>
    </div>
  )
}