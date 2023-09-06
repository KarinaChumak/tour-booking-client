import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  styled,
} from '@mui/material';
import { colors } from '../../../../theme';
import { formatDate } from '../../../../utils/helpers';
import { useState } from 'react';
import TourControlMenu from '../../../ui/TourControlMenu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOneTour } from '../../../services/tourService';
import { toast } from 'react-hot-toast';

const StyledCell = (props) => (
  <TableCell sx={{ color: colors.grey[700] }}>
    {props.children}
  </TableCell>
);

function TourRow({ tour }) {
  const leadGuide = tour.guides.find(
    (guide) => guide.role === 'lead-guide'
  );

  const { id, name, startLocation, startDates } = tour;

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteOneTour(id),

    // Clearing cache to refetch the data after deletion
    onSuccess: () => {
      toast.success('Tour successfully deleted');
      queryClient.invalidateQueries({ queryKey: 'tours' });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
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
        <Button onClick={() => mutate(id)}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </StyledCell>
    </TableRow>
  );
}

export default TourRow;
