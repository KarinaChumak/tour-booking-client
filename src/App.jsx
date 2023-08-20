// import { ColorModeContext, useMode } from '../theme';
import { Button, CssBaseline, ThemeProvider } from '@mui/material';

import './App.css';
import { BrowserRouter } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from '../theme';
import AppRouter from './routers/AppRouter';
import isAdminSubdomain from '../utils/subdomain';
import AdminRouter from './routers/AdminRouter';

const appMode = import.meta.env.VITE_APP_MODE;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
});

function App() {
  console.log(appMode);
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>

          <BrowserRouter>
            {appMode === 'admin' ? (
              <AdminRouter></AdminRouter>
            ) : (
              <AppRouter></AppRouter>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
