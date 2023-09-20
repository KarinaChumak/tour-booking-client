import { Controller, useForm } from 'react-hook-form';
import FormRow from '../../../ui/FormRow';
import {
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import Form from '../../../ui/Form';
import PhoneInput from '../../../ui/PhoneInput';
import FileUploadInput from '../../../ui/FileUploadInput';

import { useCreateUser } from './useCreateUser';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordInput from '../../../ui/PasswordInput';
import { useEditUser } from './useEditUser';
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function CreateUserForm({ onClose, userToEdit = {} }) {
  const { _id: editId, name, email, role, phone } = userToEdit;

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    resetField,
    control,
  } = useForm({
    defaultValues: isEditSession ? { name, email, role, phone } : {},
  });

  const { isCreating, mutateCreate } = useCreateUser();
  const { isEditing, mutateEdit } = useEditUser();

  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  async function onSubmit(data) {
    if (isEditSession) {
      mutateEdit(
        { newData: data, editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      mutateCreate(data, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    }
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      label={isEditSession ? 'Edit user' : 'Create new user'}
      buttonLabel={isEditSession ? 'Save changes' : 'Create user'}
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
          id="input-user-name"
          {...register('name', {
            required: 'This field is required',
          })}
          size="small"
          sx={{ width: '50%' }}
        />
      </FormRow>

      <FormRow
        label="Email"
        name="email"
        required={true}
        errors={errors}
      >
        <TextField
          id="input-email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter a valid email',
            },
          })}
          size="small"
          sx={{ width: '50%' }}
        />
      </FormRow>

      <FormRow
        label="Phone"
        name="phone"
        required={true}
        errors={errors}
      >
        <Controller
          control={control}
          name="phone"
          rules={{
            required: 'This field is required',
            minLength: {
              value: 7,
              message: 'This field is required',
            },
          }}
          render={({ field }) => (
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
            ></PhoneInput>
          )}
        ></Controller>
      </FormRow>

      <FormRow
        label="Role"
        name="role"
        required={true}
        errors={errors}
      >
        <Controller
          control={control}
          name="role"
          rules={{
            required: 'This field is required',
          }}
          render={({ field }) => (
            <Select
              id="input-user-role"
              size="small"
              defaultValue={field.value}
              onChange={field.onChange}
              sx={{
                width: '50%',
                maxHeight: '50px',
                textAlign: 'left',
              }}
            >
              <MenuItem value={'guide'}>Guide</MenuItem>
              <MenuItem value={'lead-guide'}>Lead guide</MenuItem>
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'user'}>User</MenuItem>
            </Select>
          )}
        ></Controller>
      </FormRow>

      {!isEditSession && (
        <FormRow
          label="Temporary password"
          name="tmpPassword"
          required={true}
          errors={errors}
        >
          <PasswordInput
            registerObj={register('tmpPassword', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'PAssword should me minimum 8 character',
              },
            })}
          ></PasswordInput>
        </FormRow>
      )}
    </Form>
  );
}

export default CreateUserForm;
