import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOneTour } from '../../../services/tourService';

export function useCreateTour() {
  const queryClient = useQueryClient();

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation(
    {
      mutationFn: createOneTour,
      onSuccess: () => {
        toast.success('New tour successfully created');
        queryClient.invalidateQueries({ queryKey: ['tours'] });
      },
      onError: () => {
        toast.error(`Couldn't create a new tour`);
      },
    }
  );

  return { isCreating, mutateCreate };
}
