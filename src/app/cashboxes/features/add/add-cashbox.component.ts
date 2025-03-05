import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CashboxesService } from '../../data-access/cashboxes.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox, IUser } from '../../../shared/utils/types/models.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [CashboxesService],
  selector: 'app-add-cashbox',
  templateUrl: './add-cashbox.component.html'
})
export class AddCashboxComponent implements OnInit {
  addForm: FormGroup;
  cashiers$: Observable<IAPIResponse<IUser[]>>;
  add$: Observable<IAPIResponse<ICashbox>>;
  #dialogRef = inject(MatDialogRef<AddCashboxComponent>);
  #cashboxesService = inject(CashboxesService);
  #fb = inject(FormBuilder);

  constructor() {
    this.addForm = this.#fb.group({
      name: ['', Validators.required],
      balance: ['', Validators.required],
      cashier: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cashiers$ = this.#cashboxesService.getCahiers();
  }

  onAdd(): void {
    this.add$ = this.#cashboxesService.addCashbox(this.addForm.value);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
