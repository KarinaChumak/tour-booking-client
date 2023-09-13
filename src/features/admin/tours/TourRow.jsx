import {
  Avatar,
  Box,
  Button,
  Chip,
  TableCell,
  TableRow,
  styled,
} from '@mui/material';
import { colors } from '../../../../theme';
import { formatDate } from '../../../../utils/helpers';
import { useState } from 'react';
import TourControlMenu from '../../../ui/TourControlMenu';

import CreateTourForm from './CreateTourForm';
import { useDeleteTour } from './useDeleteTour';
import { useCreateTour } from './useCreateTour';

const StyledCell = (props) => (
  <TableCell sx={{ color: colors.grey[700] }}>
    {props.children}
  </TableCell>
);

function TourRow({ tour }) {
  const [showForm, setShowForm] = useState(false);
  const leadGuide = tour.guides.find(
    (guide) => guide.role === 'lead-guide'
  );

  const {
    id,
    name,
    startLocation,
    description,
    duration,
    difficulty,
    maxGroupSize,
    price,
    program,
    summary,
    startDates,
    images,
    imageCover,
    guides,
  } = tour;

  const { isDeleting, mutateDelete } = useDeleteTour();
  const { isCreating: isDuplicating, mutateCreate } = useCreateTour();

  function handleDuplicate() {
    mutateCreate({
      name: `Copy of ${name}`,
      startLocation,
      description,
      duration,
      difficulty,
      maxGroupSize,
      price,
      program,
      summary,
      startDates,
      images,
      imageCover,
      guides,
    });
  }

  return (
    <>
      <TableRow sx={{ color: colors.green[400] }}>
        <StyledCell>{name}</StyledCell>

        {/* TODO: change API to return obly a single start date */}
        <StyledCell>{formatDate(startDates[0])}</StyledCell>
        <StyledCell>{startLocation.description}</StyledCell>
        <StyledCell>
          <Box display="flex" gap="1rem" alignItems="center">
            <Avatar src={leadGuide?.photo}></Avatar>
            {leadGuide?.name || 'No guide assigned yet'}
          </Box>
        </StyledCell>
        <StyledCell>People booked</StyledCell>
        <StyledCell>
          <Chip label="Booked" color="primary"></Chip>
        </StyledCell>
        <StyledCell>
          {/* <TourControlMenu></TourControlMenu> */}
          <Button onClick={() => setShowForm(!showForm)}>Edit</Button>
          <Button onClick={() => mutateDelete(id)}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>

          <Button onClick={handleDuplicate}>
            {isDuplicating ? 'Duplicating...' : 'Duplicate'}
          </Button>
        </StyledCell>
      </TableRow>
      {showForm && (
        <TableRow>
          <TableCell colSpan={7}>
            <CreateTourForm tourToEdit={tour}></CreateTourForm>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default TourRow;
