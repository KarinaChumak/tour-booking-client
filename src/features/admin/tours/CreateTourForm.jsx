import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

import { useUserRole } from '../users/useUsers';
import { useCreateTour } from './useCreateTour';
import { useEditTour } from './useEditTour';
import { ProgramProvider } from '../../../contexts/ProgramContext';

import GuidesSelect from '../../../ui/GuidesSelect';
import FileUploadInput from '../../../ui/FileUploadInput';
import LocationAutocompleteInput from '../../../ui/LocationAutocompleteInput';
import FormRow from '../../../ui/FormRow';
import DifficultyInput from '../../../ui/DifficultyInput';
import ProgramInput from './ProgramInput';
import Form from '../../../ui/Form';

const MAX_DURATION = 30;

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
    <Form
      label={isEditSession ? 'Edit tour' : 'Create new tour'}
      buttonLabel={isEditSession ? 'Save changes' : 'Create tour'}
      buttonDisabled={isWorking}
      onSubmit={handleSubmit(onSubmit, onError)}
      onClose={onClose}
    >
      <FormRow
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
      </FormRow>
      <FormRow
        label="Difficulty"
        name="difficulty"
        required={true}
        errors={errors}
      >
        <Controller
          control={control}
          name="difficulty"
          rules={{
            required: 'This field is required',
          }}
          render={({ field }) => (
            <DifficultyInput
              field={field}
              disabled={isWorking}
            ></DifficultyInput>
          )}
        ></Controller>
      </FormRow>
      <FormRow
        label={'Max group size'}
        name="maxGroupSize"
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
      </FormRow>

      <FormRow
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
      </FormRow>
      <FormRow
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
      </FormRow>

      <FormRow label="Start date" name="startDate" errors={errors}>
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
      </FormRow>

      <FormRow
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
      </FormRow>

      <FormRow
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
      </FormRow>

      <FormRow
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
      </FormRow>

      <FormRow
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
      </FormRow>

      <FormRow label="Tour guides" name="guides" errors={errors}>
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
      </FormRow>

      <FormRow label="Tour images" name="images" errors={errors}>
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
      </FormRow>

      <FormRow label="Tour program" name="program" errors={errors}>
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
      </FormRow>
    </Form>
  );
}

export default CreateTourForm;
