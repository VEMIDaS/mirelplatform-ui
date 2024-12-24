import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthGuard } from './foundation/components/AuthGuard';
import { Login } from './foundation/pages/Login';
import { Home } from './foundation/pages/Home';
import ProMarker from './apps/promarker/pages/ProMarker';
import { appConfig } from './foundation/config/appConfig';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={appConfig.basePath}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        } />
        <Route path="/promarker" element={
          <AuthGuard>
            <ProMarker />
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  );
};