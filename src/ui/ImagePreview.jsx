import { styled } from '@mui/system';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Badge, IconButton } from '@mui/material';
import { colors } from '../../theme';

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(10%, -10%);
  background-color: ${colors.grey[300]};
  padding: 2px;

  &:hover {
    background-color: ${colors.grey[400]};
  }
`;

const StyledContainer = styled('div')`
  display: flex;
  gap: 15px;
  text-align: left;
  align-items: center;
  font-size: 0.8rem;
`;

function ImageDelete({ imageSrc, onClick }) {
  return (
    <div style={{ position: 'relative' }}>
      <img
        alt="preview image"
        src={imageSrc}
        height={'50px'}
        style={{ maxWidth: 100, borderRadius: 5 }}
      />

      <StyledIconButton onClick={onClick} size="small">
        <ClearRoundedIcon
          sx={{ fontSize: '12px', color: '#fff' }}
        ></ClearRoundedIcon>
      </StyledIconButton>
    </div>
  );
}

function ImagePreview({ fileName, imageSrc, onClick }) {
  return (
    <StyledContainer>
      {imageSrc && (
        <ImageDelete imageSrc={imageSrc} onClick={onClick} />
      )}
      <p>{fileName || 'No file selected'}</p>
    </StyledContainer>
  );
}

export default ImagePreview;
