import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CashboxesService } from '../../data-access/cashboxes.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../../shared/ui/alert/alert.component';
import { Animations } from '../../../shared/utils/animations';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinner, AlertComponent],
  animations: Animations,
  providers: [CashboxesService],
  selector: 'app-add-cashbox',
  templateUrl: './delete-cashbox.component.html'
})
export class DeleteCashboxComponent {
  cashbox = inject<string>(MAT_DIALOG_DATA);
  delete$: Observable<IAPIResponse<void>>;
  #dialogRef = inject(MatDialogRef<DeleteCashboxComponent>);
  #cashboxesService = inject(CashboxesService);

  onDelete(): void {
    this.delete$ = this.#cashboxesService.deleteCashbox(this.cashbox['id']);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
