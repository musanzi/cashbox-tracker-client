import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingBarComponent } from '../../../loading-bar/loading-bar.component';

@Component({
  selector: 'app-unauth-layout',
  templateUrl: './unauth-layout.component.html',
  imports: [LoadingBarComponent, RouterOutlet]
})
export class UnAuthLayoutComponent implements OnDestroy {
  #unsubscribeAll = new Subject();

  ngOnDestroy(): void {
    this.#unsubscribeAll.next(null);
    this.#unsubscribeAll.complete();
  }
}
