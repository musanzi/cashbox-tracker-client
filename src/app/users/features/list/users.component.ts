import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UsersService } from '../../data-access/users.service';
import { Observable, Subscription } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IUser } from '../../../shared/utils/types/models.type';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add/add-user.component';
import { DeleteUserComponent } from '../delete/delete-user.component';
import { TableSkeletonComponent } from '../../../shared/ui/table-skeleton/table-skeleton.component';
import { EditUserComponent } from '../edit/edit-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { QueryParams } from '../../utils/query-params.type';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { getEnumValues } from '../../../shared/helpers/enum-array.fn';
import { ERole } from '../../../shared/utils/enums/role.enum';

@Component({
  selector: 'app-users',
  providers: [UsersService],
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
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  #usersService = inject(UsersService);
  #dialog = inject(MatDialog);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  users$: Observable<IAPIResponse<[IUser[], number]>>;
  subscription = new Subscription(null);
  columns = signal(['Nom', 'Rôle', 'Email', 'Télephone', 'Ajouté le', 'Actions']);
  roles = signal<string[]>(getEnumValues(ERole));
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    role: this.#route.snapshot.queryParams?.role || null
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  openEditModal(id: string): void {
    this.subscription = this.#dialog
      .open(EditUserComponent, { data: id })
      .afterClosed()
      .subscribe(() => {
        this.loadUsers();
      });
  }

  openAddModal(): void {
    this.subscription = this.#dialog
      .open(AddUserComponent)
      .afterClosed()
      .subscribe(() => {
        this.loadUsers();
      });
  }

  openDeleteModal(id: string): void {
    this.subscription = this.#dialog
      .open(DeleteUserComponent, { data: { id } })
      .afterClosed()
      .subscribe(() => {
        this.loadUsers();
      });
  }

  loadUsers(): void {
    this.users$ = this.#usersService.getAll(this.queryParams());
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
    this.#router.navigate(['/users'], {
      queryParams: this.queryParams()
    });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
