import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ICashbox } from '../../shared/utils/types/models.type';

@Injectable()
export class DashboardService {
  #apiService = inject(APIService);

  getCashboxes(): Observable<IAPIResponse<ICashbox[]>> {
    return this.#apiService.get('cashboxes');
  }
}
