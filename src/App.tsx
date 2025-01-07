import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthGuard } from './foundation/components/AuthGuard';
import { Login } from './foundation/pages/Login';
import { Home } from './foundation/pages/Home';
import { routes } from './foundation/config/routes';
import { appConfig } from './foundation/config/appConfig';
import React from 'react';
import { LoadingSpinner } from './foundation/components';

const modules = {
  promarker: () => import('./apps/promarker/pages/ProMarker'),
  apprunner: () => import('./apps/apprunner/pages/AppRunner'),
} as const;

type ModuleKeys = keyof typeof modules;

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
        {routes.map(route => {
          const Component = React.lazy(modules[route.name as ModuleKeys]);
          return (
            <Route
              key={route.name}
              path={route.path}
              element={
                <AuthGuard>
                  <React.Suspense fallback={<LoadingSpinner />}>
                    <Component />
                  </React.Suspense>
                </AuthGuard>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};