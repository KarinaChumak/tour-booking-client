import {
  Box,
  Card,
  CardActions,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

function TourSkeletonCard() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'345px'}
        height={210}
      />

      <Box p={2} display={'flex'} flexDirection={'column'} gap={2}>
        {/* <Skeleton
          animation="wave"
          variant="rectangular"
          width={'80%'}
          height={25}
        ></Skeleton> */}
        <Typography variant="h2">
          <Skeleton animation="wave" />
        </Typography>
        {/* <Skeleton
          animation="wave"
          variant="rectangular"
          width={'85%'}
          height={40}
        ></Skeleton> */}
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="p">
            <Skeleton animation="wave" />
          </Typography>{' '}
          <Typography variant="p">
            <Skeleton animation="wave" />
          </Typography>
        </Box>

        <Grid
          container
          gap={2}
          columns={2}
          alignItems={'center'}
          marginTop={2}
        >
          <Grid item width={'40%'}>
            <Skeleton animation="wave" height={'35px'}></Skeleton>
          </Grid>
          <Grid item width={'40%'}>
            <Skeleton animation="wave" height={'35px'}></Skeleton>
          </Grid>
          <Grid item width={'40%'}>
            <Skeleton animation="wave" height={'35px'}></Skeleton>
          </Grid>
          <Grid item width={'40%'}>
            <Skeleton animation="wave" height={'35px'}></Skeleton>
          </Grid>
        </Grid>
      </Box>

      <CardActions
        sx={{
          backgroundColor: '#f4fde5',
          marginBottom: '0px',
          height: '80px',
        }}
      >
        <Box
          p={2}
          display={'flex'}
          justifyContent={'space-between'}
          width={'100%'}
        ></Box>
      </CardActions>
    </Card>
  );
}

export default TourSkeletonCard;
