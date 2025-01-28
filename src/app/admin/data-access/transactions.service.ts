import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ITransaction } from '../../shared/utils/types/models.type';
import { ITransactionsQueryParams } from '../utils/types/transactions.query-params.type';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class TransactionsService {
  #apiService = inject(APIService);

  getTransactions(queryParams: ITransactionsQueryParams): Observable<IAPIResponse<[ITransaction[], number]>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.get('transactions', params);
  }

  #buildQueryParams(queryParams: ITransactionsQueryParams): HttpParams {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (!value) return;
      params = params.set(key, value);
    });
    return params;
  }
}
