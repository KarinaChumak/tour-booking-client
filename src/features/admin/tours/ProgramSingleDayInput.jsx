import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  IconButton,
} from '@mui/material';
import LocationAutocompleteInput from '../../../ui/LocationAutocompleteInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { styled } from '@mui/system';
import { colors } from '../../../../theme';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { useTourProgram } from '../../../contexts/ProgramContext';

const StyledSelectedLocation = styled('div')`
  padding: 0.4rem 0.8rem;
  width: 100%;
  border: ${`1px solid ${colors.grey[200]}`};
  border-radius: 5px;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  align-items: center;
`;

const StyledLocationsDiv = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 1.4rem;
`;
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

function ProgramSingleDayInput({ day, disabled }) {
  const { program, addLocationToProgram, deleteLocationFromProgram } =
    useTourProgram();

  const currentDay = program.filter((item) => item.day === day)[0];

  function handleAddLocation(item) {
    if (item) {
      addLocationToProgram(day, item);
    }
  }

  function handleDelete(placeId) {
    deleteLocationFromProgram(day, placeId);
  }

  return (
    <Accordion disabled={disabled}>
      <AccordionSummary
        sx={{
          backgroundColor: colors.lightGreen[100],
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        {`Day ${day + 1}`}
      </AccordionSummary>
      <AccordionDetails>
        <StyledLocationsDiv>
          {currentDay?.locations?.map((loc, i) => (
            <StyledSelectedLocation key={i}>
              <RoomOutlinedIcon
                sx={{ color: colors.grey[500] }}
              ></RoomOutlinedIcon>
              {loc.description}
              <IconButton
                onClick={() => handleDelete(loc.place_id)}
                size="small"
                sx={{
                  maxWidth: '50%',
                  aspectRatio: 1,
                  justifySelf: 'end',
                }}
              >
                <ClearRoundedIcon
                  sx={{ fontSize: '12px' }}
                ></ClearRoundedIcon>
              </IconButton>
            </StyledSelectedLocation>
          ))}
        </StyledLocationsDiv>
        <LocationAutocompleteInput
          fullWidth={true}
          register={(value) => handleAddLocation(value)}
        ></LocationAutocompleteInput>
      </AccordionDetails>
    </Accordion>
  );
}

export default ProgramSingleDayInput;
