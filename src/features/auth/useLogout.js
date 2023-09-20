import { useNavigate } from 'react-router-dom';
import { logout as logoutAPI } from '../../services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (data) => {
      toast.success('logged out');
      queryClient.removeQueries();
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { logout, isLoading };
}
