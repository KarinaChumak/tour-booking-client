import { Button, SvgIcon, TextField } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import ImagePreview from './ImagePreview';

const PreviewContainer = styled('div')`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const StyledInputContainer = styled('div')`
  display: flex;
  width: 100%;
  gap: 15px;
`;

function FileUploadInput({
  field,
  formState,
  resetFn,
  id,
  multiple = false,
}) {
  // Create a reference to the hidden file input element

  const hiddenFileInput = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // To simplify dependencies in useEffect
  const { value: fieldValue, onChange: fieldOnchange } = field;

  useEffect(
    function () {
      if (!fieldValue) {
        setSelectedFiles([]);
      }
    },
    [formState.isSubmitSuccessful, fieldValue]
  );

  useEffect(
    function () {
      fieldOnchange(selectedFiles);
    },
    [selectedFiles, fieldOnchange]
  );

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const onChangeAggregated = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles((selectedFiles) => [
        ...selectedFiles,
        ...Object.values(e.target.files),
      ]);
    }
  };

  const handleDelete = (fileToDelete) => {
    setSelectedFiles((selectedFiles) =>
      selectedFiles.filter((file) => file.name !== fileToDelete.name)
    );

    if (selectedFiles.length === 0) {
      resetFn();
    }
  };

  return (
    <StyledInputContainer
      style={{
        flexDirection: `${multiple ? 'column' : 'row'}`,
      }}
    >
      <Button
        id={id}
        variant="outlined"
        startIcon={
          <CloudUploadOutlinedIcon></CloudUploadOutlinedIcon>
        }
        sx={{ width: '30%' }}
        onClick={handleClick}
      >
        {multiple
          ? selectedFiles.length === 0
            ? 'Select files'
            : 'Add more files'
          : 'Select 1 file'}
      </Button>

      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        ref={hiddenFileInput}
        onChange={onChangeAggregated}
        style={{ display: 'none' }} // Make the file input element invisible
      />

      <PreviewContainer>
        {selectedFiles.length > 0
          ? selectedFiles?.map((file) => (
              <ImagePreview
                key={file.name}
                fileName={file.name}
                vertical={multiple}
                imageSrc={URL.createObjectURL(file)}
                onClick={() => handleDelete(file)}
              ></ImagePreview>
            ))
          : multiple
          ? 'No files selected'
          : 'File is not selected'}
      </PreviewContainer>
    </StyledInputContainer>
  );
}

export default FileUploadInput;
