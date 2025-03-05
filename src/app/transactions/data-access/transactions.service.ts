import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ICashbox, ITransaction } from '../../shared/utils/types/models.type';
import { ToastrService } from 'ngx-toastr';
import { UpdateTransactionDto } from '../utils/update-transaction.dto';
import { AddTransactionDto } from '../utils/add-transaction.dto';
import { QueryParams } from '../utils/query-params.type';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class TransactionsService {
  #apiService = inject(APIService);
  #toastService = inject(ToastrService);

  getCashboxes(): Observable<IAPIResponse<ICashbox[]>> {
    return this.#apiService.get('cashboxes');
  }

  getAll(queryParams: QueryParams): Observable<IAPIResponse<[ITransaction[], number]>> {
    const params = this.buildQueryParams(queryParams);
    return this.#apiService.get('transactions', params);
  }

  getOne(id: string): Observable<IAPIResponse<ITransaction>> {
    return this.#apiService.get(`transactions/${id}`);
  }

  add(dto: AddTransactionDto): Observable<IAPIResponse<ITransaction>> {
    const onsSuccess = () => {
      this.#toastService.success(`Transaction  faite`);
    };
    return this.#apiService.post('transactions', dto, onsSuccess);
  }

  update(id: string, dto: UpdateTransactionDto): Observable<IAPIResponse<ITransaction>> {
    const onsSuccess = () => {
      this.#toastService.success(`Transaction mise à jour`);
    };
    return this.#apiService.patch(`transactions/${id}`, dto, onsSuccess);
  }

  delete(id: string): Observable<IAPIResponse<void>> {
    const onsSuccess = () => {
      this.#toastService.success(`Transaction supprimé`);
    };
    return this.#apiService.delete(`transactions/${id}`, onsSuccess);
  }

  buildQueryParams(queryParams: QueryParams): HttpParams {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (!value) return;
      params = params.set(key, value);
    });
    return params;
  }
}
