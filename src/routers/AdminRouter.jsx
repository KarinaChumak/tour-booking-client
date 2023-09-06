import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import AdminLayout from '../pages/admin/AdminLayout';

import Login from '../pages/Login';
import Dashboard from '../features/Admin/dashboard/Dashboard';
import AdminBookings from '../pages/Admin/AdminBookings';
import AdminTours from '../pages/Admin/AdminTours';
import AdminUsers from '../pages/admin/AdminUsers';

function AdminRouter() {
  return (
    <Routes>
      <Route element={<AdminLayout></AdminLayout>}>
        <Route
          index
          element={<Navigate replace to="dashboard"></Navigate>}
        ></Route>
        <Route
          path="dashboard"
          element={<Dashboard></Dashboard>}
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

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Route>
    </Routes>
  );
}

export default AdminRouter;
