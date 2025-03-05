import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TransfersService } from '../../data-access/transfers.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox, ITransfer } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AddTransferComponent } from '../add/add-transfer.component';
import { DeleteTransferComponent } from '../delete/delete-transfer.component';
import { TableSkeletonComponent } from '../../../shared/ui/table-skeleton/table-skeleton.component';
import { EditTransferComponent } from '../edit/edit-transfer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { QueryParams } from '../../utils/query-params.type';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-transfers',
  providers: [TransfersService],
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
  templateUrl: './transfers.component.html'
})
export class TransfersComponent implements OnInit, OnDestroy {
  #transfersService = inject(TransfersService);
  #dialog = inject(MatDialog);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  transfers$: Observable<IAPIResponse<[ITransfer[], number]>>;
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;
  subscription = new Subscription(null);
  columns = signal(['Montant', 'Label', 'De', 'A', 'Par', 'Actions']);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    from: this.#route.snapshot.queryParams?.from || null,
    to: this.#route.snapshot.queryParams?.to || null,
    from_cashbox: this.#route.snapshot.queryParams?.from_cashbox || null,
    to_cashbox: this.#route.snapshot.queryParams?.to_cashbox || null
  });

  ngOnInit(): void {
    this.cashboxes$ = this.#transfersService.getCashboxes();
    this.loadTransfers();
  }

  openEditModal(id: string): void {
    this.subscription = this.#dialog
      .open(EditTransferComponent, { data: id })
      .afterClosed()
      .subscribe(() => {
        this.loadTransfers();
      });
  }

  openAddModal(): void {
    this.subscription = this.#dialog
      .open(AddTransferComponent)
      .afterClosed()
      .subscribe(() => {
        this.loadTransfers();
      });
  }

  openDeleteModal(id: string): void {
    this.subscription = this.#dialog
      .open(DeleteTransferComponent, { data: { id } })
      .afterClosed()
      .subscribe(() => {
        this.loadTransfers();
      });
  }

  loadTransfers(): void {
    this.transfers$ = this.#transfersService.getAll(this.queryParams());
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
    this.#router.navigate(['/transfers'], {
      queryParams: this.queryParams()
    });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.loadTransfers();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
