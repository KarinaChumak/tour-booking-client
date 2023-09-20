import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  styled,
} from '@mui/material';

import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import { formatDate } from '../../utils/helpers';

const OverlayedText = styled('h2')`
  position: absolute;
  top: 20%;
  left: 10%;
  background-image: linear-gradient(
    to bottom right,
    rgba(105, 192, 164, 0.657),
    rgba(0, 80, 80, 0.85)
  );
  text-transform: uppercase;
  color: white;
  font-size: 2rem;
  line-height: 1;
  text-align: left;
  padding: 0.4rem;
`;

const Heading = styled('h2')`
  text-transform: uppercase;
  text-align: left;
  color: #005050;
`;

const Paragraph = styled('p')`
  font-size: 0.8rem;
  color: #3c3c3c;
  text-align: left;
  display: flex;
  gap: 0.5rem;
`;

const Bold = styled('p')`
  font-weight: 700;
`;

const Feature = styled('div')`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  font-size: 0.8rem;
  text-align: left;
`;

function TourCard({ tour, showActions = true }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        sx={{
          height: 210,
          backgroundImage: `linear-gradient(
          to bottom right,
          rgba(0, 0, 0, 0.341),
          rgba(0, 80, 80, 0.4)
        ),  url(${tour?.imageCover})`,
        }}
        title="tour cover"
      />

      <OverlayedText>{tour?.name}</OverlayedText>
      <CardContent>
        <Box p={2} display={'flex'} flexDirection={'column'} gap={2}>
          <Heading>
            {tour?.difficulty} {tour?.duration}-day tour
          </Heading>
          <Paragraph>{tour?.summary}</Paragraph>
          <Grid
            container
            gap={2}
            columns={2}
            alignItems={'center'}
            marginTop={2}
          >
            <Grid item width={'50%'}>
              <Feature>
                <FmdGoodTwoToneIcon
                  color="primary"
                  fontSize="large"
                ></FmdGoodTwoToneIcon>
                <span> {tour?.startLocation.description}</span>
              </Feature>
            </Grid>
            <Grid item>
              <Feature>
                <CalendarMonthTwoToneIcon
                  color="primary"
                  fontSize="large"
                ></CalendarMonthTwoToneIcon>
                <span>
                  {/* TODO: StartDate -> will be a single value, not an array */}
                  {formatDate(tour?.startDates[0])}
                </span>
              </Feature>
            </Grid>
            <Grid item width={'50%'}>
              <Feature>
                <FlagTwoToneIcon
                  color="primary"
                  fontSize="large"
                ></FlagTwoToneIcon>
                <span>
                  {' '}
                  {`${tour?.program?.length} ${
                    tour?.program?.length > 1 ? 'stops' : 'stop'
                  }`}
                </span>
              </Feature>
            </Grid>
            <Grid item>
              <Feature>
                <PeopleAltTwoToneIcon
                  color="primary"
                  fontSize="large"
                ></PeopleAltTwoToneIcon>
                <span>{`${tour?.maxGroupSize} people`}</span>
              </Feature>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      {showActions && (
        <CardActions
          sx={{
            backgroundColor: '#f4fde5',
            marginBottom: '0px',
          }}
        >
          <Box
            py={2}
            px={3}
            display={'flex'}
            justifyContent={'space-between'}
            width={'100%'}
          >
            <Box>
              <Paragraph>
                <Bold>${tour?.price}</Bold>
                <span>per person</span>
              </Paragraph>
              <Paragraph>
                <Bold>{tour?.ratingsAverage}</Bold>
                <span>rating (${tour?.ratingsQuantity})</span>
              </Paragraph>
            </Box>

            <Button
              color="primary"
              variant="contained"
              disableElevation
              style={{
                minWidth: '120px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
              LinkComponent={Link}
              to={`/tour/${tour?.slug}`}
            >
              DETAILS
            </Button>
          </Box>
        </CardActions>
      )}
    </Card>
  );
}

export default TourCard;
