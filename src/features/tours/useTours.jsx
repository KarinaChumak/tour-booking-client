import { useQuery } from '@tanstack/react-query';
import { getTours } from '../../services/tourService';

export default function useTours() {
  const {
    isLoading,
    data: tours,
    error,
  } = useQuery({ queryKey: ['tours'], queryFn: getTours });

  return { isLoading, error, tours };
}
