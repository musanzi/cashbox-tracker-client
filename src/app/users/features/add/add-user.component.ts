import { Component, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../data-access/users.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IUser } from '../../../shared/utils/types/models.type';
import { ERole } from '../../../shared/utils/enums/role.enum';
import { getEnumValues } from '../../../shared/helpers/enum-array.fn';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [UsersService],
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  #dialogRef = inject(MatDialogRef<AddUserComponent>);
  #transactionsService = inject(UsersService);
  #fb = inject(FormBuilder);
  addForm: FormGroup;
  add$: Observable<IAPIResponse<IUser>>;
  roles = signal<string[]>(getEnumValues(ERole));

  constructor() {
    this.addForm = this.#fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onAdd(): void {
    this.add$ = this.#transactionsService.add(this.addForm.value);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
