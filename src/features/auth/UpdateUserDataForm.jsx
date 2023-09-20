import { TextField } from '@mui/material';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import { useCurrentUser } from './useCurrentUser';
import { Controller, useForm } from 'react-hook-form';
import { useEditUser } from '../admin/users/useEditUser';
import FileUploadInput from '../../ui/FileUploadInput';
import { useUpdateMe } from './useUpdateMe';
import { useState } from 'react';

function UpdateUserDataForm() {
  const { isLoading, user, errors } = useCurrentUser();
  const { name, email, id: editId } = user;

  const {
    register,
    handleSubmit,
    reset,
    formState,
    resetField,
    control,
    setValue,
  } = useForm({
    defaultValues: { name, email },
  });

  const { isEditing, updateMe } = useUpdateMe();

  async function onSubmit(data) {
    const newData = {
      ...(data.name && data.name !== name && { name: data.name }),
      ...(data.photo &&
        data.photo?.length > 0 && { photo: data.photo[0] }),
    };

    if (Object.keys(newData).length > 0) {
      updateMe(newData, {
        onSuccess: () => {
          reset({ keepDefaultValues: false });
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      label={''}
      buttonLabel={'Save changes'}
      buttonDisabled={isEditing}
      onSubmit={handleSubmit(onSubmit, onError)}
      onClose={reset}
    >
      <FormRow label="Email" name="email" required={false}>
        <TextField
          id="input-email"
          disabled={true}
          value={email}
          size="small"
          sx={{ width: '50%' }}
        />
      </FormRow>

      <FormRow
        label="Name"
        name="name"
        required={false}
        errors={errors}
      >
        <TextField
          id="input-user-name"
          {...register('name', {})}
          size="small"
          sx={{ width: '50%' }}
        />
      </FormRow>

      <FormRow
        label="Photo"
        name="photo"
        required={true}
        errors={errors}
      >
        <Controller
          control={control}
          name="photo"
          render={({ field, formState }) => (
            <FileUploadInput
              disabled={isEditing}
              field={field}
              formState={formState}
              resetFn={() => resetField('photo')}
            />
          )}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
