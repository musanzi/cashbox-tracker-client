import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../services/api/types/api-response.type';

@Component({
  selector: 'app-topbar',
  host: { '(document:click)': 'onClickOutside($event)' },
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  isOpen = signal(false);
  activeTab = signal<string | null>(null);
  user$: Observable<IUser>;
  logout$: Observable<IAPIResponse<void>>;
  #store = inject(Store);
  #authService = inject(AuthService);

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  openMenu(): void {
    this.isOpen.set(true);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  signOut(): void {
    this.logout$ = this.#authService.signOut();
    this.closeMenu();
  }
}
