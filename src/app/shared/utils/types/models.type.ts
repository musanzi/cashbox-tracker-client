interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ICashbox extends IBase {
  name: string;
  balance: number;
  user: IUser;
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  profile: string;
  roles: string;
}
