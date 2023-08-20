import { styled, keyframes } from '@mui/system';

const rotationAnimate = keyframes`
to{transform: rotate(.5turn)}`;

const SpinnerContainer = styled('div')`
  inset: 0px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0;
  backdrop-filter: blur(4px);
`;

const Spinner = styled('div')`
  width: 50px;
  aspect-ratio: 1;
  --_c: radial-gradient(farthest-side, #25b09b 92%, #0000);
  background: var(--_c) top, var(--_c) left, var(--_c) right,
    var(--_c) bottom;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  animation: ${rotationAnimate} 1s infinite;
`;

function Loader() {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}

export default Loader;
