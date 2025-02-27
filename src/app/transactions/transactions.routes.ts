import { Routes } from '@angular/router';

export const transactionsRoutes: Routes = [
  {
    path: '',
    title: 'Transactions',
    loadComponent: () => import('./features/list/transactions.component').then((c) => c.TransactionsComponent)
  }
];
