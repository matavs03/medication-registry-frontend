import { AdminRole } from './admin';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  role: AdminRole
  expiresAt: string;
}
