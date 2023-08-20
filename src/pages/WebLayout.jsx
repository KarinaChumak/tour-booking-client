import { Outlet } from 'react-router-dom';

function WebLayout() {
  return (
    <div>
      <Outlet></Outlet>
      {/* Footer */}
    </div>
  );
}

export default WebLayout;
