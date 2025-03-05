import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../data-access/users.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';

@Component({
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  providers: [UsersService],
  selector: 'app-add-user',
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent {
  user = inject<string>(MAT_DIALOG_DATA);
  delete$: Observable<IAPIResponse<void>>;
  #dialogRef = inject(MatDialogRef<DeleteUserComponent>);
  #transactionsService = inject(UsersService);

  onDelete(): void {
    this.delete$ = this.#transactionsService.delete(this.user['id']);
  }

  closeModal(): void {
    this.#dialogRef.close();
  }
}
