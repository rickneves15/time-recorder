type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  identification_number: string;
  birthday: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  manager_id: null | number;
};

type Address = {
  id: number;
  user_id: number;
  cep: string;
  street: string;
  number: number;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
};

type Role = {
  id: number;
  name: string;
};

type RecordPoint = {
  id: number;
  name: string;
  role: string;
  manager: string;
  age: string;
  register_point_date_time: string;
};

type RecordPointsData = {
  startDate: string;
  endDate: string;
};

type SignInResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
};

type SignInData = {
  email: string;
  password: string;
};

type UsersResponse = User & {
  address: Address;
  role: Role;
  manager: User;
};

type UsersCreate = User & {
  address: Address;
};

type AddressResponse = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

type changePasswordData = {
  current_password: string;
  password: string;
  password_confirmation: string;
};
