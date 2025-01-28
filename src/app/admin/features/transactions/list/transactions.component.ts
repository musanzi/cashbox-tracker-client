import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../shared/services/api/types/api-response.type';
import { ITransaction } from '../../../../shared/utils/types/models.type';
import { TransactionsService } from '../../../data-access/transactions.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransactionsQueryParams } from '../../../utils/types/transactions.query-params.type';

@Component({
  selector: 'app-transactions',
  providers: [TransactionsService],
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
  #transactionsService = inject(TransactionsService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  transactions$: Observable<IAPIResponse<[ITransaction[], number]>>;
  queryParams = signal<ITransactionsQueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null
  });

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactions$ = this.#transactionsService.getTransactions(this.queryParams());
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/transactions'], { queryParams });
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.getTransactions();
    this.updateRoute();
  }
}
