import './Profile.css';

/* React Icons */
import { IoPersonOutline } from 'react-icons/io5';
import { useAppSelector } from '../../utility/helpers/hooks';
import { WeeklyTarget } from '../../components/stats/WeeklyTarget';

export const Profile = () => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  return (
    <div className='Profile'>
      {/* Top Section (avatar & name) */}
      <div className='Profile-avatar' style={{background}}>
        <div className='Profile-circle'>
          <IoPersonOutline size={67} className='Profile-avatar-svg' />
        </div>
      </div>
      <h2>Ryan Hartwig</h2>
      <hr className='Profile-hr' />


      {/* Goals, weekly target */}
      <div className='Profile-weekly-target'>
        <p>Weekly training target</p>
        <WeeklyTarget className='Profile-weekly-target-days' />
      </div>
    </div>
  )
}