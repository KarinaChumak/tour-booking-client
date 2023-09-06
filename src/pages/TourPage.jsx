import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import TourOverview from '../features/tours/TourOverview';

function TourPage() {
  const params = useParams();

  return (
    <Box>
      {/* from features - entire tour info */}
      <TourOverview tourSlug={params.slug}></TourOverview>
      {/* subscribe to get a % */}
      {/* footers */}
    </Box>
  );
}

export default TourPage;
