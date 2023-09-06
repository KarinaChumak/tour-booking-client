import { useQuery } from '@tanstack/react-query';
import { getTours } from '../services/tourService';

import { styled } from '@mui/system';
import { Button, Box, CircularProgress } from '@mui/material';
import Header from '../ui/Header';
import SearchBar from '../ui/SearchBar';
import Tours from '../features/tours/Tours';
import BackgroundImage from '../ui/BackgroundImage';

const apiUrl = import.meta.env.VITE_API_ADDRESS;

const imageURL = '/pexels-andrei-tanase-1271619.jpg';
const Heading = styled('h3')`
  font-size: 4rem;
  color: white;
  text-align: left;
  line-height: 1;
`;

const Paragraph = styled('p')`
  color: white;
  font-size: '1rem';
`;

function Home() {
  return (
    <div>
      <BackgroundImage image={imageURL}>
        <Header></Header>
        <Box
          display={'flex'}
          width={2 / 3}
          p={'2rem'}
          flexDirection={'column'}
          alignItems={'start'}
          gap={'2rem'}
        >
          <Heading>
            Make in your <br /> journey
          </Heading>
          <SearchBar></SearchBar>
          <Paragraph>Explore the world with what you love</Paragraph>
        </Box>
      </BackgroundImage>

      <Tours></Tours>

      <Button color="primary" variant="contained">
        Primary
      </Button>

      <Button color="secondary" variant="contained">
        Secondary
      </Button>
    </div>
  );
}

export default Home;
