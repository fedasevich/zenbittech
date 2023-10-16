import { Navigate, Route, Routes } from 'react-router-dom';
import { MAIN_ROUTE } from '../libs/constants/routes';
import { publicRoutes } from '../routes';

function AppRouter() {
  return (
    <>
      <Routes>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
      </Routes>
    </>
  );
}

export default AppRouter;
