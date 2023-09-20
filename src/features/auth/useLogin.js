import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      loginAPI({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.data.data.user);
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong'
      );
    },
  });

  return { login, isLoading };
}
