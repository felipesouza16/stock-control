export type LoginFields = {
  username?: string;
  password?: string;
};

export type SignUpFields = {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
};

export type CreateProduct = {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
};

export type Product = {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  _id?: string;
};
