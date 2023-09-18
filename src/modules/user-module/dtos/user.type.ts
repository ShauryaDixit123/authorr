export type User = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  role_id: number;
  is_active: boolean;
  role?: string;
  is_author?: boolean;
};
