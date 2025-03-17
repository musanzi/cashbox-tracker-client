import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { DashboardData } from '../../shared/utils/types/models.type';

@Injectable()
export class OverviewService {
  #apiService = inject(APIService);

  getDashboardData(): Observable<IAPIResponse<DashboardData>> {
    return this.#apiService.get('dashboard');
  }
}
