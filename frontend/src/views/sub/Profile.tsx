import './Profile.css';

/* React Icons */
import { IoPersonOutline } from 'react-icons/io5';

import { useAppSelector } from '../../utility/helpers/hooks';
import { WeeklyTarget } from '../../components/stats/WeeklyTarget';
import { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { AddEditGoal } from '../../components/user/AddEditGoal';

export const Profile = () => {
  const { background_alt: background } = useAppSelector(s => s.theme);

  const [weeks] = useState<number>(2);
  const [goalModal, setGoalModal] = useState<boolean>(false);

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


      {/* Weekly target */}
      <div className='Profile-weekly-target'>
        <p>Weekly training target</p>
        <WeeklyTarget className='Profile-weekly-target-days' />
        <h2 style={{fontSize: 26, marginBottom: 6}}>{weeks} weeks</h2>
        <p style={{fontSize: '0.9em', fontWeight: 100}}>target reached</p>
      </div>

      {/* Training Goals / Milestones */}
      <div className='Profile-goals'>
        <p>My training goals</p>
        <div className='Profile-goals-wrapper hidescrollbar' style={{background}}>
          <p className='Profile-goals-add' onClick={() => setGoalModal(true)}>+ Add training goal</p> 
        </div>
        
        {/* Add goal modal */}
        <Modal open={goalModal} onClose={() => setGoalModal(false)} closeText='Cancel'>
          <Modal.Header>Add a training goal</Modal.Header>
          <AddEditGoal />
        </Modal>
      </div>
    </div>
  )
}