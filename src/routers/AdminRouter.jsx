import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import AdminLayout from '../pages/admin/AdminLayout';

import Login from '../pages/Login';
import Dashboard from '../features/admin/dashboard/Dashboard';
import AdminBookings from '../pages/admin/AdminBookings';
import AdminTours from '../pages/admin/AdminTours';
import AdminUsers from '../pages/admin/AdminUsers';

import AdminBookingDetails from '../pages/admin/AdminBookingDetails';
import ProtectedRoute from '../ui/ProtectedRoute';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminAccount from '../pages/admin/AdminAccount';
import AdminDashboard from '../pages/admin/AdminDashboard';

function AdminRouter() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout></AdminLayout>
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate replace to="dashboard"></Navigate>}
        ></Route>
        <Route
          path="dashboard"
          element={<AdminDashboard></AdminDashboard>}
        ></Route>
        <Route
          path="bookings/:bookingId"
          element={<AdminBookingDetails></AdminBookingDetails>}
        ></Route>
        <Route
          path="bookings"
          element={<AdminBookings></AdminBookings>}
        ></Route>

        <Route
          path="tours"
          element={<AdminTours></AdminTours>}
        ></Route>

        <Route
          path="users"
          element={<AdminUsers></AdminUsers>}
        ></Route>

        <Route path="account" element={<AdminAccount />}></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Route>

      <Route
        path="login"
        element={<AdminLoginPage></AdminLoginPage>}
      ></Route>
    </Routes>
  );
}

export default AdminRouter;
