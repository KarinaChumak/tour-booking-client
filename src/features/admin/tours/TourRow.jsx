import { useState } from 'react';

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

import { formatDate } from '../../../utils/helpers';

import TourControlMenu from './TourControlMenu';
import { useDeleteTour } from './useDeleteTour';
import { useCreateTour } from './useCreateTour';

import CreateTourForm from './CreateTourForm';
import Modal from '../../../ui/CustomModal';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import { useEditTour } from './useEditTour';
import ConfirmPublish from '../../../ui/ConfirmPublish';

const StyledCell = (props) => (
  <TableCell sx={{ color: colors.grey[700] }}>
    {props.children}
  </TableCell>
);

function TourRow({ tour }) {
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
    published,
    numPeopleBooked,
  } = tour;

  const { isEditing, mutateEdit } = useEditTour();
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

  function handleChangePublished(editId, published) {
    mutateEdit({ newData: { published }, editId });
  }

  return (
    <TableRow
      sx={{
        color: colors.green[400],
        backgroundColor: `${
          published ? colors.white[100] : colors.grey[100]
        }`,
      }}
    >
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
      <StyledCell>{`${numPeopleBooked}/${maxGroupSize}`}</StyledCell>
      <StyledCell>
        <Chip
          label={
            numPeopleBooked == maxGroupSize
              ? 'Sold out'
              : published
              ? 'Selling'
              : 'Unpublished'
          }
          color={
            numPeopleBooked == maxGroupSize
              ? 'primary'
              : published
              ? 'secondary'
              : 'warning'
          }
        ></Chip>
      </StyledCell>
      <StyledCell>
        <Modal>
          <TourControlMenu
            published={published}
            onDuplicate={handleDuplicate}
            onUnpublish={() => handleChangePublished(id, false)}
          ></TourControlMenu>

          <Modal.Window name="deleteTour" type={'small'}>
            <ConfirmDelete
              entity={'tour'}
              onConfirm={() => mutateDelete(id)}
            ></ConfirmDelete>
          </Modal.Window>

          <Modal.Window name="publish" type={'small'}>
            <ConfirmPublish
              onConfirm={() => handleChangePublished(id, true)}
            ></ConfirmPublish>
          </Modal.Window>

          <Modal.Window name="editTour">
            <CreateTourForm tourToEdit={tour} />
          </Modal.Window>
        </Modal>
      </StyledCell>
    </TableRow>
  );
}

export default TourRow;
