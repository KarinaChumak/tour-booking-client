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

function GuidesSelect({
  disabled,
  leadGuides,
  guides,
  field,
  formState,
  defaultValue,
}) {
  const [selectedPeople, setSelectedPeople] = useState(
    defaultValue?.map((item) => item._id) || []
  );

  // Workaroud to sync local state (selectedPeople) for displaying guied in a select list. If using field.value as a value source, MUI doesn't highlight selected options
  // TODO: ask someone why is that. How does MUI detect select list items uniqueness?

  useEffect(
    function () {
      if (field.value.length === 0) setSelectedPeople(field.value);
    },
    [formState.isSubmitSuccessful, field.value]
  );

  const handleChange = (event) => {
    setSelectedPeople([...event.target.value]);
    field.onChange([
      ...event.target.value.map((item) => getGuideById(item)),
    ]);
  };

  function getGuideById(id) {
    return [...leadGuides, ...guides].find((item) => item._id === id);
  }

  return (
    <Select
      disabled={disabled}
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
              key={value}
              label={getGuideById(value).name}
              avatar={
                <Avatar src={getGuideById(value).photo}></Avatar>
              }
            />
          ))}
        </Box>
      )}
    >
      <ListSubheader>Lead guides</ListSubheader>
      {leadGuides?.map((guide) => (
        <MenuItem
          key={guide._id}
          sx={{ gap: '10px' }}
          value={guide._id}
        >
          <Avatar
            src={guide.photo}
            sx={{ width: 24, height: 24 }}
          ></Avatar>
          <p>{guide.name}</p>
        </MenuItem>
      ))}

      <ListSubheader>Guides</ListSubheader>
      {guides?.map((guide) => (
        <MenuItem
          key={guide._id}
          sx={{ gap: '10px' }}
          value={guide._id}
          selected
        >
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
