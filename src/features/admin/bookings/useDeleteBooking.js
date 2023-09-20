import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOneBooking } from '../../../services/bookingService';
import { toast } from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation(
    {
      mutationFn: (id) => deleteOneBooking(id),

      // Clearing cache to refetch the data after deletion
      onSuccess: () => {
        toast.success('Booking successfully deleted');
        queryClient.invalidateQueries({ queryKey: 'tours' });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isDeleting, mutateDelete };
}
