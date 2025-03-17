import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { DashboardData } from '../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OverviewService } from '../data-access/overview.service';

@Component({
  selector: 'app-overview',
  providers: [OverviewService],
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  #dashboardService = inject(OverviewService);
  dashboardData$: Observable<IAPIResponse<DashboardData>>;
  data = [
    {
      name: 'Germany',
      value: 40632
    },
    {
      name: 'United States',
      value: 50000
    },
    {
      name: 'France',
      value: 36745
    },
    {
      name: 'United Kingdom',
      value: 36240
    },
    {
      name: 'Spain',
      value: 33000
    },
    {
      name: 'Italy',
      value: 35800
    }
  ];

  ngOnInit(): void {
    this.dashboardData$ = this.#dashboardService.getDashboardData();
  }
}
