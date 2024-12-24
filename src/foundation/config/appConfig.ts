export interface AppConfig {
  basePath: string;
  api: {
    base: string;
    target: string;
  };
}

export const appConfig: AppConfig = {
  basePath: process.env.REACT_APP_BASE_PATH ?? '/mirel',
  api: {
    base: process.env.REACT_APP_API_BASE ?? '/mirel/mapi',
    target: process.env.REACT_APP_API_TARGET ?? 'http://localhost:8080/mipla2/',
  }
} as const;
