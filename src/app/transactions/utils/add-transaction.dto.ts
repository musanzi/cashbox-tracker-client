import { ETransactionCategory } from '../../shared/utils/types/models.type';

export interface AddTransactionDto {
  amount: number;
  category: ETransactionCategory;
  label: string;
  to: string;
}
