import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransactionsService } from '../../data-access/transactions.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../../shared/ui/alert/alert.component';
import { Animations } from '../../../shared/utils/animations';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinner, AlertComponent],
  animations: Animations,
  providers: [TransactionsService],
  selector: 'app-add-cashbox',
  templateUrl: './delete-transaction.component.html'
})
export class DeleteCashboxComponent {
  transaction = inject<string>(MAT_DIALOG_DATA);
  delete$: Observable<IAPIResponse<void>>;
  #dialogRef = inject(MatDialogRef<DeleteCashboxComponent>);
  #transactionsService = inject(TransactionsService);

  onDelete(): void {
    this.delete$ = this.#transactionsService.delete(this.transaction['id']);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
