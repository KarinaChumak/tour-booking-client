import { useQuery } from '@tanstack/react-query';
import { getOneTour } from '../../services/tourService';
import { useParams } from 'react-router-dom';

export default function useTour() {
  const { slug } = useParams();
  const {
    isLoading,
    data: tour,
    error,
  } = useQuery({
    queryKey: ['tour', slug],
    queryFn: () => getOneTour(slug),
  });

  return { isLoading, error, tour };
}
