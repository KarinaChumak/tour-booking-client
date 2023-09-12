import ProgramSingleDayInput from './ProgramSingleDayInput';
import { createContext, useEffect } from 'react';
import {
  ProgramProvider,
  useTourProgram,
} from '../../../contexts/ProgramContext';
function ProgramInput({ numDays, register }) {
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
          key={i}
          day={i}
        ></ProgramSingleDayInput>
      ))}
    </div>
  );
}

export default ProgramInput;
