import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { cashboxesRoutes } from './features/cashboxes/cashboxes.routes';
import { overviewRoutes } from './features/overview/overview.routes';

export const adminRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: MainComponent,
    children: [
      { path: '', loadChildren: () => overviewRoutes },
      { path: 'cashboxes', loadChildren: () => cashboxesRoutes }
    ]
  }
];
