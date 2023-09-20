import { Box } from '@mui/material';
import { useRecentBookings } from './useRecentBookings';
import Stats from './Stats';
import { useUserRole } from '../users/useUsers';
import { formatCurrency } from '../../../utils/helpers';
import useTours from '../../tours/useTours';
import SalesChart from './SalesChart';

function Dashboard() {
  const { isLoading, bookings, numDays } = useRecentBookings();
  const { users: customers } = useUserRole('user');
  const { tours } = useTours();

  const totalSales = bookings?.reduce(
    (acc, val) => (acc += val.price),
    0
  );

  const toursWithReviews = tours?.filter(
    (tour) => tour.ratingsQuantity > 0
  );

  const avgRating =
    toursWithReviews?.reduce(
      (acc, val) => (acc += val.ratingsAverage),
      0
    ) / toursWithReviews?.length;

  return (
    <Box display="flex" flexDirection="column" gap="3rem">
      <Stats
        bookingsCount={bookings?.length}
        salesAmount={formatCurrency(totalSales || 0)}
        avgRating={avgRating}
        customersCount={customers?.length}
      />
      {/* <Box display="flex" justifyContent="space-between">
        <div>upcoming tours</div>
        <div>best rated tours</div>
      </Box> */}
      {/* <Box display="flex" justifyContent="space-between">
        <div>sales plot</div>
      </Box> */}
      <SalesChart bookings={bookings} numDays={numDays}></SalesChart>
    </Box>
  );
}

export default Dashboard;
