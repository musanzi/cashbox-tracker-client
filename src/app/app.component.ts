import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from 'app/shared/ui/loading-bar/loading-bar.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from './shared/store/auth/auth.reducers';
import { IUser } from './shared/utils/types/models.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, LoadingBarComponent, LoaderComponent, SidebarComponent]
})
export class AppComponent {
  #store = inject(Store);
  user$: Observable<IUser>;

  constructor() {
    this.user$ = this.#store.pipe(select(selectUser));
  }
}
