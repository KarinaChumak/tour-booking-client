import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';

function AdminRouter() {
  return (
    <Routes>
      <Route
        path="login"
        element={<h1> hello from admin router</h1>}
      ></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}

export default AdminRouter;
