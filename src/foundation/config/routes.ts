export interface RouteConfig {
  path: string;
  name: string;
  label: string;
}

export const routes: RouteConfig[] = [
  {
    path: '/promarker',
    name: 'promarker',
    label: 'ProMarker'
  },
  {
    path: '/apprunner', 
    name: 'apprunner',
    label: 'AppRunner'
  }
];