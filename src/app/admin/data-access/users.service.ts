import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { IUser } from '../../shared/utils/types/models.type';

@Injectable()
export class UsersService {
  #apiService = inject(APIService);

  getUsers(): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.get('users');
  }
}
