import { ETransactionCategory } from '../../shared/utils/enums/transaction.enum';

export interface UpdateTransactionDto {
  amount: number;
  to: string;
  category: ETransactionCategory;
  label: string;
}
