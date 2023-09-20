import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { TextField } from '@mui/material';
import { useUpdatePassword } from './useUpdatePassword';
import PasswordInput from '../../ui/PasswordInput';
import Form from '../../ui/Form';

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    resetField,
    control,
    setValue,
    getValues,
  } = useForm({});

  const { isEditing, updatePassword } = useUpdatePassword();

  const { errors } = formState;

  async function onSubmit(data) {
    updatePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      label={''}
      buttonLabel={'Save password'}
      buttonDisabled={isEditing}
      onSubmit={handleSubmit(onSubmit, onError)}
      onClose={reset}
    >
      <FormRow
        label="Password old"
        name="passwordOld"
        required={false}
      >
        <PasswordInput
          disabled={isEditing}
          registerObj={register('passwordOld')}
          style={{ width: '50%' }}
          size="small"
        ></PasswordInput>
      </FormRow>

      <FormRow
        label="New password "
        name="passwordNew"
        required={false}
        errors={errors}
      >
        <PasswordInput
          disabled={isEditing}
          registerObj={register('passwordNew')}
          style={{ width: '50%' }}
          size="small"
        ></PasswordInput>
      </FormRow>

      <FormRow
        label="Confirm new password"
        name="passwordConfirm"
        required={false}
        errors={errors}
      >
        <PasswordInput
          disabled={isEditing}
          registerObj={register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().passwordNew === value ||
              'Passwords need to match',
          })}
          style={{ width: '50%' }}
          size="small"
        ></PasswordInput>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
