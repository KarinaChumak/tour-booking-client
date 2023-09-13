import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOneTour } from '../../../services/tourService';
import { toast } from 'react-hot-toast';

export function useDeleteTour() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation(
    {
      mutationFn: (id) => deleteOneTour(id),

      // Clearing cache to refetch the data after deletion
      onSuccess: () => {
        toast.success('Tour successfully deleted');
        queryClient.invalidateQueries({ queryKey: 'tours' });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isDeleting, mutateDelete };
}
