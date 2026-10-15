export type AdminRole = 'SUPER_ADMIN' | 'ADMIN';

export interface AdminView {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: AdminRole;
  active: boolean;
}

export interface CreateAdminRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
