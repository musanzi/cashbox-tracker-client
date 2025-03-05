import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransactionsService } from '../../data-access/transactions.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ETransactionCategory, getEnumValues, ICashbox, ITransaction } from '../../../shared/utils/types/models.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [TransactionsService],
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html'
})
export class EditTransactionComponent implements OnInit, OnDestroy {
  transactionId = inject<string>(MAT_DIALOG_DATA);
  editForm: FormGroup;
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;
  update$: Observable<IAPIResponse<ITransaction>>;
  transaction$: Observable<IAPIResponse<ITransaction>>;
  transactionCategories = getEnumValues(ETransactionCategory);
  #dialogRef = inject(MatDialogRef<EditTransactionComponent>);
  #transactionsService = inject(TransactionsService);
  #subscription = new Subscription();
  #fb = inject(FormBuilder);

  constructor() {
    this.editForm = this.#fb.group({
      amount: ['', Validators.required],
      cashbox: ['', Validators.required],
      category: ['', Validators.required],
      label: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cashboxes$ = this.#transactionsService.getCashboxes();
    this.transaction$ = this.#transactionsService.getOne(this.transactionId);
    this.#subscription = this.transaction$.subscribe(({ data }) => {
      this.editForm.patchValue({
        amount: data?.amount,
        cashbox: data?.cashbox?.id,
        category: data?.category,
        label: data?.label
      });
    });
  }

  onUpdate(): void {
    this.update$ = this.#transactionsService.update(this.transactionId, this.editForm.value);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.#subscription) this.#subscription.unsubscribe();
  }
}
