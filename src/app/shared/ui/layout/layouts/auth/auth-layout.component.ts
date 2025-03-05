import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LoadingBarComponent } from '../../../loading-bar/loading-bar.component';
import { SidebarComponent } from '../../common/sidebar/sidebar.component';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../../store/auth/auth.reducers';
import { IUser } from '../../../../utils/types/models.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  imports: [LoadingBarComponent, RouterOutlet, SidebarComponent, CommonModule]
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  user$: Observable<IUser>;
  #unsubscribeAll = new Subject();

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
