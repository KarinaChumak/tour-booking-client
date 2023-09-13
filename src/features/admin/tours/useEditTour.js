import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editOneTour } from '../../../services/tourService';

export function useEditTour() {
  const queryClient = useQueryClient();

  const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
    mutationFn: ({ newData: newTour, editId }) =>
      editOneTour(newTour, editId),
    onSuccess: () => {
      toast.success('Tour successfully edited');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: () => {
      toast.error(`Couldn't edit a new tour`);
    },
  });

  return { isEditing, mutateEdit };
}
