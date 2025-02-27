import { Injectable, inject } from '@angular/core';
import { APIService } from 'app/shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ICashbox, IUser } from '../../shared/utils/types/models.type';
import { ToastrService } from 'ngx-toastr';
import { UpdateCashboxDto } from '../utils/update-cashbox.dto';
import { AddCashboxDto } from '../utils/add-cashbox.dto';

@Injectable()
export class CashboxesService {
  #apiService = inject(APIService);
  #toastService = inject(ToastrService);

  getCahiers(): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.get('users/cashiers');
  }

  getCashboxes(): Observable<IAPIResponse<ICashbox[]>> {
    return this.#apiService.get('cashboxes');
  }

  addCashbox(dto: AddCashboxDto): Observable<IAPIResponse<ICashbox>> {
    const onsSuccess = (cashbox: ICashbox) => {
      this.#toastService.success(`Caisse ${cashbox.name} ajouté`);
    };
    return this.#apiService.post('cashboxes', dto, onsSuccess);
  }

  getCashbox(id: string): Observable<IAPIResponse<ICashbox>> {
    return this.#apiService.get(`cashboxes/${id}`);
  }

  updateCashbox(id: string, dto: UpdateCashboxDto): Observable<IAPIResponse<ICashbox>> {
    const onsSuccess = (cashbox: ICashbox) => {
      this.#toastService.success(`Caisse ${cashbox.name} mis à jour`);
    };
    return this.#apiService.patch(`cashboxes/${id}`, dto, onsSuccess);
  }

  deleteCashbox(id: string): Observable<IAPIResponse<void>> {
    const onsSuccess = () => {
      this.#toastService.success(`Caisse supprimé`);
    };
    return this.#apiService.delete(`cashboxes/${id}`, onsSuccess);
  }
}
