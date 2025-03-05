import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { IUser } from '../../shared/utils/types/models.type';
import { ToastrService } from 'ngx-toastr';
import { QueryParams } from '../utils/query-params.type';
import { buildQueryParams } from '../../shared/helpers/build-query-params.fn';
import { AddUserDto } from '../utils/add-user.dto';
import { UpdateUserDto } from '../utils/update-user.dto';

@Injectable()
export class UsersService {
  #apiService = inject(APIService);
  #toastService = inject(ToastrService);

  getAll(queryParams: QueryParams): Observable<IAPIResponse<[IUser[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('users', params);
  }

  getOne(id: string): Observable<IAPIResponse<IUser>> {
    return this.#apiService.get(`users/${id}`);
  }

  add(dto: AddUserDto): Observable<IAPIResponse<IUser>> {
    const onsSuccess = () => {
      this.#toastService.success(`Utilisateur ajouté`);
    };
    return this.#apiService.post('users', dto, onsSuccess);
  }

  update(id: string, dto: UpdateUserDto): Observable<IAPIResponse<IUser>> {
    const onsSuccess = () => {
      this.#toastService.success(`Utilisateur mise à jour`);
    };
    return this.#apiService.patch(`users/${id}`, dto, onsSuccess);
  }

  delete(id: string): Observable<IAPIResponse<void>> {
    const onsSuccess = () => {
      this.#toastService.success(`Utilisateur supprimé`);
    };
    return this.#apiService.delete(`users/${id}`, onsSuccess);
  }
}
