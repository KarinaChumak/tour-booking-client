import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePassword as updatePasswordAPI } from '../../services/authService';
import { toast } from 'react-hot-toast';

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, isLoading: isEditing } =
    useMutation({
      mutationFn: (newData) => updatePasswordAPI(newData),
      onSuccess: () => {
        toast.success('Password successfully updated');
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
      onError: () => {
        toast.error(`Couldn't update password`);
      },
    });

  return { isEditing, updatePassword };
}
