import { Box } from '@mui/material';
import Stat from './Stat';
import LuggageIcon from '@mui/icons-material/Luggage';
import GroupIcon from '@mui/icons-material/Group';
import StarBorderIcon from '@mui/icons-material/StarBorder';
function Stats({
  bookingsCount,
  salesAmount,
  avgRating,
  customersCount,
}) {
  return (
    <Box display="flex" justifyContent="space-between" gap="1rem">
      <Stat
        icon={<LuggageIcon></LuggageIcon>}
        title={'Bookings'}
        value={bookingsCount}
        color={'lightGreen'}
      ></Stat>
      <Stat
        icon={<LuggageIcon></LuggageIcon>}
        title={'Sales'}
        value={salesAmount}
        color={'indigo'}
      ></Stat>
      <Stat
        icon={<StarBorderIcon></StarBorderIcon>}
        title={'Average rating'}
        value={avgRating}
        color={'yellow'}
      ></Stat>
      <Stat
        icon={<GroupIcon></GroupIcon>}
        title={'Customers'}
        value={customersCount}
        color={'green'}
      ></Stat>
    </Box>
  );
}

export default Stats;
