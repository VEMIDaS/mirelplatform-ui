export interface AuthUser {
  username: string;
  roles: string[];
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}