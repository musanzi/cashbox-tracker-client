import { Routes } from '@angular/router';
import { cashboxesRoutes } from './features/cashboxes/cashboxes.routes';
import { overviewRoutes } from './features/overview/overview.routes';
import { usersRoutes } from './features/users/users.routes';
import { transactionsRoutes } from './features/transactions/transactions.routes';

export const adminRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () => import('./features/main/main.component').then((c) => c.MainComponent),
    children: [
      { path: '', loadChildren: () => overviewRoutes },
      { path: 'users', loadChildren: () => usersRoutes },
      { path: 'cashboxes', loadChildren: () => cashboxesRoutes },
      { path: 'transactions', loadChildren: () => transactionsRoutes }
    ]
  }
];
