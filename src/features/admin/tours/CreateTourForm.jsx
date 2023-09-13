import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { styled } from '@mui/system';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Paper, TextField } from '@mui/material';
import { Box } from '@mui/material';

import { useUserRole } from '../users/useUsers';
import { useCreateTour } from './useCreateTour';
import { useEditTour } from './useEditTour';
import { ProgramProvider } from '../../../contexts/ProgramContext';

import GuidesSelect from '../../../ui/GuidesSelect';
import FileUploadInput from '../../../ui/FileUploadInput';
import LocationAutocompleteInput from '../../../ui/LocationAutocompleteInput';
import CreateTourFormRow from './CreateTourFormRow';
import DifficultyInput from '../../../ui/DifficultyInput';
import ProgramInput from './ProgramInput';

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

function CreateTourForm({ onClose, tourToEdit = {} }) {
  const {
    _id: editId,
    images,
    imageCover,
    ...editValues
  } = tourToEdit;

  const isEditSession = Boolean(editId);

  const [duration, setDuration] = useState(tourToEdit.duration || '');
  const { users: leadGuides } = useUserRole('lead-guide');
  const { users: guides } = useUserRole('guide');

  const {
    register,
    handleSubmit,
    reset,
    formState,
    resetField,
    control,
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  const { errors } = formState;

  const { isCreating, mutateCreate } = useCreateTour();
  const { isEditing, mutateEdit } = useEditTour();

  const isWorking = isCreating || isEditing;

  async function onSubmit(data) {
    const newData = {
      ...data,
      guides: data.guides.map((guide) => guide._id),
      startDates: data.startDate ? [data.startDate] : data.startDates,
      imageCover: data.imageCover[0],
    };

    if (isEditSession) {
      mutateEdit(
        { newData, editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      mutateCreate(newData, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    }
  }

  function onError(errors, data) {
    console.log(errors);
  }

  function handleDurationChange(e, field) {
    if (e.target.value === '') setDuration(e.target.value);
    const duration = parseInt(e.target.value);

    if (duration <= MAX_DURATION && duration >= 0) {
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
      <StyledH1>
        {isEditSession ? 'Edit tour' : 'Create new tour'}
      </StyledH1>

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
            disabled={isWorking}
          />
        </CreateTourFormRow>
        <CreateTourFormRow
          label="Difficulty"
          name="difficulty"
          required={true}
          errors={errors}
        >
          <DifficultyInput
            disabled={isWorking}
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
            disabled={isWorking}
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
            disabled={isWorking}
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
            defaultValue={tourToEdit.duration}
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
                disabled={isWorking}
                id="input-tour-duration"
                value={duration}
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
                disabled={isWorking}
                size="small"
                sx={{ width: '50%' }}
                onChange={(date) => field.onChange(date)}
                value={
                  isEditSession
                    ? dayjs(tourToEdit?.startDates[0])
                    : null
                }
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
                disabled={isWorking}
                defaultValue={tourToEdit.startLocation}
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
            multiline={true}
            minRows={2}
            maxRows={5}
            disabled={isWorking}
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
            disabled={isWorking}
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
            rules={{
              required: isEditSession
                ? false
                : 'This field is required',
            }}
            render={({ field, formState }) => (
              <FileUploadInput
                disabled={isWorking}
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
            defaultValue={tourToEdit.guides || []}
            render={({ field, formState }) => (
              <GuidesSelect
                disabled={isWorking}
                guides={guides}
                leadGuides={leadGuides}
                field={field}
                formState={formState}
                defaultValue={tourToEdit.guides}
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
                disabled={isWorking}
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
          <ProgramProvider defaultValue={tourToEdit.program}>
            <Controller
              control={control}
              name="program"
              render={({ field }) => (
                <ProgramInput
                  disabled={isWorking}
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
            onClick={() => onClose?.()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            size="large"
            style={{ width: '150px' }}
            disabled={isWorking}
          >
            {isEditSession ? 'Save changes' : 'Create tour'}
          </Button>
        </Box>
      </StyledForm>
    </Paper>
  );
}

export default CreateTourForm;
