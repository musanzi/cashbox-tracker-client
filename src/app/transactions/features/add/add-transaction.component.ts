import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransactionsService } from '../../data-access/transactions.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ETransactionCategory, getEnumValues, ICashbox, ITransaction } from '../../../shared/utils/types/models.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [TransactionsService],
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html'
})
export class AddTransactionComponent implements OnInit {
  addForm: FormGroup;
  add$: Observable<IAPIResponse<ITransaction>>;
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;
  transactionCategories = signal<string[]>(getEnumValues(ETransactionCategory));
  #dialogRef = inject(MatDialogRef<AddTransactionComponent>);
  #transactionsService = inject(TransactionsService);
  #fb = inject(FormBuilder);

  constructor() {
    this.addForm = this.#fb.group({
      amount: ['', Validators.required],
      label: ['', Validators.required],
      category: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cashboxes$ = this.#transactionsService.getCashboxes();
  }

  onAdd(): void {
    this.add$ = this.#transactionsService.add(this.addForm.value);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
