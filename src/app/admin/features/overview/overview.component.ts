import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../data-access/admin.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  providers: [DashboardService],
  imports: [CommonModule],
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  #dashboardService = inject(DashboardService);
  cashboxes: Observable<IAPIResponse<ICashbox[]>>;

  ngOnInit(): void {
    this.cashboxes = this.#dashboardService.getCashboxes();
  }
}
