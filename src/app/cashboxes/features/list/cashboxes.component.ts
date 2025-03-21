import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CashboxesService } from '../../data-access/cashboxes.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICashbox } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { EditCashboxComponent } from '../edit/edit-cashbox.component';
import { AddCashboxComponent } from '../add/add-cashbox.component';
import { DeleteCashboxComponent } from '../delete/delete-cashbox.component';
import { TableSkeletonComponent } from '../../../shared/ui/table-skeleton/table-skeleton.component';

@Component({
  selector: 'app-cashboxes',
  providers: [CashboxesService],
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, TableSkeletonComponent],
  templateUrl: './cashboxes.component.html'
})
export class CashboxesComponent implements OnInit, OnDestroy {
  #cashboxesService = inject(CashboxesService);
  #dialog = inject(MatDialog);
  cashboxes$: Observable<IAPIResponse<ICashbox[]>>;
  subscription = new Subscription(null);
  columns = signal(['Nom', 'Solde $', 'Manager', 'Actions']);

  ngOnInit(): void {
    this.loadCashboxes();
  }

  openEditModal(id: string): void {
    this.subscription = this.#dialog
      .open(EditCashboxComponent, { data: id })
      .afterClosed()
      .subscribe(() => {
        this.loadCashboxes();
      });
  }

  openAddModal(): void {
    this.subscription = this.#dialog
      .open(AddCashboxComponent)
      .afterClosed()
      .subscribe(() => {
        this.loadCashboxes();
      });
  }

  openDeleteModal(id: string, name: string): void {
    this.subscription = this.#dialog
      .open(DeleteCashboxComponent, { data: { id, name } })
      .afterClosed()
      .subscribe(() => {
        this.loadCashboxes();
      });
  }

  loadCashboxes(): void {
    this.cashboxes$ = this.#cashboxesService.getCashboxes();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
