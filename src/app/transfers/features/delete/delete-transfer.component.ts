import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransfersService } from '../../data-access/transfers.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [TransfersService],
  selector: 'app-add-transfer',
  templateUrl: './delete-transfer.component.html'
})
export class DeleteTransferComponent {
  transfer = inject<string>(MAT_DIALOG_DATA);
  delete$: Observable<IAPIResponse<void>>;
  #dialogRef = inject(MatDialogRef<DeleteTransferComponent>);
  #transactionsService = inject(TransfersService);

  onDelete(): void {
    this.delete$ = this.#transactionsService.delete(this.transfer['id']);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
