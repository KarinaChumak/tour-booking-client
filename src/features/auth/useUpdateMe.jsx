import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateMe as updateMeAPI } from '../../services/userService';

export function useUpdateMe() {
  const queryClient = useQueryClient();

  const { mutate: updateMe, isLoading: isEditing } = useMutation({
    mutationFn: (newData) => updateMeAPI(newData),
    onSuccess: () => {
      toast.success('User successfully updated');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast.error(`Couldn't update user`);
    },
  });

  return { isEditing, updateMe };
}
