export type User = {
  id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  role_id: number;
  role?: string;
  is_author: boolean;
  book_url?: string;
  google_id?: string;
};

export type BookDTO = {
  id?: string;
  title?: string;
  description?: string;
  hosted_url?: string;
  author_id: string;
  isbn?: string;
};
