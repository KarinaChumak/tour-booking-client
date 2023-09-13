import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const ProgramContext = createContext();

function ProgramProvider({ defaultValue, children }) {
  const [program, setProgram] = useState(defaultValue || []);

  function addLocationToProgram(day, location) {
    const dayToAdd = program.filter((item) => item.day === day)[0];

    if (!dayToAdd) {
      setProgram([...program, { day, locations: [location] }]);
    } else {
      const restOfDays = program.filter((item) => item.day !== day);

      const editedDay = {
        ...dayToAdd,
        locations: [...dayToAdd.locations, location],
      };

      setProgram([...restOfDays, editedDay]);
    }
  }

  function deleteLocationFromProgram(day, placeId) {
    const dayToDeleteFrom = program.filter(
      (item) => item.day === day
    )[0];
    const restOfDays = program.filter((item) => item.day !== day);

    const editedDay = {
      ...dayToDeleteFrom,
      locations: dayToDeleteFrom.locations.filter(
        (item) => item.place_id !== placeId
      ),
    };

    if (editedDay.locations.length === 0) setProgram(restOfDays);
    else setProgram([...restOfDays, editedDay]);
  }

  return (
    <ProgramContext.Provider
      value={{
        program,
        addLocationToProgram,
        deleteLocationFromProgram,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

function useTourProgram() {
  const context = useContext(ProgramContext);
  if (context === undefined)
    throw new Error(
      'ProgramContext was used outside of ProgramContextProvider'
    );
  return context;
}

export { ProgramProvider, useTourProgram };
