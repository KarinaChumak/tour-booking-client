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
import { Controller } from 'react-hook-form';

const StyledGuideItem = styled(MenuItem)`
  gap: 10px;
`;

function GuidesSelect({ leadGuides, guides, field, formState }) {
  const [selectedPeople, setSelectedPeople] = useState([]);

  const handleChange = (event) => {
    setSelectedPeople([...event.target.value]);
    field.onChange([...event.target.value]);
  };

  // Workaroud to sync local state (selectedPeople) for displaying guied in a select list. If using field.value as a value source, MUI doesn't highlight selected options
  // TODO: ask someone why is that. How does MUI detect select list items uniqueness?

  useEffect(
    function () {
      if (field.value.length === 0) setSelectedPeople(field.value);
    },
    [formState.isSubmitSuccessful, field.value]
  );

  return (
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={selectedPeople}
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
