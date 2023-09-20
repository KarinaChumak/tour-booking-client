import { useState } from 'react';
import { Box, Pagination as MUIPagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

function Pagination({ resultsCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(resultsCount / PAGE_SIZE);

  const handleChange = (event, value) => {
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        padding: '10px',
        justifyContent: 'center',
      }}
    >
      <MUIPagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        color="primary"
      ></MUIPagination>
    </Box>
  );
}

export default Pagination;
