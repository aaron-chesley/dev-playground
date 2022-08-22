export interface ServerLoginToken {
  refresh: string;
  access: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PasswordResetInstructionsPayload {
  email: string;
}

export interface PasswordResetPayload {
  new_password: string;
  new_password_confirm: string;
}

export interface AuthUser {
  url: string;
  id: string;
  date_hired: string;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  tenant: any;
  teams: any[];
  manager_of: any[];
}
