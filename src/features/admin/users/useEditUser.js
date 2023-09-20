import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editOneUser } from '../../../services/userService';

export function useEditUser() {
  const queryClient = useQueryClient();

  const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
    mutationFn: ({ newData: newUser, editId }) =>
      editOneUser(newUser, editId),
    onSuccess: () => {
      toast.success('User successfully updated');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error(`Couldn't update user`);
    },
  });

  return { isEditing, mutateEdit };
}
