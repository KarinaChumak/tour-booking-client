// import { ColorModeContext, useMode } from '../theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

// npm uninstall @mui/material @mui/joy @emotion/react @emotion/styled
// npm install @mui/material @mui/joy @emotion/react @emotion/styled
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { colors, theme } from '../theme';
import AppRouter from './routers/AppRouter';

import AdminRouter from './routers/AdminRouter';

import NotificationsToaster from './ui/NotificationsToaster';
const appMode = import.meta.env.VITE_APP_MODE;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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

      <NotificationsToaster></NotificationsToaster>
    </QueryClientProvider>
  );
}

export default App;
