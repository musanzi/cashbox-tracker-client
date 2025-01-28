import { Component, inject, OnInit } from '@angular/core';
import { OverviewService } from '../../data-access/overview.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  providers: [OverviewService],
  imports: [CommonModule],
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  #dashboardService = inject(OverviewService);
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;

  ngOnInit(): void {
    this.cashboxes$ = this.#dashboardService.getCashboxes();
  }

  getTotal(cashboxes: ICashbox[]): number {
    return Math.round(cashboxes.reduce((total, cashbox) => total + Number(cashbox.balance), 0));
  }
}
