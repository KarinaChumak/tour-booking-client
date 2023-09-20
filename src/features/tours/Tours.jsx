import { Box, Grid, Skeleton } from '@mui/material';

import useTours from './useTours';
import TourCard from './TourCard';
import TourSkeletonCard from '../../ui/TourSkeletonCard';

function Tours() {
  const { isLoading, error, tours } = useTours();

  return (
    <Box p={4} bgcolor={'background.light'}>
      <Grid
        container
        spacing={6}
        margin={'auto'}
        justifyContent="start"
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item key={i}>
                <TourSkeletonCard></TourSkeletonCard>
              </Grid>
            ))}
          </>
        ) : (
          <>
            {tours.map((tour, i) => (
              <Grid item key={tour.id}>
                <TourCard key={tour.id} tour={tour}></TourCard>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
}

export default Tours;
