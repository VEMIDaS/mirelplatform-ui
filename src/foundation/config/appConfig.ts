export interface AppConfig {
  basePath: string;
  auth: {
    enabled: boolean;
  };
  api: {
    target: string;
  };
}

export const appConfig: AppConfig = {
  basePath: process.env.REACT_APP_BASE_PATH ?? '/mirel',
  auth: {
    enabled: process.env.REACT_APP_AUTH_ENABLED === 'true',
  },
  api: {
    target: process.env.REACT_APP_API_TARGET ?? 'http://localhost:8080/mipla2',
  }
} as const;
