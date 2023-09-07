import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import AdminLayout from '../pages/admin/AdminLayout';

import Login from '../pages/Login';
// import Dashboard from '../features/admin/dashboard/Dashboard';
import AdminBookings from '../pages/admin/AdminBookings';
import AdminTours from '../pages/admin/adminTours';
import AdminUsers from '../pages/admin/adminUsers';

function AdminRouter() {
  return (
    <Routes>
      <Route element={<AdminLayout></AdminLayout>}>
        <Route
          index
          element={<Navigate replace to="dashboard"></Navigate>}
        ></Route>
        <Route path="dashboard" element={<p></p>}></Route>
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
