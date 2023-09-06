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
import useTours from '../../Tours/useTours';
import TourRow from './TourRow';
import Loader from '../../../ui/Loader';

const headerStyle = {
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: colors.grey[700],
};

function TourTable() {
  const { isLoading, error, tours } = useTours();

  if (isLoading) return <Loader allScreen={false}></Loader>;

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
            <TableCell sx={headerStyle}> A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tours.map((tour) => (
            <TourRow key={tour.id} tour={tour}></TourRow>
          ))}
        </TableBody>
      </Table>

      <CardActionArea>pagination here</CardActionArea>
    </TableContainer>
  );
}

export default TourTable;
