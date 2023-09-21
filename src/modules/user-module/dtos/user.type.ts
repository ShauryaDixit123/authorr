export type User = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  role_id: number;
  role?: string;
  is_author: boolean;
  book_url?: string;
};
