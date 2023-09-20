import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOneUser } from '../../../services/userService';
import { toast } from 'react-hot-toast';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation(
    {
      mutationFn: (id) => deleteOneUser(id),

      // Clearing cache to refetch the data after deletion
      onSuccess: () => {
        toast.success('Tour successfully deleted');
        queryClient.invalidateQueries({ queryKey: 'users' });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isDeleting, mutateDelete };
}
