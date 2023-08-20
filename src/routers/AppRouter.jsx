import { Navigate, Route, Routes } from 'react-router-dom';
import WebLayout from '../pages/WebLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import TourPage from '../pages/TourPage';
import NotFound from '../pages/NotFound';

function AppRouter() {
  return (
    <Routes>
      <Route element={<WebLayout></WebLayout>}>
        <Route
          index
          element={<Navigate replace to="overview"></Navigate>}
        ></Route>
        <Route path="overview" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route
          path="tour/:slug"
          element={<TourPage></TourPage>}
        ></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
