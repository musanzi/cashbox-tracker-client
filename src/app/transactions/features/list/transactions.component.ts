import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TransactionsService } from '../../data-access/transactions.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ETransactionCategory, getEnumValues, ICashbox, ITransaction } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add/add-transaction.component';
import { DeleteCashboxComponent } from '../delete/delete-transaction.component';
import { TableSkeletonComponent } from '../../../shared/ui/table-skeleton/table-skeleton.component';
import { EditTransactionComponent } from '../edit/edit-transaction.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { QueryParams } from '../../utils/query-params.type';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-transactions',
  providers: [TransactionsService],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatInputModule,
    TableSkeletonComponent,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit, OnDestroy {
  #transactionsService = inject(TransactionsService);
  #dialog = inject(MatDialog);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  transactions$: Observable<IAPIResponse<[ITransaction[], number]>>;
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;
  subscription = new Subscription(null);
  columns = signal(['ID', 'Montant', 'Catégorie', 'Caisse', 'Par', 'Actions']);
  transactionCategories = signal<string[]>(getEnumValues(ETransactionCategory));
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    category: this.#route.snapshot.queryParams?.category || null,
    from: this.#route.snapshot.queryParams?.from || null,
    to: this.#route.snapshot.queryParams?.to || null,
    cashbox: this.#route.snapshot.queryParams?.cashbox || null
  });

  ngOnInit(): void {
    this.cashboxes$ = this.#transactionsService.getCashboxes();
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

  openDeleteModal(id: string): void {
    this.subscription = this.#dialog
      .open(DeleteCashboxComponent, { data: { id } })
      .afterClosed()
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  loadTransactions(): void {
    this.transactions$ = this.#transactionsService.getAll(this.queryParams());
  }

  onFilterChange(filter: string, event: MatSelectChange | MatDatepickerInputEvent<Date>): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value === 'all' ? null : event.value;
    this.updateRouteAndEvents();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndEvents();
  }

  updateRoute(): void {
    this.#router.navigate(['/transactions'], {
      queryParams: this.queryParams()
    });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
