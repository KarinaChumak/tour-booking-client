import { Toaster } from 'react-hot-toast';
import { colors } from '../../theme';

function NotificationsToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ borderRadius: '10px', margin: '8px' }}
      toastOptions={{
        success: {
          duration: 3000,
          iconTheme: {
            primary: colors.green[700],
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: colors.red[600],
          },
        },
      }}
      style={{
        fontSize: '16px',
        maxWidth: '500px',
        padding: '16px 24px',
        backgroundColor: colors.grey[100],
        color: colors.grey[700],
      }}
    ></Toaster>
  );
}

export default NotificationsToaster;
