import { styled, keyframes } from '@mui/system';
import { colors } from '../../theme';
const rotationAnimate = keyframes`
to{transform: rotate(.5turn)}`;

const SpinnerContainerAllScreen = styled('div')`
  inset: 0px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0;
  backdrop-filter: blur(4px);
`;

const SpinnerContainer = styled('div')`
  height: 60vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

const Spinner = styled('div')`
  width: 50px;
  aspect-ratio: 1;
  --_c: radial-gradient(
    farthest-side,
    ${colors.blue[800]} 92%,
    #0000
  );
  background: var(--_c) top, var(--_c) left, var(--_c) right,
    var(--_c) bottom;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  animation: ${rotationAnimate} 1s infinite;
`;

function Loader({ allScreen = true }) {
  if (allScreen)
    return (
      <SpinnerContainerAllScreen>
        <Spinner></Spinner>
      </SpinnerContainerAllScreen>
    );

  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}

export default Loader;
