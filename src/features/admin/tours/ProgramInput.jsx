import ProgramSingleDayInput from './ProgramSingleDayInput';
import { createContext, useEffect } from 'react';
import {
  ProgramProvider,
  useTourProgram,
} from '../../../contexts/ProgramContext';
function ProgramInput({ numDays, register, disabled }) {
  const { program, addLocationToProgram, deleteLocationFromProgram } =
    useTourProgram();

  useEffect(
    function () {
      register(program);
    },
    [program, register]
  );

  return (
    <div style={{ width: '100%' }}>
      {[...Array(numDays).keys()].map((i) => (
        <ProgramSingleDayInput
          disabled={disabled}
          key={i}
          day={i}
        ></ProgramSingleDayInput>
      ))}
    </div>
  );
}

export default ProgramInput;
