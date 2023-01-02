import { useState } from 'react';
import { Counter } from '../../../components/ui/Counter';
import { useAppSelector } from '../../../utility/helpers/hooks';
import './AddSet.css';

// interface AddSetProps {

// }

export const AddSet = () => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  const [weight, setWeight] = useState<number>(90);



  return (
    <div className='AddSet' style={{background}}>
      <Counter value={weight} 
        setValue={setWeight}
        incrementBy={5}
      />
    </div>
  )
}