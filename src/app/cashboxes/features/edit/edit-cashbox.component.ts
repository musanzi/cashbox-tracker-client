import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CashboxesService } from '../../data-access/cashboxes.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox, IUser } from '../../../shared/utils/types/models.type';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Animations } from '../../../shared/utils/animations';
import { AlertComponent } from '../../../shared/ui/alert/alert.component';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinner, AlertComponent],
  animations: Animations,
  providers: [CashboxesService],
  selector: 'app-edit-cashbox',
  templateUrl: './edit-cashbox.component.html'
})
export class EditCashboxComponent implements OnInit, OnDestroy {
  cashboxId = inject<string>(MAT_DIALOG_DATA);
  editForm: FormGroup;
  cashiers$: Observable<IAPIResponse<IUser[]>>;
  update$: Observable<IAPIResponse<ICashbox>>;
  cashbox$: Observable<IAPIResponse<ICashbox>>;
  #dialogRef = inject(MatDialogRef<EditCashboxComponent>);
  #cashboxesService = inject(CashboxesService);
  #subscription = new Subscription();
  #fb = inject(FormBuilder);

  constructor() {
    this.editForm = this.#fb.group({
      name: ['', Validators.required],
      balance: ['', Validators.required],
      cashier: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cashiers$ = this.#cashboxesService.getCahiers();
    this.cashbox$ = this.#cashboxesService.getCashbox(this.cashboxId);
    this.#subscription = this.cashbox$.subscribe(({ data }) => {
      this.editForm.patchValue({
        name: data?.name,
        balance: data?.balance,
        cashier: data?.cashier?.id
      });
    });
  }

  onUpdate(): void {
    this.update$ = this.#cashboxesService.updateCashbox(this.cashboxId, this.editForm.value);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.#subscription) this.#subscription.unsubscribe();
  }
}
