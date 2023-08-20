import { styled } from '@mui/system';

const BackgroundImage = styled('div')`
  width: 100%;
  height: 70vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0.01)
    ),
    url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
`;

export default BackgroundImage;
