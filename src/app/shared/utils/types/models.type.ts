export enum ETransactionCategory {
  EXTERNAL_DEPOSIT = 'Dépôt Externe',
  SALES_REVENUE = 'Revenus des Ventes',
  LOAN = 'Emprunt Reçu',
  INVESTMENT = 'Investissement',
  GRANT = 'Subvention',
  BUYING = 'Achat',
  PAYING_FEES = 'Paiement de Frais',
  SALARY = 'Paiement des Salaires',
  RENT = 'Paiement du Loyer',
  UTILITIES = 'Factures (Électricité, Eau, Internet)',
  TRANSPORT = 'Transport',
  TAXES = 'Impôts',
  MAINTENANCE = 'Entretien et Réparations',
  DEBT_REPAYMENT = 'Remboursement de Dette',
  DONATION = 'Don'
}
export const getEnumValues = <T extends object>(enumObj: T): string[] => Object.values(enumObj);

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

export interface ITransaction extends IBase {
  amount: number;
  category: ETransactionCategory;
  label: string;
  cashbox: ICashbox;
  by: IUser;
}
