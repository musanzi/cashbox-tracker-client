import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransactionsService } from '../../data-access/transactions.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [TransactionsService],
  selector: 'app-add-transaction',
  templateUrl: './delete-transaction.component.html'
})
export class DeleteTransactionComponent {
  transaction = inject<string>(MAT_DIALOG_DATA);
  delete$: Observable<IAPIResponse<void>>;
  #dialogRef = inject(MatDialogRef<DeleteTransactionComponent>);
  #transactionsService = inject(TransactionsService);

  onDelete(): void {
    this.delete$ = this.#transactionsService.delete(this.transaction['id']);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
