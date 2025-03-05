import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ICashbox, ITransfer } from '../../shared/utils/types/models.type';
import { ToastrService } from 'ngx-toastr';
import { QueryParams } from '../utils/query-params.type';
import { buildQueryParams } from '../../shared/helpers/build-query-params.fn';
import { AddTransferDto } from '../utils/add-transfer.dto';
import { UpdateTransferDto } from '../utils/update-transfer.dto';

@Injectable()
export class TransfersService {
  #apiService = inject(APIService);
  #toastService = inject(ToastrService);

  getCashboxes(): Observable<IAPIResponse<ICashbox[]>> {
    return this.#apiService.get('cashboxes');
  }

  getAll(queryParams: QueryParams): Observable<IAPIResponse<[ITransfer[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('transfers', params);
  }

  getOne(id: string): Observable<IAPIResponse<ITransfer>> {
    return this.#apiService.get(`transfers/${id}`);
  }

  add(dto: AddTransferDto): Observable<IAPIResponse<ITransfer>> {
    const onsSuccess = () => {
      this.#toastService.success(`Transfert faite`);
    };
    return this.#apiService.post('transfers', dto, onsSuccess);
  }

  update(id: string, dto: UpdateTransferDto): Observable<IAPIResponse<ITransfer>> {
    const onsSuccess = () => {
      this.#toastService.success(`Transfert mise à jour`);
    };
    return this.#apiService.patch(`transfers/${id}`, dto, onsSuccess);
  }

  delete(id: string): Observable<IAPIResponse<void>> {
    const onsSuccess = () => {
      this.#toastService.success(`Transfert supprimé`);
    };
    return this.#apiService.delete(`transfers/${id}`, onsSuccess);
  }
}
