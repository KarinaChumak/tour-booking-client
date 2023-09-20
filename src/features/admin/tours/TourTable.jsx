import {
  Button,
  Card,
  CardActionArea,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { colors } from '../../../../theme';
import useTours from '../../tours/useTours';
import TourRow from './TourRow';
import Loader from '../../../ui/Loader';
import { useSearchParams } from 'react-router-dom';

const headerStyle = {
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: colors.grey[700],
};

function TourTable() {
  const { isLoading, error, tours } = useTours();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Loader allScreen={false}></Loader>;

  // 1) Filter
  const filterValue = searchParams.get('published') || 'all';

  let filteredTours;
  if (filterValue === 'all') filteredTours = tours;
  if (filterValue === 'published') {
    filteredTours = tours.filter((tour) => tour.published === true);
  }
  if (filterValue === 'unpublished')
    filteredTours = tours.filter((tour) => tour.published === false);

  // 2) Sort

  const sortBy = searchParams.get('sortBy') || 'date-desc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedTours = filteredTours.sort((a, b) =>
    a[field] > b[field] ? modifier : -modifier
  );

  return (
    <TableContainer
      component={Card}
      elevation={0}
      sx={{
        border: `1px solid ${colors.grey[200]}`,
        borderRadius: '10px',
      }}
    >
      <Table color="primary">
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyle}>Name</TableCell>
            <TableCell sx={headerStyle}>Date start</TableCell>
            <TableCell sx={headerStyle}>Location start</TableCell>
            <TableCell sx={headerStyle}>Tour guide</TableCell>
            <TableCell sx={headerStyle}>People booked</TableCell>
            <TableCell sx={headerStyle}> Label</TableCell>
            <TableCell sx={headerStyle}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTours?.map?.((tour) => (
            <TourRow key={tour.id} tour={tour}></TourRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TourTable;
