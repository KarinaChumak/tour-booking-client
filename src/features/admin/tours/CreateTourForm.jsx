import { styled } from '@mui/system';

import { DatePicker } from '@mui/x-date-pickers';

import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createOneTour } from '../../../services/tourService';
import { colors } from '../../../../theme';
import { useUserRole } from '../users/useUsers';
import GuidesSelect from '../../../ui/GuidesSelect';
import FileUploadInput from '../../../ui/FileUploadInput';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledH1 = styled('h1')`
  text-align: left;
`;

const StyledInputLabel = styled(InputLabel)`
  padding-left: 10px;
  font-size: 1rem;
  color: ${colors.grey[800]};
`;

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: start;
  row-gap: 15px;
`;

const StyledInputDiv = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

const StyledError = styled('p')`
  background-color: ${colors.red[100]};
  color: ${colors.red[600]};
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
`;
function CreateTourForm() {
  const {
    isLoading,
    error,
    users: leadGuides,
  } = useUserRole('lead-guide');
  const {
    isLoading: guidesLoading,
    error: guidesError,
    users: guides,
  } = useUserRole('guide');

  const [value, setValue] = useState(null);
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

  function onSubmit(data) {
    console.log(data);
    // mutate({
    //   ...data,
    //   imageCover: data.imageCover[0],
    //   tourGuides: data.tourGuides.map((guide) => guide._id),
    // });
  }

  function onError(errors, data) {
    console.log(errors);
    console.log(data);
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
        <StyledInputLabel htmlFor="input-tour-name">
          Name
        </StyledInputLabel>
        <StyledInputDiv>
          <TextField
            id="input-tour-name"
            {...register('name', {
              required: 'This field is required',
            })}
            size="small"
            sx={{ width: '50%' }}
          />
          {errors?.name?.message && (
            <StyledError>{errors?.name?.message}</StyledError>
          )}
        </StyledInputDiv>
        <StyledInputLabel htmlFor="input-tour-startDate">
          Start date
        </StyledInputLabel>
        <StyledInputDiv>
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

          {errors?.startDate?.message && (
            <StyledError>{errors?.startDate?.message}</StyledError>
          )}
        </StyledInputDiv>
        <StyledInputLabel htmlFor="input-tour-duration">
          Duration (days)
        </StyledInputLabel>
        <StyledInputDiv>
          <TextField
            id="input-tour-duration"
            {...register('duration', {
              required: 'This field is required',
              min: {
                value: 1,
                message: `Tour duration should be at least 1 day`,
              },
              max: {
                value: 30,
                message: `Tour duration should be no more than 30 days`,
              },
            })}
            size="small"
            sx={{ width: '50%', maxHeight: '50px' }}
          />
          {errors?.duration?.message && (
            <StyledError>{errors?.duration?.message}</StyledError>
          )}
        </StyledInputDiv>
        <StyledInputLabel htmlFor="input-tour-maxGroup">
          Max group size
        </StyledInputLabel>
        <StyledInputDiv>
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
          {errors?.maxGroupSize?.message && (
            <StyledError>{errors?.maxGroupSize?.message}</StyledError>
          )}
        </StyledInputDiv>
        <StyledInputLabel htmlFor="input-tour-difficulty">
          Difficulty
        </StyledInputLabel>
        <StyledInputDiv>
          <TextField
            select
            id="input-tour-difficulty"
            {...register('difficulty', {
              required: 'This field is required',
            })}
            size="small"
            defaultValue={'easy'}
            sx={{
              width: '50%',
              maxHeight: '50px',
              textAlign: 'left',
            }}
          >
            <MenuItem value={'easy'}>easy</MenuItem>
            <MenuItem value={'medium'}>medium</MenuItem>
            <MenuItem value={'difficult'}>difficult</MenuItem>
          </TextField>
          {errors?.difficulty?.message && (
            <StyledError>{errors?.difficulty?.message}</StyledError>
          )}
        </StyledInputDiv>
        <StyledInputLabel htmlFor="input-tour-price">
          Price
        </StyledInputLabel>
        <StyledInputDiv>
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

          {errors?.price?.message && (
            <StyledError>{errors?.price?.message}</StyledError>
          )}
        </StyledInputDiv>{' '}
        <StyledInputLabel htmlFor="input-tour-summary">
          Summary
        </StyledInputLabel>
        <StyledInputDiv>
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
          {errors?.summary?.message && (
            <StyledError>{errors?.summary?.message}</StyledError>
          )}
        </StyledInputDiv>
        <StyledInputLabel htmlFor="input-tour-description">
          Description
        </StyledInputLabel>
        <StyledInputDiv>
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
          {errors?.description?.message && (
            <StyledError>{errors?.description?.message}</StyledError>
          )}
        </StyledInputDiv>
        <StyledInputLabel htmlFor="input-tour-imageCover">
          Cover image
        </StyledInputLabel>
        <StyledInputDiv>
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

          {errors?.imageCover?.message && (
            <StyledError>{errors?.imageCover?.message}</StyledError>
          )}
        </StyledInputDiv>
        {/* Tour guides */}
        <StyledInputLabel htmlFor="input-tour-guides">
          Tour guides
        </StyledInputLabel>
        <StyledInputDiv>
          <Controller
            control={control}
            name="tourGuides"
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

          {errors?.guides?.message && (
            <StyledError>{errors?.guides?.message}</StyledError>
          )}
        </StyledInputDiv>{' '}
        {/*  */}
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

function TmpInput({ registerObj }) {
  console.log({ registerObj });
  return <input type="file" {...registerObj}></input>;
}
