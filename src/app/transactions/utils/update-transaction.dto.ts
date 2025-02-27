import { ETransactionCategory } from '../../shared/utils/types/models.type';

export interface UpdateTransactionDto {
  amount: number;
  to: string;
  category: ETransactionCategory;
  label: string;
}
