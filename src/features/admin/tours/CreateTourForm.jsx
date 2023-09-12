import { styled } from '@mui/system';

import { DatePicker } from '@mui/x-date-pickers';

import { Button, Paper, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createOneTour } from '../../../services/tourService';
import { useUserRole } from '../users/useUsers';
import GuidesSelect from '../../../ui/GuidesSelect';
import FileUploadInput from '../../../ui/FileUploadInput';
import LocationAutocompleteInput from '../../../ui/LocationAutocompleteInput';
import CreateTourFormRow from './CreateTourFormRow';
import DifficultyInput from '../../../ui/DifficultyInput';
import {
  getFormatedLocation,
  getFormattedProgram,
} from '../../../../utils/location';
import ProgramInput from './ProgramInput';
import { ProgramProvider } from '../../../contexts/ProgramContext';

const MAX_DURATION = 30;

const StyledH1 = styled('h1')`
  text-align: left;
`;

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: start;
  row-gap: 15px;
`;

function CreateTourForm({ tourToEdit }) {
  const [duration, setDuration] = useState(0);
  const { users: leadGuides } = useUserRole('lead-guide');
  const { users: guides } = useUserRole('guide');
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createOneTour,
    onSuccess: () => {
      toast.success('New tour successfully created');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      reset();
    },
    onError: () => {
      toast.error(`Couldn't create a new tour`);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState,
    resetField,
    control,
  } = useForm();

  const { errors } = formState;

  async function onSubmit(data) {
    const startLocation = await getFormatedLocation(
      data.startLocation
    );

    const formattedProgram = await getFormattedProgram(data.program);
    mutate({
      ...data,
      imageCover: data.imageCover[0],
      guides: data.guides.map((guide) => guide._id),
      startLocation,
      program: formattedProgram,
    });

    // console.log(data);
  }

  function onError(errors, data) {
    console.log(errors);
  }

  function handleDurationChange(e, field) {
    const duration = parseInt(e.target.value);

    if (duration <= MAX_DURATION) {
      setDuration(parseInt(e.target.value) || 0);
      field.onChange(parseInt(e.target.value));
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '10px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '20px',
        width: '100%',
      }}
    >
      <StyledH1>Create new tour</StyledH1>

      <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
        <CreateTourFormRow
          label="Name"
          name="name"
          required={true}
          errors={errors}
        >
          <TextField
            id="input-tour-name"
            {...register('name', {
              required: 'This field is required',
            })}
            size="small"
            sx={{ width: '50%' }}
          />
        </CreateTourFormRow>
        <CreateTourFormRow
          label="Difficulty"
          name="difficulty"
          required={true}
          errors={errors}
        >
          <DifficultyInput
            registerObj={register('difficulty', {
              required: 'This field is required',
            })}
          ></DifficultyInput>
        </CreateTourFormRow>
        <CreateTourFormRow
          label={'Max group size'}
          name="maxGroup"
          required={true}
          errors={errors}
        >
          <TextField
            type="number"
            id="input-tour-maxGroup"
            {...register('maxGroupSize', {
              required: 'This field is required',
              min: {
                value: 1,
                message: `Group size should be at least 1`,
              },
            })}
            size="small"
            sx={{ width: '50%', maxHeight: '50px' }}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Price"
          name="price"
          required={true}
          errors={errors}
        >
          <TextField
            type="number"
            id="input-tour-price"
            {...register('price', {
              required: 'This field is required',
              min: {
                value: 0,
                message: `Tour price can't be negative`,
              },
            })}
            size="small"
            sx={{ width: '50%', maxHeight: '50px' }}
          />
        </CreateTourFormRow>
        <CreateTourFormRow
          label="Duration (days)"
          name="duration"
          required={true}
          errors={errors}
        >
          <Controller
            control={control}
            name="duration"
            rules={{
              required: 'This field is required',
              min: {
                value: 1,
                message: `Tour duration should be at least 1 day`,
              },
              max: {
                value: MAX_DURATION,
                message: `Tour duration should be no more than 30 days`,
              },
            }}
            render={({ field }) => (
              <TextField
                id="input-tour-duration"
                onChange={(e) => handleDurationChange(e, field)}
                size="small"
                sx={{ width: '50%', maxHeight: '50px' }}
              />
            )}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Start date"
          name="startDate"
          errors={errors}
        >
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                size="small"
                sx={{ width: '50%' }}
                onChange={(date) => field.onChange(date)}
                slotProps={{ textField: { size: 'small' } }}
                selected={field.value}
              />
            )}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Start location"
          name="startLocation"
          errors={errors}
        >
          <Controller
            control={control}
            name="startLocation"
            render={({ field }) => (
              <LocationAutocompleteInput
                register={(e) => field.onChange(e)}
              />
            )}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Summary"
          name="summary"
          required={true}
          errors={errors}
        >
          <TextField
            multiline
            minRows={2}
            maxRows={5}
            id="input-tour-summary"
            {...register('summary', {
              required: 'This field is required',
            })}
            size="small"
            sx={{ width: '50%' }}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Description"
          name="description"
          required={true}
          errors={errors}
        >
          <TextField
            id="input-tour-description"
            multiline
            size="small"
            {...register('description', {
              required: 'This field is required',
            })}
            sx={{ width: '80%' }}
            maxRows={30}
            minRows={5}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Cover image"
          name="imageCover"
          required={true}
          errors={errors}
        >
          <Controller
            control={control}
            name="imageCover"
            rules={{ required: 'This field is required' }}
            render={({ field, formState }) => (
              <FileUploadInput
                field={field}
                formState={formState}
                resetFn={() => resetField('imageCover')}
              />
            )}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Tour guides"
          name="guides"
          errors={errors}
        >
          <Controller
            control={control}
            name="guides"
            defaultValue={[]}
            render={({ field, formState }) => (
              <GuidesSelect
                guides={guides}
                leadGuides={leadGuides}
                field={field}
                formState={formState}
              />
            )}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Tour images"
          name="images"
          errors={errors}
        >
          <Controller
            control={control}
            name="images"
            render={({ field, formState }) => (
              <FileUploadInput
                field={field}
                multiple={true}
                formState={formState}
                id={'input-tour-images'}
                resetFn={() => resetField('images')}
              />
            )}
          />
        </CreateTourFormRow>

        <CreateTourFormRow
          label="Tour program"
          name="program"
          errors={errors}
        >
          <ProgramProvider>
            <Controller
              control={control}
              name="program"
              render={({ field }) => (
                <ProgramInput
                  numDays={duration}
                  register={field.onChange}
                ></ProgramInput>
              )}
            />
          </ProgramProvider>
        </CreateTourFormRow>

        <Box
          sx={{ gridColumn: 2, width: '80%', marginTop: '30px' }}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Button
            type="reset"
            variant="outlined"
            disableElevation
            size="large"
            style={{ width: '150px' }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            size="large"
            style={{ width: '150px' }}
            disabled={isCreating}
          >
            Create tour
          </Button>
        </Box>
      </StyledForm>
    </Paper>
  );
}

export default CreateTourForm;
