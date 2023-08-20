import useTour from './useTour';
import BackgroundImage from '../../ui/BackgroundImage';
import Header from '../../ui/Header';
import Loader from '../../ui/Loader';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const Title = styled('h2')`
  text-transform: uppercase;
  color: white;
  font-size: 3rem;
  line-height: 1;
  text-align: center;
  padding: 0.4rem;
`;

const StyledBox = styled(Box)`
  width: 50%;
  display: block;
  margin: 0 auto;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.1)
  );
  backdrop-filter: blur(4px);
  border-radius: 20px;
`;

const Feature = styled('div')`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  font-size: 1.2rem;
  text-align: left;
  color: white;
`;

function TourOverview({ tourSlug }) {
  const { isLoading, error, tour } = useTour();

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <BackgroundImage image={tour.imageCover}>
        <Header></Header>

        <StyledBox
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Title>{tour.name}</Title>
          <Box
            display={'flex'}
            gap={6}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Feature>
              <FmdGoodOutlinedIcon
                color="white"
                fontSize="large"
              ></FmdGoodOutlinedIcon>
              <span> {tour.startLocation.description}</span>
            </Feature>
            <Feature>
              <AccessTimeOutlinedIcon
                color="white"
                fontSize="large"
              ></AccessTimeOutlinedIcon>
              <span> {`${tour.duration} days`}</span>
            </Feature>
          </Box>
        </StyledBox>
      </BackgroundImage>
    </div>
  );
}

export default TourOverview;
