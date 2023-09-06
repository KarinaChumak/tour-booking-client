import {
  Avatar,
  Box,
  Chip,
  ListSubheader,
  Menu,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';

const StyledGuideItem = styled(MenuItem)`
  gap: 10px;
`;

function GuidesSelect({ leadGuides, guides, registerObj }) {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const {
    name,
    onBlur,
    onChange: registerOnChange,
    ref: registerRef,
  } = registerObj;

  const handleChange = (event) => {
    setSelectedPeople([...event.target.value]);
    if (registerOnChange) {
      registerOnChange(event);
    }
  };

  return (
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={selectedPeople}
      name={name}
      onBlur={onBlur}
      ref={registerRef}
      onChange={handleChange}
      sx={{
        width: '80%',
      }}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip
              key={value._id}
              label={value.name}
              avatar={<Avatar src={value.photo}></Avatar>}
            />
          ))}
        </Box>
      )}
    >
      <ListSubheader>Lead guides</ListSubheader>
      {leadGuides?.map((guide) => (
        <MenuItem key={guide._id} sx={{ gap: '10px' }} value={guide}>
          <Avatar
            src={guide.photo}
            sx={{ width: 24, height: 24 }}
          ></Avatar>
          <p>{guide.name}</p>
        </MenuItem>
      ))}

      <ListSubheader>Guides</ListSubheader>
      {guides?.map((guide) => (
        <MenuItem key={guide._id} sx={{ gap: '10px' }} value={guide}>
          <Avatar
            src={guide.photo}
            sx={{ width: 24, height: 24 }}
          ></Avatar>
          <p>{guide.name}</p>
        </MenuItem>
      ))}
    </Select>
  );
}

export default GuidesSelect;
