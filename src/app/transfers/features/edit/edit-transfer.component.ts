import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransfersService } from '../../data-access/transfers.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox, ITransfer } from '../../../shared/utils/types/models.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [TransfersService],
  selector: 'app-edit-transfer',
  templateUrl: './edit-transfer.component.html'
})
export class EditTransferComponent implements OnInit, OnDestroy {
  transferID = inject<string>(MAT_DIALOG_DATA);
  editForm: FormGroup;
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;
  update$: Observable<IAPIResponse<ITransfer>>;
  transaction$: Observable<IAPIResponse<ITransfer>>;
  #dialogRef = inject(MatDialogRef<EditTransferComponent>);
  #transactionsService = inject(TransfersService);
  #subscription = new Subscription();
  #fb = inject(FormBuilder);

  constructor() {
    this.editForm = this.#fb.group({
      amount: ['', Validators.required],
      label: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cashboxes$ = this.#transactionsService.getCashboxes();
    this.transaction$ = this.#transactionsService.getOne(this.transferID);
    this.#subscription = this.transaction$.subscribe(({ data }) => {
      this.editForm.patchValue({
        amount: data?.amount,
        label: data?.label,
        from: data?.from_cashbox?.id,
        to: data?.to_cashbox?.id
      });
    });
  }

  onUpdate(): void {
    this.update$ = this.#transactionsService.update(this.transferID, this.editForm.value);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.#subscription) this.#subscription.unsubscribe();
  }
}
