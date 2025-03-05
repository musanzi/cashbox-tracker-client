import { ERole } from '../enums/role.enum';
import { ETransactionCategory } from '../enums/transaction.enum';

interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ICashbox extends IBase {
  name: string;
  balance: number;
  cashier: IUser;
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  role: ERole;
  profile?: string;
  cashboxes: ICashbox[];
}

export interface ITransaction extends IBase {
  amount: number;
  category: ETransactionCategory;
  label: string;
  cashbox: ICashbox;
  by: IUser;
}

export interface ITransfer extends IBase {
  amount: number;
  label?: string;
  from_cashbox: ICashbox;
  to_cashbox: ICashbox;
  by: IUser;
}
