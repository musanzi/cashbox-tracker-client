import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../data-access/users.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../shared/services/api/types/api-response.type';
import { IUser } from '../../../../shared/utils/types/models.type';

@Component({
  selector: 'app-users',
  providers: [UsersService],
  imports: [CommonModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  #usersService = inject(UsersService);
  users$: Observable<IAPIResponse<IUser[]>>;

  ngOnInit(): void {
    this.users$ = this.#usersService.getUsers();
  }
}
