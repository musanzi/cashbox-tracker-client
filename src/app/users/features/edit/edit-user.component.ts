import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../data-access/users.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IUser } from '../../../shared/utils/types/models.type';
import { getEnumValues } from '../../../shared/helpers/enum-array.fn';
import { ERole } from '../../../shared/utils/enums/role.enum';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [UsersService],
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit, OnDestroy {
  userID = inject<string>(MAT_DIALOG_DATA);
  editForm: FormGroup;
  update$: Observable<IAPIResponse<IUser>>;
  user$: Observable<IAPIResponse<IUser>>;
  roles = signal<string[]>(getEnumValues(ERole));
  #dialogRef = inject(MatDialogRef<EditUserComponent>);
  #usersService = inject(UsersService);
  #subscription = new Subscription();
  #fb = inject(FormBuilder);

  constructor() {
    this.editForm = this.#fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user$ = this.#usersService.getOne(this.userID);
    this.#subscription = this.user$.subscribe(({ data }) => {
      this.editForm.patchValue({
        email: data?.email,
        name: data?.name,
        phone_number: data?.phone_number,
        role: data?.role
      });
    });
  }

  onUpdate(): void {
    this.update$ = this.#usersService.update(this.userID, this.editForm.value);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.#subscription) this.#subscription.unsubscribe();
  }
}
