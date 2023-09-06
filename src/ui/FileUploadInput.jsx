import { Button, SvgIcon, TextField } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import ImagePreview from './ImagePreview';

function FileUploadInput({ registerObj, resetFn }) {
  // Create a reference to the hidden file input element

  const {
    name,
    onBlur,
    onChange: registerOnChange,
    ref: registerRef,
  } = registerObj;

  const hiddenFileInput = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [tmpImage, setTmpImage] = useState(null);

  useEffect(
    function () {
      setSelectedFileName(null);
      setTmpImage(null);
    },
    [registerObj]
  );

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const onChangeAggregated = (e) => {
    if (!e) {
      setTmpImage(null);
      setSelectedFileName(null);
      resetFn();
    }
    // Setting tmp image for preview
    if (e.target.files && e.target.files[0]) {
      setTmpImage(URL.createObjectURL(e.target.files[0]));
    }

    setSelectedFileName(
      (selectedFileName) =>
        hiddenFileInput.current?.files[0]?.name || selectedFileName
    );

    if (registerOnChange) {
      registerOnChange(e);
    }
  };

  return (
    <>
      <Button
        id="input-tour-imageCover"
        variant="outlined"
        startIcon={
          <CloudUploadOutlinedIcon></CloudUploadOutlinedIcon>
        }
        sx={{ width: '30%' }}
        onClick={handleClick}
      >
        Select file
      </Button>

      <input
        type="file"
        multiple
        {...registerObj}
        ref={(e) => {
          registerRef(e);
          hiddenFileInput.current = e;
        }}
        onChange={onChangeAggregated}
        name={name}
        onBlur={onBlur}
        style={{ display: 'none' }} // Make the file input element invisible
      />
      <ImagePreview
        fileName={selectedFileName}
        imageSrc={tmpImage}
        onClick={() => onChangeAggregated(null)}
      ></ImagePreview>
    </>
  );
}

export default FileUploadInput;
