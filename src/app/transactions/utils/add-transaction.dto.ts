import { ETransactionCategory } from '../../shared/utils/enums/transaction.enum';

export interface AddTransactionDto {
  amount: number;
  category: ETransactionCategory;
  label: string;
  cashbox: string;
}
