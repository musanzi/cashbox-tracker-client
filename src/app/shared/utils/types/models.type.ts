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
  address: string;
  profile: string;
  role: string;
}

export enum TransactionTypeEnum {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
  Transfer = 'transfer'
}

export interface ITransaction extends IBase {
  amount: number;
  type: TransactionTypeEnum;
  from: ICashbox;
  to: ICashbox;
  by: IUser;
}
