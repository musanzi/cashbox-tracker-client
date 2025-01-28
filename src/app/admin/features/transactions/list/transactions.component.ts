import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../shared/services/api/types/api-response.type';
import { ITransaction } from '../../../../shared/utils/types/models.type';
import { TransactionsService } from '../../../data-access/transactions.service';

@Component({
  selector: 'app-transactions',
  providers: [TransactionsService],
  imports: [CommonModule],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
  #transactionsService = inject(TransactionsService);
  transactions$: Observable<IAPIResponse<ITransaction[]>>;

  ngOnInit(): void {
    this.transactions$ = this.#transactionsService.getTransactions();
  }
}
