import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TransfersService } from '../../data-access/transfers.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox, ITransfer } from '../../../shared/utils/types/models.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [TransfersService],
  selector: 'app-add-transfer',
  templateUrl: './add-transfer.component.html'
})
export class AddTransferComponent implements OnInit {
  addForm: FormGroup;
  add$: Observable<IAPIResponse<ITransfer>>;
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;
  #dialogRef = inject(MatDialogRef<AddTransferComponent>);
  #transactionsService = inject(TransfersService);
  #fb = inject(FormBuilder);

  constructor() {
    this.addForm = this.#fb.group({
      amount: ['', Validators.required],
      label: ['', Validators.required],
      to: ['', Validators.required],
      from: ['', Validators.required]
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
