import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '../../data-access/transactions.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox, ITransaction } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add/add-transaction.component';
import { DeleteCashboxComponent } from '../delete/delete-transaction.component';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { TableSkeletonComponent } from '../../../shared/ui/table-skeleton/table-skeleton.component';
import { EditTransactionComponent } from '../edit/edit-transaction.component';

@Component({
  selector: 'app-transactions',
  providers: [TransactionsService],
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, TableComponent, TableSkeletonComponent],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit, OnDestroy {
  #transactionsService = inject(TransactionsService);
  #dialog = inject(MatDialog);
  transactions$: Observable<IAPIResponse<[ITransaction[], number]>>;
  subscription = new Subscription(null);
  columns = [
    { key: 'amount', label: 'Montant' },
    { key: 'label', label: 'Libellé' },
    { key: 'cashbox.name', label: 'Caisse' },
    { key: 'by.name', label: 'Fair par' },
    { key: 'created_at', label: 'Fait le' }
  ];
  actions = [
    {
      icon: 'edit',
      fn: (cashbox: ICashbox) => this.openEditModal(cashbox.id)
    },
    {
      icon: 'delete',
      fn: (cashbox: ICashbox) => this.openDeleteModal(cashbox.id, cashbox.name)
    }
  ];

  ngOnInit(): void {
    this.loadTransactions();
  }

  openEditModal(id: string): void {
    this.subscription = this.#dialog
      .open(EditTransactionComponent, { data: id })
      .afterClosed()
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  openAddModal(): void {
    this.subscription = this.#dialog
      .open(AddTransactionComponent)
      .afterClosed()
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  openDeleteModal(id: string, name: string): void {
    this.subscription = this.#dialog
      .open(DeleteCashboxComponent, { data: { id, name } })
      .afterClosed()
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  loadTransactions(): void {
    this.transactions$ = this.#transactionsService.getAll();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
