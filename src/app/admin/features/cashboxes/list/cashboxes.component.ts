import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CashboxesService } from '../../../data-access/cashboxes.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../shared/services/api/types/api-response.type';
import { ICashbox } from '../../../../shared/utils/types/models.type';

@Component({
  selector: 'app-cashboxes',
  providers: [CashboxesService],
  imports: [CommonModule],
  templateUrl: './cashboxes.component.html'
})
export class CashboxesComponent implements OnInit {
  #cashboxesService = inject(CashboxesService);
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;

  ngOnInit(): void {
    this.cashboxes$ = this.#cashboxesService.getCashboxes();
  }
}
