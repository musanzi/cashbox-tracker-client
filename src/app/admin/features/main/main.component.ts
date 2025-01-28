import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../ui/sidebar/sidebar.component';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/utils/types/models.type';
import { selectUser } from '../../../shared/store/auth/auth.reducers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './main.component.html'
})
export class MainComponent {
  #store = inject(Store);
  user$: Observable<IUser>;

  constructor() {
    this.user$ = this.#store.pipe(select(selectUser));
  }
}
