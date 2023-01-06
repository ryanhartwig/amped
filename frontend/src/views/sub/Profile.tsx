import './Profile.css';

/* React Icons */
import { IoPersonOutline } from 'react-icons/io5';
import { useAppSelector } from '../../utility/helpers/hooks';
import { WeeklyTarget } from '../../components/stats/WeeklyTarget';
import { useState } from 'react';

export const Profile = () => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  const [weeks] = useState<number>(2);

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
        <h2 style={{fontSize: 26, marginBottom: 6}}>{weeks} weeks</h2>
        <p style={{fontSize: '0.9em', fontWeight: 100}}>target reached</p>
      </div>
    </div>
  )
}