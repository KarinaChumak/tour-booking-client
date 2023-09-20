import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOneUser } from '../../../services/userService';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation(
    {
      mutationFn: createOneUser,
      onSuccess: () => {
        toast.success('New user successfully created');
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: () => {
        toast.error(`Couldn't create a new user`);
      },
    }
  );

  return { isCreating, mutateCreate };
}
